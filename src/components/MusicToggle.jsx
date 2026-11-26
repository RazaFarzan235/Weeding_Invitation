import { ICON_PATHS, Icon } from './Ornaments'

/** Floating sound button: animated equalizer while music plays. */
export default function MusicToggle({ playing, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={playing ? 'Mute background music' : 'Play background music'}
      aria-pressed={playing}
      className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 flex h-12 w-12 items-center justify-center rounded-full border border-gold/70 bg-ivory/90 text-gold-dark shadow-lg backdrop-blur transition hover:scale-105 sm:right-6 sm:bottom-6 sm:h-14 sm:w-14"
    >
      {playing ? (
        <span className="flex h-5 items-end gap-[3px]" aria-hidden="true">
          {[0, 0.3, 0.15, 0.45].map((delay, i) => (
            <span
              key={i}
              className="h-full w-[3px] origin-bottom rounded-full bg-gold-dark"
              style={{ animation: `eq 1s ease-in-out ${delay}s infinite` }}
            />
          ))}
        </span>
      ) : (
        <Icon d={ICON_PATHS.muted} />
      )}
    </button>
  )
}
