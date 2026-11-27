import { useEffect, useState } from 'react'
import { wedding } from './data/wedding'
import useBackgroundMusic from './hooks/useBackgroundMusic'
import Cover from './components/Cover'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Verse from './components/Verse'
import Couple from './components/Couple'
import Countdown from './components/Countdown'
import Events from './components/Events'
import FilmPlayer from './components/FilmPlayer'
import Gallery from './components/Gallery'
import Footer from './components/Footer'
import MusicToggle from './components/MusicToggle'

export default function App() {
  const music = useBackgroundMusic(wedding.music.src)
  const [opened, setOpened] = useState(false) // cover opening animation has started
  const [coverVisible, setCoverVisible] = useState(true)

  // Lock page scroll while the cover is showing.
  useEffect(() => {
    document.body.style.overflow = coverVisible ? 'hidden' : ''
  }, [coverVisible])

  // After the doors finish, drift down the invitation so guests can take it in.
  // Any tap, scroll, or key press hands control back to the reader.
  useEffect(() => {
    if (coverVisible) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0
    let stopped = false
    const pixelsPerSecond = 40
    let last = 0
    const root = document.documentElement
    const previousScrollBehavior = root.style.scrollBehavior
    // Incremental scrolling must be instant; the page's smooth behavior would race ahead.
    root.style.scrollBehavior = 'auto'

    const stop = () => {
      if (stopped) return
      stopped = true
      root.style.scrollBehavior = previousScrollBehavior
      cancelAnimationFrame(frame)
      window.removeEventListener('wheel', stop)
      window.removeEventListener('touchstart', stop)
      window.removeEventListener('pointerdown', stop)
      window.removeEventListener('keydown', stop)
    }

    const tick = (now) => {
      if (stopped) return
      if (!last) last = now
      const elapsed = Math.min((now - last) / 1000, 0.05)
      last = now

      const max = root.scrollHeight - window.innerHeight
      if (window.scrollY >= max - 1) {
        stop()
        return
      }

      root.scrollTop = Math.min(max, root.scrollTop + pixelsPerSecond * elapsed)
      frame = requestAnimationFrame(tick)
    }

    const start = window.setTimeout(() => {
      frame = requestAnimationFrame(tick)
      window.addEventListener('wheel', stop, { passive: true })
      window.addEventListener('touchstart', stop, { passive: true })
      window.addEventListener('pointerdown', stop)
      window.addEventListener('keydown', stop)
    }, 1400)

    return () => {
      stopped = true
      root.style.scrollBehavior = previousScrollBehavior
      window.clearTimeout(start)
      cancelAnimationFrame(frame)
      window.removeEventListener('wheel', stop)
      window.removeEventListener('touchstart', stop)
      window.removeEventListener('pointerdown', stop)
      window.removeEventListener('keydown', stop)
    }
  }, [coverVisible])

  return (
    <>
      {coverVisible && (
        <Cover
          onOpen={() => {
            setOpened(true)
            music.play()
          }}
          onDone={() => setCoverVisible(false)}
        />
      )}

      <Navbar />

      <main>
        <Hero ready={opened} />
        <Verse />
        <Couple />
        <Countdown />
        <Events />
        <FilmPlayer onPlayingChange={music.hold} />
        <Gallery />
      </main>

      <Footer />

      {!coverVisible && <MusicToggle playing={music.playing} onToggle={music.toggle} />}
    </>
  )
}
