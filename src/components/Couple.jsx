import { wedding } from '../data/wedding'
import Reveal from './Reveal'
import Section, { SectionHeading } from './Section'
import { FloralBranch, GeometricPattern } from './Ornaments'

function PersonCard({ role, person, variant }) {
  return (
    <Reveal variant={variant} className="mx-auto w-full max-w-xs">
      <div className="arch border border-gold/60 bg-white/60 p-2 shadow-[0_30px_60px_-30px_rgb(110_75_88/0.3)]">
        <div className="arch relative overflow-hidden border border-gold/30 bg-gradient-to-b from-ivory to-ivory-deep px-6 pt-14 pb-10 text-center">
          <div className="relative mx-auto flex h-32 w-32 items-center justify-center overflow-hidden rounded-full bg-blush-deep ring-4 ring-gold/40 ring-offset-4 ring-offset-ivory">
            <GeometricPattern className="absolute inset-0 text-gold/25" size={36} />
            <span className="relative font-script text-7xl text-gold-dark">{person.initial}</span>
          </div>
          <p className="eyebrow mt-8 text-gold-dark">{role}</p>
          <h3 className="mt-2 font-display text-2xl text-mauve-800 sm:text-[1.7rem]">{person.fullName}</h3>
          <p className="mt-2 text-lg italic text-ink/65">{person.parentage}</p>
        </div>
      </div>
    </Reveal>
  )
}

export default function Couple() {
  return (
    <Section id="couple">
      <FloralBranch className="absolute -top-8 -right-16 w-48 rotate-180 opacity-60 sm:w-64" />
      <SectionHeading
        eyebrow="Two hearts, one faith"
        title="The Couple"
        subtitle="By the grace of Allah, two souls are joined in a bond of love, mercy and companionship."
      />
      <div className="grid items-center gap-10 md:grid-cols-[1fr_auto_1fr] md:gap-6">
        <PersonCard role="The Groom" person={wedding.groom} variant="left" />
        <Reveal variant="zoom" className="text-center">
          <span className="gold-text font-script text-7xl">&amp;</span>
        </Reveal>
        <PersonCard role="The Bride" person={wedding.bride} variant="right" />
      </div>
    </Section>
  )
}
