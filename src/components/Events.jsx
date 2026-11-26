import { wedding } from '../data/wedding'
import Reveal from './Reveal'
import Section, { SectionHeading } from './Section'
import { ClockIcon, Divider, EventIcon, PinIcon } from './Ornaments'

const formatDate = (iso) => {
  const d = new Date(`${iso}T00:00:00`)
  return {
    weekday: d.toLocaleDateString('en-GB', { weekday: 'long' }),
    day: d.getDate(),
    month: d.toLocaleDateString('en-GB', { month: 'long' }),
    year: d.getFullYear(),
  }
}

function EventCard({ event, index }) {
  const date = formatDate(event.date)
  const f = event.featured

  return (
    <Reveal delay={index * 150} className="h-full">
      <article
        className={`arch group flex h-full flex-col border p-2 transition duration-500 hover:-translate-y-1.5 ${
          f
            ? 'border-gold bg-blush-deep text-ink shadow-[0_30px_60px_-25px_rgb(110_75_88/0.4)]'
            : 'border-gold/50 bg-white/70 shadow-[0_25px_50px_-30px_rgb(110_75_88/0.3)]'
        }`}
      >
        <div className={`arch flex flex-1 flex-col border px-6 pt-14 pb-8 text-center ${f ? 'border-gold/40' : 'border-gold/25'}`}>
          <div className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full ${f ? 'bg-ivory' : 'bg-ivory-deep'}`}>
            <EventIcon name={event.icon} className="h-11 w-11" />
          </div>

          <h3 className="mt-6 font-display text-3xl tracking-[0.15em] text-mauve-800 uppercase">{event.title}</h3>
          <p className={`mt-2 text-base italic ${f ? 'text-ink/70' : 'text-ink/60'}`}>{event.tagline}</p>

          <Divider className="my-5 w-40!" />

          <p className="eyebrow text-gold-dark">{date.weekday}</p>
          <p className="font-display text-6xl leading-none text-mauve-800">{date.day}</p>
          <p className={`eyebrow mt-1 ${f ? 'text-ink/80' : 'text-ink/70'}`}>
            {date.month} {date.year}
          </p>

          <div className={`mt-6 space-y-3 text-base ${f ? 'text-ink/85' : 'text-ink/75'}`}>
            <p className="flex items-center justify-center gap-2">
              <ClockIcon /> {event.time}
            </p>
            <div>
              <p className={`flex items-center justify-center gap-1.5 font-display tracking-wider uppercase ${f ? 'text-gold-dark' : 'text-mauve-700'}`}>
                <PinIcon /> {event.venue}
              </p>
              <p className="mx-auto mt-1 max-w-[16rem] leading-snug">{event.address}</p>
            </div>
          </div>

          <div className="mt-auto pt-7">
            <a href={event.map} target="_blank" rel="noopener noreferrer" className="btn-outline">
              Get Directions
            </a>
          </div>
        </div>
      </article>
    </Reveal>
  )
}

export default function Events() {
  return (
    <Section id="events">
      <SectionHeading
        eyebrow="Save the dates"
        title="Wedding Festivities"
        subtitle="Join us as we celebrate each blessed moment with our family and loved ones."
      />
      <div className="mx-auto grid max-w-sm gap-8 md:max-w-none md:grid-cols-3 lg:gap-10">
        {wedding.events.map((event, i) => (
          <EventCard key={event.id} event={event} index={i} />
        ))}
      </div>
    </Section>
  )
}
