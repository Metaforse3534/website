import { useReducedMotion } from 'framer-motion'
import { useState, type ImgHTMLAttributes, type VideoHTMLAttributes } from 'react'
import { OrbitMediaSkeleton } from '../loading'

type OrbitImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  aspectRatio?: string
  fallbackLabel?: string
}

export function OrbitImage({ className = '', aspectRatio, fallbackLabel = 'Image unavailable', alt = '', onLoad, onError, ...props }: OrbitImageProps) {
  const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading')
  return <span className={`orbit-image ${className} is-${state}`.trim()} style={{ aspectRatio }}>
    {state === 'loading' && <OrbitMediaSkeleton />}
    {state === 'error' ? <span className="orbit-media-fallback" role="img" aria-label={alt || fallbackLabel}>{fallbackLabel}</span> : <img {...props} alt={alt} loading={props.loading ?? 'lazy'} decoding={props.decoding ?? 'async'} onLoad={event => { setState('ready'); onLoad?.(event) }} onError={event => { setState('error'); onError?.(event) }} />}
  </span>
}

type OrbitVideoProps = VideoHTMLAttributes<HTMLVideoElement> & {
  poster: string
  label?: string
}

export function OrbitVideo({ className = '', poster, label = 'Orbit product film', children, onCanPlay, onError, ...props }: OrbitVideoProps) {
  const reduceMotion = useReducedMotion()
  const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading')
  return <span className={`orbit-video ${className} is-${reduceMotion ? 'reduced' : state}`.trim()}>
    <img className="orbit-video-poster" src={poster} alt="" aria-hidden="true" />
    {!reduceMotion && state !== 'error' && <video {...props} poster={poster} aria-label={label} preload={props.preload ?? 'metadata'} onCanPlay={event => { setState('ready'); onCanPlay?.(event) }} onError={event => { setState('error'); onError?.(event) }}>{children}</video>}
  </span>
}
