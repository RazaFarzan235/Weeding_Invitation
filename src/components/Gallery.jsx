import { useCallback, useEffect, useState } from 'react'
import { wedding } from '../data/wedding'
import Reveal from './Reveal'
import Section, { SectionHeading } from './Section'

const navBtn =
  'absolute top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-mauve-800/10 text-2xl text-mauve-800 backdrop-blur transition hover:bg-gold hover:text-ivory'

function Lightbox({ index, onClose, onStep }) {
  const item = wedding.gallery[index]

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onStep(1)
      if (e.key === 'ArrowLeft') onStep(-1)
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [onClose, onStep])

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-ivory/95 p-4 [animation:fade-in-up_.35s_ease_both]"
      role="dialog"
      aria-modal="true"
      aria-label={item.caption}
      onClick={onClose}
    >
      <figure className="relative max-h-full" onClick={(e) => e.stopPropagation()}>
        <img src={item.src} alt={item.alt} className="max-h-[82svh] w-auto rounded-lg shadow-2xl ring-1 ring-gold/40" />
        <figcaption className="eyebrow mt-4 text-center text-gold-dark">{item.caption}</figcaption>
      </figure>

      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-mauve-800/10 text-2xl text-mauve-800 hover:bg-gold hover:text-ivory"
      >
        ×
      </button>

      {wedding.gallery.length > 1 && (
        <>
          <button type="button" aria-label="Previous" className={`${navBtn} left-3`} onClick={(e) => { e.stopPropagation(); onStep(-1) }}>
            ‹
          </button>
          <button type="button" aria-label="Next" className={`${navBtn} right-3`} onClick={(e) => { e.stopPropagation(); onStep(1) }}>
            ›
          </button>
        </>
      )}
    </div>
  )
}

export default function Gallery() {
  const [active, setActive] = useState(null)
  const count = wedding.gallery.length
  const close = useCallback(() => setActive(null), [])
  const step = useCallback((dir) => setActive((i) => (i + dir + count) % count), [count])

  return (
    <Section id="gallery" className="bg-ivory-deep/60">
      <SectionHeading eyebrow="With love" title="Our Invitations" subtitle="Tap a card to view it in full." />

      <div className="mx-auto grid max-w-4xl gap-8 sm:grid-cols-2 sm:gap-10">
        {wedding.gallery.map((item, i) => (
          <Reveal key={item.src} delay={i * 150} variant="zoom">
            <button
              type="button"
              onClick={() => setActive(i)}
              className="group block w-full rounded-2xl border border-gold/50 bg-white p-2 shadow-[0_30px_60px_-30px_rgb(110_75_88/0.3)] transition duration-500 hover:-translate-y-1.5 focus-visible:outline-2 focus-visible:outline-gold"
            >
              <div className="overflow-hidden rounded-xl">
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  className="aspect-[2/3] w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
              <p className="eyebrow py-4 text-mauve-700">{item.caption}</p>
            </button>
          </Reveal>
        ))}
      </div>

      {active !== null && <Lightbox index={active} onClose={close} onStep={step} />}
    </Section>
  )
}
