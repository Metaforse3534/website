import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const allowedOrigins = (Deno.env.get('ALLOWED_ORIGINS') ?? 'https://www.orbitdev.org,https://orbit-ai-systems.j-boerefijn.chatgpt.site,http://localhost:5173')
  .split(',').map(value => value.trim())

function cors(origin: string | null) {
  const allowed = origin && allowedOrigins.includes(origin) ? origin : allowedOrigins[0]
  return { 'Access-Control-Allow-Origin': allowed, 'Access-Control-Allow-Headers': 'content-type, authorization, apikey', 'Access-Control-Allow-Methods': 'POST, OPTIONS', Vary: 'Origin' }
}

function response(body: unknown, status: number, origin: string | null) {
  return new Response(JSON.stringify(body), { status, headers: { ...cors(origin), 'Content-Type': 'application/json' } })
}

Deno.serve(async request => {
  const origin = request.headers.get('origin')
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors(origin) })
  if (request.method !== 'POST') return response({ error: 'Method not allowed.' }, 405, origin)
  if (origin && !allowedOrigins.includes(origin)) return response({ error: 'Origin not allowed.' }, 403, origin)

  try {
    const form = await request.formData()
    if (String(form.get('website') ?? '')) return response({ ok: true }, 202, origin)

    const jobId = String(form.get('jobId') ?? '')
    const fullName = String(form.get('fullName') ?? '').trim()
    const email = String(form.get('email') ?? '').trim().toLowerCase()
    const location = String(form.get('location') ?? '').trim()
    const linkedinUrl = String(form.get('linkedinUrl') ?? '').trim() || null
    const portfolioUrl = String(form.get('portfolioUrl') ?? '').trim() || null
    const coverNote = String(form.get('coverNote') ?? '').trim() || null
    const consent = form.get('consent') === 'true'
    const cv = form.get('cv')
    const rawAnswers = String(form.get('answers') ?? '{}')

    if (!jobId || fullName.length < 2 || !/^\S+@\S+\.\S+$/.test(email) || !location || !consent || !(cv instanceof File)) {
      return response({ error: 'Complete every required field and attach your CV.' }, 400, origin)
    }
    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    if (!allowedTypes.includes(cv.type) || cv.size < 1 || cv.size > 10 * 1024 * 1024) {
      return response({ error: 'CVs must be PDF or DOCX files no larger than 10 MB.' }, 400, origin)
    }

    let answers: Record<string, unknown>
    try { answers = JSON.parse(rawAnswers) } catch { return response({ error: 'Screening answers are invalid.' }, 400, origin) }

    const admin = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!, { auth: { persistSession: false } })
    const now = new Date().toISOString()
    const { data: job } = await admin.from('jobs').select('id,status,publish_at,close_at').eq('id', jobId).maybeSingle()
    if (!job || !['published', 'scheduled'].includes(job.status) || !job.publish_at || job.publish_at > now || (job.close_at && job.close_at <= now)) {
      return response({ error: 'This role is not accepting applications.' }, 409, origin)
    }

    const { data: questions, error: questionError } = await admin.from('job_questions').select('id,input_type,options,required').eq('job_id', jobId)
    if (questionError) throw questionError
    for (const question of questions ?? []) {
      const answer = answers[question.id]
      if (question.required && (answer === undefined || answer === null || answer === '')) return response({ error: 'Answer every required screening question.' }, 400, origin)
      if (question.input_type === 'select' && answer != null && !question.options.includes(answer)) return response({ error: 'A screening answer is not valid.' }, 400, origin)
      if (question.input_type === 'boolean' && answer != null && typeof answer !== 'boolean') return response({ error: 'A screening answer is not valid.' }, 400, origin)
    }

    const ip = request.headers.get('cf-connecting-ip') ?? request.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown'
    const secret = Deno.env.get('RATE_LIMIT_SECRET') ?? Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const bytes = new TextEncoder().encode(`${secret}:${ip}:${email}`)
    const keyHash = Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', bytes))).map(b => b.toString(16).padStart(2, '0')).join('')
    const { data: rate } = await admin.from('application_rate_limits').select('attempts,window_started_at').eq('key_hash', keyHash).maybeSingle()
    const windowExpired = !rate || Date.now() - new Date(rate.window_started_at).getTime() > 60 * 60 * 1000
    if (rate && !windowExpired && rate.attempts >= 5) return response({ error: 'Too many attempts. Try again later.' }, 429, origin)
    await admin.from('application_rate_limits').upsert({ key_hash: keyHash, attempts: windowExpired ? 1 : (rate?.attempts ?? 0) + 1, window_started_at: windowExpired ? now : rate!.window_started_at })

    const applicationId = crypto.randomUUID()
    const extension = cv.type === 'application/pdf' ? 'pdf' : 'docx'
    const cvPath = `${jobId}/${applicationId}/cv.${extension}`
    const { error: uploadError } = await admin.storage.from('candidate-cvs').upload(cvPath, cv, { contentType: cv.type, upsert: false })
    if (uploadError) throw uploadError

    const { error: applicationError } = await admin.from('applications').insert({
      id: applicationId, job_id: jobId, full_name: fullName, email, email_normalized: email,
      location, linkedin_url: linkedinUrl, portfolio_url: portfolioUrl, cover_note: coverNote,
      cv_path: cvPath, consent_at: now,
    })
    if (applicationError) {
      await admin.storage.from('candidate-cvs').remove([cvPath])
      if (applicationError.code === '23505') return response({ error: 'An application for this email and role already exists.' }, 409, origin)
      throw applicationError
    }

    const validQuestionIds = new Set((questions ?? []).map(question => question.id))
    const answerRows = Object.entries(answers).filter(([questionId]) => validQuestionIds.has(questionId)).map(([questionId, answer]) => ({ application_id: applicationId, question_id: questionId, answer }))
    if (answerRows.length) {
      const { error } = await admin.from('application_answers').insert(answerRows)
      if (error) {
        await admin.from('applications').delete().eq('id', applicationId)
        await admin.storage.from('candidate-cvs').remove([cvPath])
        throw error
      }
    }

    return response({ ok: true, applicationId }, 201, origin)
  } catch (error) {
    console.error(error)
    return response({ error: 'We could not submit your application. Please try again.' }, 500, origin)
  }
})
