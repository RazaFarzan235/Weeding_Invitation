import { useCallback, useEffect, useRef, useState } from 'react'
import { createAmbientPad, createFilePlayer } from '../utils/audio'

/**
 * Background music controller.
 * - `play` / `pause` / `toggle` reflect the user's intent (the music button).
 * - `hold(true)` temporarily silences music (e.g. while the film plays) and
 *   `hold(false)` resumes it only if the user had music on.
 */
export default function useBackgroundMusic(src) {
  const engine = useRef(null)
  const hasFile = useRef(false)
  const wanted = useRef(false)
  const held = useRef(false)
  const [playing, setPlaying] = useState(false)

  // Use the audio file if it exists, otherwise fall back to the ambient pad.
  useEffect(() => {
    fetch(src, { method: 'HEAD' })
      .then((res) => {
        hasFile.current = res.ok && (res.headers.get('content-type') || '').startsWith('audio')
      })
      .catch(() => {})
  }, [src])

  const getEngine = useCallback(() => {
    if (!engine.current) {
      engine.current = hasFile.current ? createFilePlayer(src) : createAmbientPad()
    }
    return engine.current
  }, [src])

  const play = useCallback(() => {
    wanted.current = true
    if (!held.current) {
      getEngine()?.play()
      setPlaying(true)
    }
  }, [getEngine])

  const pause = useCallback(() => {
    wanted.current = false
    engine.current?.pause()
    setPlaying(false)
  }, [])

  const toggle = useCallback(() => (wanted.current ? pause() : play()), [play, pause])

  const hold = useCallback(
    (isHeld) => {
      held.current = isHeld
      if (!wanted.current) return
      if (isHeld) {
        engine.current?.pause()
        setPlaying(false)
      } else {
        getEngine()?.play()
        setPlaying(true)
      }
    },
    [getEngine],
  )

  return { playing, play, pause, toggle, hold }
}
