import { useId } from 'react'

/* ───── Islamic star geometry (tiling pattern) ───── */
const C = 20
const R = 13
const R_INNER = R * 0.7654
const STAR_POINTS = Array.from({ length: 16 }, (_, i) => {
  const a = (i * Math.PI) / 8 - Math.PI / 2
  const r = i % 2 === 0 ? R : R_INNER
  return `${(C + r * Math.cos(a)).toFixed(2)},${(C + r * Math.sin(a)).toFixed(2)}`
}).join(' ')
const DIAG = +(R * Math.SQRT1_2).toFixed(2)

/** Tiled geometric background. Colour comes from `currentColor`. */
export function GeometricPattern({ className = '', size = 56, strokeWidth = 0.6 }) {
  const id = `geo-${useId().replace(/:/g, '')}`
  return (
    <svg className={`pointer-events-none ${className}`} aria-hidden="true" width="100%" height="100%">
      <defs>
        <pattern id={id} width={size} height={size} patternUnits="userSpaceOnUse" viewBox="0 0 40 40">
          <g fill="none" stroke="currentColor" strokeWidth={strokeWidth}>
            <polygon points={STAR_POINTS} />
            <circle cx={C} cy={C} r="3.2" />
            <path d={`M${C} ${C - R}V0M${C} ${C + R}V40M${C - R} ${C}H0M${C + R} ${C}H40`} />
            <path
              d={`M${C + DIAG} ${C + DIAG}L40 40M${C - DIAG} ${C - DIAG}L0 0M${C + DIAG} ${C - DIAG}L40 0M${C - DIAG} ${C + DIAG}L0 40`}
            />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  )
}

/** Ornamental divider: line · leaf · diamond · leaf · line */
export function Divider({ className = '' }) {
  return (
    <svg viewBox="0 0 240 24" className={`mx-auto h-5 w-52 text-gold sm:w-60 ${className}`} aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round">
        <path d="M4 12h78M158 12h78" />
        <path d="M84 12c8-9 18-9 22 0-4 9-14 9-22 0zM156 12c-8-9-18-9-22 0 4 9 14 9 22 0z" />
      </g>
      <path d="M120 3l5 9-5 9-5-9z" fill="currentColor" />
      <circle cx="108" cy="12" r="1.6" fill="currentColor" />
      <circle cx="132" cy="12" r="1.6" fill="currentColor" />
    </svg>
  )
}

/** Crescent moon & star. */
export function Crescent({ className = '' }) {
  const id = `cres-${useId().replace(/:/g, '')}`
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <mask id={id}>
        <rect width="64" height="64" fill="#fff" />
        <circle cx="38" cy="26" r="17" fill="#000" />
      </mask>
      <circle cx="29" cy="32" r="20" fill="currentColor" mask={`url(#${id})`} />
      <path
        d="M48 10l1.7 3.9 4.2.4-3.2 2.8.9 4.1-3.6-2.2-3.6 2.2.9-4.1-3.2-2.8 4.2-.4z"
        fill="currentColor"
      />
    </svg>
  )
}

/** Four-point twinkle star. */
export function Sparkle({ className = '', style }) {
  return (
    <svg viewBox="0 0 20 20" className={className} style={style} aria-hidden="true">
      <path d="M10 0l2 8 8 2-8 2-2 8-2-8-8-2 8-2z" fill="currentColor" />
    </svg>
  )
}

/* ───── Floral branch ───── */
const LEAF = 'M0 0C5-7 15-8 22 0 15 8 5 7 0 0z'
const LEAVES = [
  [40, 160, -60], [52, 140, 30], [66, 124, -70], [80, 106, 20], [96, 88, -80],
  [112, 72, 10], [128, 56, -90], [146, 42, 0], [164, 30, -100], [26, 176, 40],
]

