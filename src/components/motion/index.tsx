import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { Children, type ElementType, type ReactNode } from 'react'

const easing = [0.22, 1, 0.36, 1] as const

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  as?: ElementType
}

export function OrbitReveal({ children, className, delay = 0, as = 'div' }: RevealProps) {
  const reduceMotion = useReducedMotion()
  const Component = motion.create(as)
  return <Component
    className={className}
    initial={reduceMotion ? false : { opacity: 1, y: 28, scale: 0.985 }}
    whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, amount: 0.16, margin: '0px 0px -4% 0px' }}
    transition={{ duration: 0.68, delay, ease: easing }}
  >{children}</Component>
}

export function OrbitSectionReveal(props: RevealProps) {
  return <OrbitReveal {...props} as={props.as ?? 'section'} />
}

export function OrbitFade({ children, className, delay = 0, as = 'div' }: RevealProps) {
  const reduceMotion = useReducedMotion()
  const Component = motion.create(as)
  return <Component className={className} initial={reduceMotion ? false : { opacity: 1, y: 20, scale: 0.99 }} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: 0.14 }} transition={{ duration: 0.62, delay, ease: easing }}>{children}</Component>
}

export function OrbitTextReveal({ children, className, delay = 0, as = 'div' }: RevealProps) {
  const reduceMotion = useReducedMotion()
  const Component = motion.create(as)
  return <Component
    className={className}
    initial={reduceMotion ? false : { opacity: 1, y: 20, scale: 0.99 }}
    animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.72, delay, ease: easing }}
  >{children}</Component>
}

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.085 } },
}

const staggerItem: Variants = {
  hidden: { opacity: 1, y: 22, scale: 0.985 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.62, ease: easing } },
}

export function OrbitStagger({ children, className, as = 'div' }: Omit<RevealProps, 'delay'>) {
  const reduceMotion = useReducedMotion()
  const Component = motion.create(as)
  return <Component className={className} variants={reduceMotion ? undefined : staggerContainer} initial={reduceMotion ? false : 'hidden'} whileInView={reduceMotion ? undefined : 'visible'} viewport={{ once: true, amount: 0.1 }}>
    {Children.map(children, child => <motion.div variants={reduceMotion ? undefined : staggerItem}>{child}</motion.div>)}
  </Component>
}
