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
    initial={reduceMotion ? false : { opacity: 0, y: 12 }}
    whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.12, margin: '0px 0px -6% 0px' }}
    transition={{ duration: 0.48, delay, ease: easing }}
  >{children}</Component>
}

export function OrbitSectionReveal(props: RevealProps) {
  return <OrbitReveal {...props} as={props.as ?? 'section'} />
}

export function OrbitFade({ children, className, delay = 0, as = 'div' }: RevealProps) {
  const reduceMotion = useReducedMotion()
  const Component = motion.create(as)
  return <Component className={className} initial={reduceMotion ? false : { opacity: 0 }} whileInView={reduceMotion ? undefined : { opacity: 1 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.4, delay, ease: easing }}>{children}</Component>
}

export function OrbitTextReveal({ children, className, delay = 0, as = 'div' }: RevealProps) {
  const reduceMotion = useReducedMotion()
  const Component = motion.create(as)
  return <Component
    className={className}
    initial={reduceMotion ? false : { opacity: 0, y: 10, filter: 'blur(4px)' }}
    animate={reduceMotion ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
    transition={{ duration: 0.42, delay, ease: easing }}
  >{children}</Component>
}

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.42, ease: easing } },
}

export function OrbitStagger({ children, className, as = 'div' }: Omit<RevealProps, 'delay'>) {
  const reduceMotion = useReducedMotion()
  const Component = motion.create(as)
  return <Component className={className} variants={reduceMotion ? undefined : staggerContainer} initial={reduceMotion ? false : 'hidden'} whileInView={reduceMotion ? undefined : 'visible'} viewport={{ once: true, amount: 0.1 }}>
    {Children.map(children, child => <motion.div variants={reduceMotion ? undefined : staggerItem}>{child}</motion.div>)}
  </Component>
}
