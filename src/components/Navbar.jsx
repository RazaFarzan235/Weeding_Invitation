import { useEffect, useState } from 'react'
import { navLinks, wedding } from '../data/wedding'

/** Sticky nav that slides in after the hero has been scrolled past. */
export default function Navbar() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.7)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-40 border-b border-gold/30 bg-ivory/85 backdrop-blur-md transition duration-500 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-full opacity-0'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
        <a href="#home" className="shrink-0 font-script text-3xl text-mauve-800">
          {wedding.groom.initial}
          <span className="text-gold">&amp;</span>
          {wedding.bride.initial}
        </a>
        <ul className="flex gap-5 sm:gap-7">
          {navLinks.map(({ label, href, hideOnMobile }) => (
            <li key={href} className={hideOnMobile ? 'hidden sm:block' : ''}>
              <a href={href} className="eyebrow whitespace-nowrap text-mauve-700 transition hover:text-gold-dark">
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
