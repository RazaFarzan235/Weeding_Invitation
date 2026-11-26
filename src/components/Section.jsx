import Reveal from './Reveal'
import { Divider } from './Ornaments'

export function SectionHeading({ eyebrow, title, subtitle }) {
  return (
    <Reveal className="mb-12 text-center sm:mb-16">
      {eyebrow && <p className="eyebrow mb-3 text-gold-dark">{eyebrow}</p>}
      <h2 className="font-script text-5xl leading-tight text-mauve-800 sm:text-6xl md:text-7xl">
        {title}
      </h2>
      <Divider className="mt-4" />
      {subtitle && (
        <p className="mx-auto mt-5 max-w-xl text-lg italic text-ink/70 sm:text-xl">{subtitle}</p>
      )}
    </Reveal>
  )
}

export default function Section({ id, className = '', background, children }) {
  return (
    <section id={id} className={`relative overflow-hidden px-5 py-20 sm:px-8 sm:py-28 ${className}`}>
      {background}
      <div className="relative mx-auto max-w-6xl">{children}</div>
    </section>
  )
}
