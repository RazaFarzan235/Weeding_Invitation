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
