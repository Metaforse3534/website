const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const ignored = new Set(['.git', 'node_modules', '.vercel']);
const files = [];
const errors = [];
function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (ignored.has(entry.name)) continue;
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(fullPath);
    else files.push(fullPath);
  }
}
walk(root);

const config = JSON.parse(fs.readFileSync(path.join(root, 'vercel.json'), 'utf8'));
const routedPaths = new Set([
  ...(config.redirects || []).map((item) => item.source.toLowerCase()),
  ...(config.rewrites || []).map((item) => item.source.toLowerCase()),
]);

for (const file of files.filter((item) => item.endsWith('.json'))) {
  try { JSON.parse(fs.readFileSync(file, 'utf8')); }
  catch (error) { errors.push(`${path.relative(root, file)}: invalid JSON: ${error.message}`); }
}

for (const file of files.filter((item) => item.endsWith('.html'))) {
  const html = fs.readFileSync(file, 'utf8');
  const relative = path.relative(root, file).replaceAll('\\', '/');
  if (!relative.startsWith('components/') && (!/<\/body>/i.test(html) || !/<\/html>/i.test(html))) {
    errors.push(`${relative}: missing closing body or html element`);
  }
  if (relative.startsWith('Routes/') && !/route-modern\.css/i.test(html)) {
    errors.push(`${relative}: missing route-modern.css`);
  }
  if (relative.startsWith('Routes/') && !/route-motion\.js/i.test(html)) {
    errors.push(`${relative}: missing route-motion.js`);
  }
  const ids = [...html.matchAll(/\sid=["']([^"']+)["']/gi)].map((match) => match[1]);
  for (const id of new Set(ids)) if (ids.filter((value) => value === id).length > 1) errors.push(`${relative}: duplicate id "${id}"`);
  for (const match of html.matchAll(/\s(?:href|src)=["']([^"']+)["']/gi)) {
    const raw = match[1];
    if (!raw || /^(?:https?:|mailto:|tel:|data:|javascript:|#)/i.test(raw)) continue;
    const clean = decodeURIComponent(raw.split(/[?#]/)[0]);
    if (!clean || clean === '/' || routedPaths.has(clean.toLowerCase())) continue;
    const direct = clean.startsWith('/') ? path.join(root, clean.slice(1)) : path.resolve(path.dirname(file), clean);
    const relativeTarget = path.relative(root, direct).replaceAll('\\', '/');
    const publicTarget = relativeTarget.startsWith('Public/') ? path.join(root, 'public', relativeTarget.slice(7)) : direct;
    const iconTarget = relativeTarget.startsWith('Public/web-app-manifest-') ? path.join(root, 'public', 'icons', path.basename(relativeTarget)) : direct;
    const candidates = [direct, `${direct}.html`, path.join(direct, 'index.html'), publicTarget, `${publicTarget}.html`, iconTarget];
    if (!candidates.some((candidate) => fs.existsSync(candidate))) errors.push(`${relative}: missing ${raw}`);
  }
}

for (const file of files.filter((item) => item.endsWith('.js'))) {
  try { new Function(fs.readFileSync(file, 'utf8')); }
  catch (error) { errors.push(`${path.relative(root, file)}: invalid JavaScript: ${error.message}`); }
}

if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log(`Validated ${files.filter((item) => item.endsWith('.html')).length} HTML files, route styling, links, JSON and JavaScript.`);
