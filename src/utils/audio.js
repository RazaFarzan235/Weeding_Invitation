/**
 * Two interchangeable background-music engines. Both expose { play(), pause() }.
 *  - createAmbientPad(): soft, procedurally generated pad (no audio file needed)
 *  - createFilePlayer(src): looping <audio> with gentle fade in / out
 */

export function createAmbientPad() {
  const Ctx = window.AudioContext || window.webkitAudioContext
  if (!Ctx) return null

  const ctx = new Ctx()
  const master = ctx.createGain()
  master.gain.value = 0

  const lowpass = ctx.createBiquadFilter()
  lowpass.type = 'lowpass'
  lowpass.frequency.value = 2400
  master.connect(lowpass).connect(ctx.destination)

  // Synthetic reverb: decaying stereo noise impulse
  const reverb = ctx.createConvolver()
  const impulseLen = Math.floor(ctx.sampleRate * 3.5)
  const impulse = ctx.createBuffer(2, impulseLen, ctx.sampleRate)
  for (let ch = 0; ch < 2; ch++) {
    const data = impulse.getChannelData(ch)
    for (let i = 0; i < impulseLen; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / impulseLen, 2.6)
    }
  }
  reverb.buffer = impulse

  const wet = ctx.createGain()
  wet.gain.value = 0.7
  const dry = ctx.createGain()
  dry.gain.value = 0.45
  reverb.connect(wet).connect(master)
  dry.connect(master)

  const bus = ctx.createGain()
  bus.connect(dry)
  bus.connect(reverb)

  const freq = (semitone) => 293.66 * Math.pow(2, semitone / 12) // D4 based
  const chords = [
    [-12, -5, 0, 4, 9],
    [-15, -8, -3, 2, 7],
    [-17, -10, -1, 2, 7],
    [-19, -12, -5, 1, 4],
  ]
  const scale = [0, 2, 4, 7, 9, 12, 14, 16, 19, 21]
  const BAR = 8

  const padNote = (f, t) => {
    const g = ctx.createGain()
    g.gain.setValueAtTime(0, t)
    g.gain.linearRampToValueAtTime(0.035, t + 2.5)
    g.gain.setValueAtTime(0.035, t + BAR - 1)
    g.gain.linearRampToValueAtTime(0, t + BAR + 2)
    g.connect(bus)
    for (const detune of [-4, 4]) {
      const o = ctx.createOscillator()
      o.type = 'sine'
      o.frequency.value = f
      o.detune.value = detune
      o.connect(g)
      o.start(t)
      o.stop(t + BAR + 2.2)
    }
  }

  const pluck = (f, t) => {
    const g = ctx.createGain()
    g.gain.setValueAtTime(0, t)
    g.gain.linearRampToValueAtTime(0.05, t + 0.02)
    g.gain.exponentialRampToValueAtTime(0.0001, t + 3)
    g.connect(bus)
    const o = ctx.createOscillator()
    o.type = 'triangle'
    o.frequency.value = f
    o.connect(g)
    o.start(t)
    o.stop(t + 3.1)
  }

  let bar = 0
  let nextTime = 0
  let scheduler = null
  let suspendTimer = null

  const schedule = () => {
    while (nextTime < ctx.currentTime + BAR) {
      chords[bar % chords.length].forEach((s) => padNote(freq(s), nextTime))
      const count = 3 + Math.floor(Math.random() * 3)
      for (let i = 0; i < count; i++) {
        const s = scale[Math.floor(Math.random() * scale.length)] + 12
        pluck(freq(s), nextTime + 0.5 + i * (BAR / count) + Math.random() * 0.3)
      }
      nextTime += BAR
      bar++
    }
    scheduler = setTimeout(schedule, 2000)
  }

  return {
    play() {
      clearTimeout(suspendTimer)
      ctx.resume()
      if (!scheduler) {
        nextTime = ctx.currentTime + 0.1
        schedule()
      }
      master.gain.cancelScheduledValues(ctx.currentTime)
      master.gain.setTargetAtTime(0.9, ctx.currentTime, 1.2)
    },
    pause() {
      master.gain.cancelScheduledValues(ctx.currentTime)
      master.gain.setTargetAtTime(0, ctx.currentTime, 0.4)
      clearTimeout(scheduler)
      scheduler = null
      suspendTimer = setTimeout(() => ctx.suspend(), 1500)
    },
  }
}

export function createFilePlayer(src, targetVolume = 0.35) {
  const audio = new Audio(src)
  audio.loop = true
  audio.volume = 0
  let fade = null

  const fadeTo = (target, done) => {
    clearInterval(fade)
    fade = setInterval(() => {
      const rising = target > audio.volume
      const next = audio.volume + (rising ? 0.03 : -0.05)
      if ((rising && next >= target) || (!rising && next <= target)) {
        audio.volume = target
        clearInterval(fade)
        done?.()
      } else {
        audio.volume = Math.min(1, Math.max(0, next))
      }
    }, 60)
  }

  return {
    play() {
      audio.play().catch(() => {})
      fadeTo(targetVolume)
    },
    pause() {
      fadeTo(0, () => audio.pause())
    },
  }
}
