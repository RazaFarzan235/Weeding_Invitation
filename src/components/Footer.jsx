import { wedding } from '../data/wedding'
import Reveal from './Reveal'
import { Crescent, Divider, GeometricPattern, MosqueSkyline } from './Ornaments'

export default function Footer() {
  const { footer, groom, bride, hashtag } = wedding
  return (
    <footer className="relative overflow-hidden bg-jade-900 px-5 pt-20 pb-0 text-center text-ivory">
      <GeometricPattern className="absolute inset-0 text-gold/10" />
      <Reveal className="relative mx-auto max-w-2xl">
        <Crescent className="mx-auto h-10 w-10 text-gold-light" />
        <p className="mt-6 font-arabic text-3xl text-gold-light sm:text-4xl" lang="ar" dir="rtl">
          {footer.dua}
        </p>
        <p className="eyebrow mx-auto mt-5 max-w-md leading-relaxed text-ivory/80">{footer.message}</p>
        <Divider className="my-8" />
        <p className="font-script text-6xl text-ivory sm:text-7xl">
          {groom.name} <span className="gold-text">&amp;</span> {bride.name}
        </p>
        <p className="mt-4 text-lg italic text-ivory/70">With love &amp; duas, {footer.families}</p>
        <p className="eyebrow mt-3 text-gold-light">{hashtag}</p>
      </Reveal>
      <MosqueSkyline className="relative mx-auto mt-14 h-24 w-full max-w-3xl text-gold/20 sm:h-32" />
    </footer>
  )
}
