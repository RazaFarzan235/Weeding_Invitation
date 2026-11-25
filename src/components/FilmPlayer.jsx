import { useRef, useState } from 'react'
import { wedding } from '../data/wedding'
import Reveal from './Reveal'
import Section, { SectionHeading } from './Section'
import { GeometricPattern, ICON_PATHS, Icon } from './Ornaments'

const formatTime = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`

/** Arch-framed invitation video with custom controls. `onPlayingChange` lets the page pause the music. */
export default function FilmPlayer({ onPlayingChange }) {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [current, setCurrent] = useState(0)
  const [duration, setDuration] = useState(0)
  const [started, setStarted] = useState(false)

  const togglePlay = () => {
    const v = videoRef.current
    v.paused ? v.play() : v.pause()
  }

  const seek = (e) => {
    videoRef.current.currentTime = (Number(e.target.value) / 100) * duration
  }

  const fullscreen = () => {
    const v = videoRef.current
    if (v.requestFullscreen) v.requestFullscreen()
    else if (v.webkitEnterFullscreen) v.webkitEnterFullscreen()
  }

  const setPlayState = (isPlaying) => {
    setPlaying(isPlaying)
    onPlayingChange?.(isPlaying)
  }

  const progress = duration ? (current / duration) * 100 : 0

  return (
    <Section
      id="film"
      className="bg-jade-900"
      background={<GeometricPattern className="absolute inset-0 text-gold/10" />}
    >
      <SectionHeading light eyebrow="A glimpse of our joy" title="Invitation Film" subtitle="Press play and celebrate with us." />

      <Reveal variant="zoom" className="mx-auto w-full max-w-[22rem]">
        <div className="arch border border-gold/70 bg-jade-800 p-2 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.6)]">
          <div className="arch relative overflow-hidden border border-gold/40 bg-black">
            <video
              ref={videoRef}
              src={`${wedding.video.src}#t=0.1`}
              className="aspect-[9/16] w-full cursor-pointer object-cover"
              playsInline
              preload="metadata"
              muted={muted}
              onClick={togglePlay}
              onPlay={() => {
                setStarted(true)
                setPlayState(true)
              }}
              onPause={() => setPlayState(false)}
              onEnded={() => setPlayState(false)}
              onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
              onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
            />

            {!playing && (
              <button
                type="button"
                onClick={togglePlay}
                aria-label="Play video"
                className={`absolute inset-0 flex items-center justify-center transition ${
                  started ? 'bg-black/20' : 'bg-gradient-to-t from-jade-950/70 via-transparent to-transparent'
                }`}
              >
                <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-ivory/90 text-jade-800 shadow-xl ring-4 ring-gold/50 transition hover:scale-105">
                  <span className="absolute inset-0 animate-ping rounded-full bg-gold/30" />
                  <Icon d={ICON_PATHS.play} className="relative ml-1 h-9 w-9" />
                </span>
              </button>
            )}

            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-4 pt-10 pb-4">
              <input
                type="range"
                min="0"
                max="100"
                step="0.1"
                value={progress}
                onChange={seek}
                aria-label="Seek"
                className="h-1 w-full cursor-pointer accent-[#e3c98a]"
              />
              <div className="mt-2 flex items-center gap-3 text-ivory">
                <button type="button" onClick={togglePlay} aria-label={playing ? 'Pause' : 'Play'} className="hover:text-gold-light">
                  <Icon d={playing ? ICON_PATHS.pause : ICON_PATHS.play} />
                </button>
                <button
                  type="button"
                  onClick={() => setMuted((m) => !m)}
                  aria-label={muted ? 'Unmute video' : 'Mute video'}
                  className="hover:text-gold-light"
                >
                  <Icon d={muted ? ICON_PATHS.muted : ICON_PATHS.volume} />
                </button>
                <span className="font-display text-xs tabular-nums text-ivory/80">
                  {formatTime(current)} / {formatTime(duration)}
                </span>
                <button type="button" onClick={fullscreen} aria-label="Full screen" className="ml-auto hover:text-gold-light">
                  <Icon d={ICON_PATHS.fullscreen} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
