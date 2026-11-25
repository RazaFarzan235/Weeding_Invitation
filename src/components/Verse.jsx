import { wedding } from '../data/wedding'
import Reveal from './Reveal'
import { Divider, GeometricPattern } from './Ornaments'

export default function Verse() {
  const { arabic, english, reference } = wedding.verse
  return (
    <section id="verse" className="relative overflow-hidden bg-jade-800 px-5 py-20 text-center sm:py-28">
      <GeometricPattern className="absolute inset-0 text-gold/15" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgb(8_42_33/0.7)_100%)]" />
      <Reveal className="relative mx-auto max-w-3xl">
        <p className="font-arabic text-2xl leading-[2.1] text-gold-light sm:text-3xl md:text-4xl" lang="ar" dir="rtl">
          {arabic}
        </p>
        <Divider className="my-8" />
        <blockquote className="text-xl leading-relaxed italic text-ivory/90 sm:text-2xl">“{english}”</blockquote>
        <p className="eyebrow mt-6 text-gold-light">{reference}</p>
      </Reveal>
    </section>
  )
}
