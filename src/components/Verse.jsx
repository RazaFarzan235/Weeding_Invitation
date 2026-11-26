import { wedding } from '../data/wedding'
import Reveal from './Reveal'
import { Divider, GeometricPattern } from './Ornaments'

export default function Verse() {
  const { arabic, english, reference } = wedding.verse
  return (
    <section id="verse" className="relative overflow-hidden bg-blush px-5 py-20 text-center sm:py-28">
      <GeometricPattern className="absolute inset-0 text-gold/20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgb(245_228_223/0.8)_100%)]" />
      <Reveal className="relative mx-auto max-w-3xl">
        <p className="font-arabic text-2xl leading-[2.1] text-mauve-800 sm:text-3xl md:text-4xl" lang="ar" dir="rtl">
          {arabic}
        </p>
        <Divider className="my-8" />
        <blockquote className="text-xl leading-relaxed italic text-ink/85 sm:text-2xl">“{english}”</blockquote>
        <p className="eyebrow mt-6 text-gold-dark">{reference}</p>
      </Reveal>
    </section>
  )
}