const Blossom = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[0, 72, 144, 216, 288].map((r) => (
      <ellipse key={r} cx="0" cy="-6" rx="4.2" ry="6.5" transform={`rotate(${r})`} className="fill-ivory stroke-gold" strokeWidth="0.7" />
    ))}
    <circle r="2.6" className="fill-gold" />
  </g>
)

export function FloralBranch({ className = '' }) {
  return (
    <svg viewBox="0 0 200 200" className={`pointer-events-none ${className}`} aria-hidden="true">
      <path d="M8 196C40 170 70 140 96 96S160 26 196 12" fill="none" className="stroke-gold" strokeWidth="1.3" />
      <path d="M70 128c-20-4-36 4-48 18M120 64c4-20 18-32 36-36" fill="none" className="stroke-gold" strokeWidth="0.9" />
      {LEAVES.map(([x, y, r], i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${r})`}>
          <path d={LEAF} className="fill-jade-600/75" />
          <path d="M1 0H20" className="stroke-gold-light" strokeWidth="0.6" />
        </g>
      ))}
      <Blossom x={24} y={146} s={0.9} />
      <Blossom x={156} y={28} s={1.1} />
      <Blossom x={100} y={92} s={0.7} />
      <circle cx="140" cy="70" r="2.4" className="fill-gold-light" />
      <circle cx="58" cy="112" r="2" className="fill-gold-light" />
    </svg>
  )
}

/** Hanging lantern with glowing flame. */
export function Lantern({ className = '' }) {
  const id = `lantern-${useId().replace(/:/g, '')}`
  return (
    <svg viewBox="0 0 60 200" className={`pointer-events-none ${className}`} aria-hidden="true">
      <defs>
        <radialGradient id={id} cx="50%" cy="60%" r="50%">
          <stop offset="0%" stopColor="#fff4cf" />
          <stop offset="60%" stopColor="#f0cf7a" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#c39a45" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path d="M30 0v92" className="stroke-gold" strokeWidth="1" />
      <circle cx="30" cy="140" r="34" fill={`url(#${id})`} className="animate-glow" />
      <path d="M22 92h16l6 12H16z" className="fill-gold-dark" />
      <path d="M16 104h28l4 10v40l-4 8H16l-4-8v-40z" className="fill-gold/25 stroke-gold" strokeWidth="1.4" />
      <path d="M22 114c0-6 8-6 8-10 0 4 8 4 8 10v36H22z" fill="#fff6d8" opacity="0.85" />
      <path d="M12 130h36M30 104v58" className="stroke-gold" strokeWidth="0.8" />
      <path d="M16 162h28l-6 10H22z" className="fill-gold-dark" />
      <path d="M30 172v12" className="stroke-gold" strokeWidth="1.2" />
      <circle cx="30" cy="188" r="3" className="fill-gold" />
    </svg>
  )
}

/** Mosque skyline silhouette. */
export function MosqueSkyline({ className = '' }) {
  return (
    <svg viewBox="0 0 600 140" preserveAspectRatio="xMidYMax meet" className={`pointer-events-none ${className}`} aria-hidden="true">
      <g fill="currentColor">
        <path d="M70 140V48l6-10 6 10v92zM518 140V48l6-10 6 10v92z" />
        <path d="M66 62h20v4H66zM514 62h20v4h-20zM66 92h20v4H66zM514 92h20v4h-20z" />
        <path d="M76 38v-8M524 38v-8" stroke="currentColor" strokeWidth="1.5" />
        <path d="M150 140v-40h70v40zM380 140v-40h70v40z" />
        <path d="M150 100c0-22 18-34 35-40 17 6 35 18 35 40zM380 100c0-22 18-34 35-40 17 6 35 18 35 40z" />
        <path d="M185 60v-10M415 60v-10" stroke="currentColor" strokeWidth="1.5" />
        <path d="M230 140V88h140v52z" />
        <path d="M228 90c0-38 40-56 72-70 32 14 72 32 72 70z" />
        <path d="M300 20V4" stroke="currentColor" strokeWidth="2" />
        <circle cx="300" cy="3" r="3" />
        <path d="M0 140v-14h600v14z" />
      </g>
    </svg>
  )
}

/* ───── Event icons ───── */
const EVENT_ICONS = {
  bowl: (
    <>
      <path d="M8 30h48c-2 14-12 22-24 22S10 44 8 30z" className="fill-jade-700" />
      <path d="M8 30h48" className="stroke-gold" strokeWidth="2" />
      <ellipse cx="32" cy="29" rx="20" ry="4" className="fill-gold-light" />
      <path d="M22 41c3 3 7 3 10 0 3 3 7 3 10 0" fill="none" className="stroke-gold-light" strokeWidth="1.5" />
      <path d="M10 26c-6-6-4-14 4-14-1 6 0 10-4 14zM54 26c6-6 4-14-4-14 1 6 0 10 4 14z" className="fill-jade-600" />
    </>
  ),
  mosque: (
    <>
      <path d="M32 6v6" className="stroke-gold" strokeWidth="2" />
      <path d="M18 30c0-10 8-15 14-18 6 3 14 8 14 18z" className="fill-jade-700" />
      <path d="M16 30h32v24H16z" className="fill-jade-700" />
      <path d="M28 54V44c0-3 2-5 4-5s4 2 4 5v10z" className="fill-gold-light" />
      <path d="M6 54V22l3-5 3 5v32zM52 54V22l3-5 3 5v32z" className="fill-jade-600" />
      <path d="M4 54h56" className="stroke-gold" strokeWidth="2" />
      <path d="M33 3a3 3 0 1 0 2 5 3.5 3.5 0 0 1-2-5z" className="fill-gold" />
    </>
  ),
  dome: (
    <>
      <path d="M32 4v8" className="stroke-gold" strokeWidth="2" />
      <path d="M12 34c0-14 12-20 20-24 8 4 20 10 20 24z" className="fill-jade-700" />
      <path d="M10 34h44v4H10z" className="fill-gold" />
      <path d="M14 38h36v16H14z" className="fill-jade-700" />
      {[20, 28, 36, 44].map((x) => (
        <path key={x} d={`M${x - 2} 54v-9c0-2 1-3 2-3s2 1 2 3v9z`} className="fill-gold-light" />
      ))}
      <path d="M6 54h52" className="stroke-gold" strokeWidth="2" />
      <path d="M33 1a3 3 0 1 0 2 5 3.5 3.5 0 0 1-2-5z" className="fill-gold" />
    </>
  ),
}

export function EventIcon({ name, className = '' }) {
  return (
    <svg viewBox="0 0 64 58" className={className} aria-hidden="true">
      {EVENT_ICONS[name]}
    </svg>
  )
}

/* ───── Small UI icons ───── */
export const PinIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="currentColor" aria-hidden="true">
    <path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
  </svg>
)

export const ClockIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" strokeLinecap="round" />
  </svg>
)

export const Icon = ({ d, className = 'h-5 w-5' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d={d} />
  </svg>
)

export const ICON_PATHS = {
  play: 'M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z',
  pause: 'M7 5h3.5v14H7zM13.5 5H17v14h-3.5z',
  volume:
    'M4 9v6h4l5 4V5L8 9zm12.5 3a4.5 4.5 0 0 0-2.5-4v8a4.5 4.5 0 0 0 2.5-4zM14 3.2v2.1a7 7 0 0 1 0 13.4v2.1a9 9 0 0 0 0-17.6z',
  muted:
    'M4 9v6h4l5 4V5L8 9zm12.3 3l2.6-2.6-1.4-1.4-2.6 2.6-2.6-2.6-1.4 1.4 2.6 2.6-2.6 2.6 1.4 1.4 2.6-2.6 2.6 2.6 1.4-1.4z',
  fullscreen: 'M5 5h5v2H7v3H5zm9 0h5v5h-2V7h-3zM5 14h2v3h3v2H5zm12 3v-3h2v5h-5v-2z',
}
