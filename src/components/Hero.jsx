import { wedding } from '../data/wedding'
import { Crescent, Divider, FloralBranch, GeometricPattern, Lantern, MosqueSkyline, Sparkle } from './Ornaments'

const SPARKLES = [
  ['12%', '22%', 0], ['85%', '18%', 1.2], ['20%', '68%', 2], ['78%', '62%', 0.6],
  ['50%', '10%', 1.8], ['35%', '40%', 2.6], ['66%', '36%', 0.3], ['90%', '80%', 1.5],
]

/** Landing section. Content animates in once the cover has been opened (`ready`). */
export default function Hero({ ready }) {
  const stagger = (delay) =>
    ready ? { className: 'animate-fade-in-up', style: { animationDelay: `${delay}ms` } } : { className: 'opacity-0' }

  return (
    <header id="home" className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-ivory px-5 pt-24 pb-36">
      <GeometricPattern className="absolute inset-0 text-gold/[0.13]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(253_248_246/0.95)_30%,rgb(253_248_246/0.4)_75%)]" />

      <Lantern className="animate-swing absolute top-0 left-[4%] h-40 w-12 sm:left-[8%] sm:h-56 sm:w-16" />
      <Lantern className="animate-swing absolute top-0 right-[4%] h-32 w-10 [animation-delay:-2.5s] sm:right-[8%] sm:h-48 sm:w-14" />
      <FloralBranch className="absolute -bottom-4 -left-6 w-44 sm:w-64 md:w-80" />
      <FloralBranch className="absolute -right-6 -bottom-4 w-44 -scale-x-100 sm:w-64 md:w-80" />
      <MosqueSkyline className="absolute inset-x-0 bottom-0 mx-auto h-28 w-full max-w-3xl text-mauve-800/10 sm:h-36" />

      {SPARKLES.map(([left, top, delay], i) => (
        <Sparkle key={i} className="animate-twinkle absolute h-2.5 w-2.5 text-gold" style={{ left, top, animationDelay: `${delay}s` }} />
      ))}

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <div {...stagger(0)}>
          <Crescent className="mx-auto h-10 w-10 text-gold" />
          <p className="mt-5 font-arabic text-3xl text-mauve-800 sm:text-4xl" lang="ar" dir="rtl">
            بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </p>
          <p className="mt-2 text-base italic text-ink/60">In the name of Allah, the Most Gracious, the Most Merciful</p>
        </div>

        <div {...stagger(250)}>
          <p className="eyebrow mt-10 text-gold-dark">Together with the blessings of Allah</p>
          <p className="mt-3 text-lg text-ink/75 sm:text-xl">we joyfully invite you to celebrate the wedding of</p>
        </div>

        <div {...stagger(500)}>
          <h1 className="mt-6 font-script leading-[0.95] text-mauve-800">
            <span className="block text-7xl sm:text-8xl md:text-9xl">{wedding.groom.name}</span>
            <span className="gold-text my-1 block text-5xl sm:text-6xl">&amp;</span>
            <span className="block text-7xl sm:text-8xl md:text-9xl">{wedding.bride.name}</span>
          </h1>
        </div>

        <div {...stagger(800)}>
          <Divider className="mt-8" />
          <p className="mt-5 font-display text-sm tracking-[0.3em] text-mauve-700 uppercase sm:text-base">{wedding.dateRange}</p>
          <p className="eyebrow mt-2 text-gold-dark">{wedding.city}</p>
        </div>
      </div>

      <a
        href="#verse"
        aria-label="Scroll down"
        className="absolute bottom-8 left-1/2 z-10 flex h-10 w-6 -translate-x-1/2 justify-center rounded-full border border-gold/70 pt-2"
      >
        <span className="h-2 w-1 rounded-full bg-gold [animation:scroll-dot_1.8s_ease-in-out_infinite]" />
      </a>
    </header>
  )
}
