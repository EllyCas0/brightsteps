import { useEffect, useId, useRef } from 'react';
import { ChevronRight, Puzzle, RotateCcw, Star } from 'lucide-react';
import { useT } from '../data/translations.js';

export function GameCompleteActions({ onRepeat, onGames, onNext, backLabel = 'Back to Games', nextLabel = 'Next story' }) {
  const t = useT();
  const dialogRef = useRef(null);
  const titleRef = useRef(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    titleRef.current.focus();
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus?.isConnected) previousFocus.focus();
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className="game-complete-dialog"
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        onGames();
      }}
    >
      <div className="game-complete-card">
        <div className="celebration-star game-complete-star" aria-hidden="true"><Star /></div>
        <h2 id={titleId} ref={titleRef} tabIndex={-1}>{t('Good job!')}</h2>
        <div className="form-actions">
          <button className="secondary-button" type="button" onClick={onRepeat}>
            <RotateCcw size={24} /> {t('Repeat')}
          </button>
          <button className={onNext ? 'secondary-button' : 'primary-button'} type="button" onClick={onGames}>
            <Puzzle size={24} /> {t(backLabel)}
          </button>
          {onNext && (
            <button className="primary-button" type="button" onClick={onNext}>
              {t(nextLabel)} <ChevronRight size={24} />
            </button>
          )}
        </div>
      </div>
    </dialog>
  );
}
