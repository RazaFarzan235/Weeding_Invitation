import { wedding } from '../data/wedding'
import Reveal from './Reveal'
import { Crescent, Divider, GeometricPattern, MosqueSkyline } from './Ornaments'

export default function Footer() {
  const { footer, groom, bride, hashtag } = wedding
  return (
    <footer className="relative overflow-hidden bg-blush-deep px-5 pt-20 pb-0 text-center text-ink">
      <GeometricPattern className="absolute inset-0 text-gold/10" />
      <Reveal className="relative mx-auto max-w-2xl">
        <Crescent className="mx-auto h-10 w-10 text-gold-dark" />
        <p className="mt-6 font-arabic text-3xl text-mauve-800 sm:text-4xl" lang="ar" dir="rtl">
          {footer.dua}
        </p>
        <p className="eyebrow mx-auto mt-5 max-w-md leading-relaxed text-ink/80">{footer.message}</p>
        <Divider className="my-8" />
        <p className="font-script text-6xl text-mauve-800 sm:text-7xl">
          {groom.name} <span className="gold-text">&amp;</span> {bride.name}
        </p>
        <p className="mt-4 text-lg italic text-ink/70">With love &amp; duas, {footer.families}</p>
        <p className="eyebrow mt-3 text-gold-dark">{hashtag}</p>
      </Reveal>
      <MosqueSkyline className="relative mx-auto mt-14 h-24 w-full max-w-3xl text-gold/20 sm:h-32" />
    </footer>
  )
}
