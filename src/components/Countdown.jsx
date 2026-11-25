import { wedding } from '../data/wedding'
import useCountdown from '../hooks/useCountdown'
import Reveal from './Reveal'
import { Crescent } from './Ornaments'

export default function Countdown() {
  const time = useCountdown(wedding.countdownTo)
  const units = [
    ['Days', time.days],
    ['Hours', time.hours],
    ['Minutes', time.minutes],
    ['Seconds', time.seconds],
  ]

  return (
    <section className="relative bg-ivory-deep px-5 py-16 sm:py-20">
      <Reveal className="mx-auto max-w-3xl text-center">
        <Crescent className="mx-auto h-8 w-8 text-gold" />
        <p className="eyebrow mt-4 text-gold-dark">{time.done ? 'Alhamdulillah' : 'Counting down to the Nikah'}</p>

        {time.done ? (
          <p className="mt-4 font-script text-5xl text-jade-800">The celebrations have begun</p>
        ) : (
          <div className="mt-8 grid grid-cols-4 gap-2 sm:gap-5" role="timer" aria-live="off">
            {units.map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-gold/40 bg-ivory px-1 py-4 shadow-sm sm:py-6">
                <div className="font-display text-3xl text-jade-800 tabular-nums sm:text-5xl">{String(value).padStart(2, '0')}</div>
                <div className="eyebrow mt-2 text-[0.55rem]! text-gold-dark sm:text-[0.68rem]!">{label}</div>
              </div>
            ))}
          </div>
        )}
      </Reveal>
    </section>
  )
}
