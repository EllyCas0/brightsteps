import React from 'react';
import { Image as ImageIcon, Video } from 'lucide-react';
import { useT } from '../data/translations.js';

export function MediaToggle({ value, onChange }) {
  const t = useT();
  const selected = value === 'videos' ? 'videos' : 'images';
  return (
    <div className="mode-toggle media-toggle" aria-label={t('Media type')}>
      <button
        type="button"
        className={selected === 'images' ? 'mode-option active' : 'mode-option'}
        aria-pressed={selected === 'images'}
        onClick={() => onChange('images')}
      >
        <ImageIcon size={16} /> {t('Images')}
      </button>
      <button
        type="button"
        className={selected === 'videos' ? 'mode-option active' : 'mode-option'}
        aria-pressed={selected === 'videos'}
        onClick={() => onChange('videos')}
      >
        <Video size={16} /> {t('Videos')}
      </button>
    </div>
  );
}
