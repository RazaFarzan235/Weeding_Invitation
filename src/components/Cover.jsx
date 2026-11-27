import { useState } from 'react'
import { wedding } from '../data/wedding'
import { Crescent, Divider, GeometricPattern } from './Ornaments'

const Door = ({ side, open }) => {
  const left = side === 'left'
  return (
    <div
      className={`absolute inset-y-0 w-1/2 overflow-hidden bg-blush-deep border-gold/60 transition-transform duration-[1600ms] ease-[cubic-bezier(.7,0,.2,1)] ${
        left ? 'left-0 border-r' : 'right-0 border-l'
      } ${open ? (left ? '-translate-x-full' : 'translate-x-full') : ''}`}
    >
      <GeometricPattern className={`absolute inset-y-0 w-[200%] text-gold/20 ${left ? 'left-0' : 'right-0'}`} />
      <div className="absolute inset-0 bg-gradient-to-b from-ivory/40 via-transparent to-mauve-700/15" />
    </div>
  )
}

/** Full-screen "gate" that opens to reveal the invitation. */
export default function Cover({ onOpen, onDone }) {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    if (open) return
    setOpen(true)
    onOpen()
    setTimeout(onDone, 1700)
  }

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-label="Wedding invitation cover">
      <Door side="left" open={open} />
      <Door side="right" open={open} />

      <div className={`relative flex h-full items-center justify-center px-6 transition-all duration-700 ${open ? 'scale-95 opacity-0' : 'opacity-100'}`}>
        <div className="arch animate-fade-in-up relative w-full max-w-sm border border-gold/70 bg-ivory/90 p-2 shadow-2xl backdrop-blur-sm">
          <div className="arch border border-gold/40 px-6 pt-16 pb-10 text-center sm:px-10">
            <Crescent className="mx-auto mb-6 h-12 w-12 text-gold-dark" />
            <p className="font-arabic text-2xl text-gold-dark" lang="ar" dir="rtl">
              بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
            </p>
            <p className="eyebrow mt-6 text-ink/70">You are invited to the wedding of</p>
            <h1 className="mt-4 font-script text-6xl leading-none text-mauve-800">
              {wedding.groom.name}
              <span className="my-1 block text-4xl text-gold-dark">&amp;</span>
              {wedding.bride.name}
            </h1>
            <Divider className="mt-6" />
            <p className="eyebrow mt-4 text-gold-dark">{wedding.dateRange}</p>
            <button type="button" onClick={handleOpen} className="btn-gold btn-invite mt-9">
              <span>Open Invitation</span>
            </button>
            <p className="mt-4 text-sm italic text-ink/55">Best experienced with sound on</p>
          </div>
        </div>
      </div>
    </div>
  )
}
