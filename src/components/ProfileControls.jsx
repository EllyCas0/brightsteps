import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { useT } from '../data/translations.js';
import { backgroundTopics, getBackgroundTopic } from '../data/backgroundTopics.jsx';
import backgroundIcon from '../assets/icon_background.png';
import defaultBackgroundIcon from '../assets/default.png';

export function BackgroundTopicPicker({ value, onChange }) {
  const t = useT();
  const [open, setOpen] = useState(false);
  const activeTopic = getBackgroundTopic(value);

  function choose(topicId) {
    onChange(topicId);
    setOpen(false);
  }

  return (
    <div className="background-picker">
      <button
        className={open ? 'icon-button active' : 'icon-button'}
        type="button"
        aria-label={t('Choose background')}
        aria-expanded={open}
        onClick={() => setOpen((isOpen) => !isOpen)}
        title={t('Choose background')}
      >
        <img className="background-picker-button-image" src={backgroundIcon} alt="" aria-hidden="true" />
      </button>
      {open && (
        <div className="background-menu" role="menu" aria-label={t('Background topics')}>
          <button
            type="button"
            className={!activeTopic ? 'background-choice selected' : 'background-choice'}
            onClick={() => choose('')}
          >
            <span className="background-choice-icon" aria-hidden="true">
              <img src={defaultBackgroundIcon} alt="" />
            </span>
            <span className="background-choice-copy">
              <strong>{t('Default')}</strong>
            </span>
            {!activeTopic && <Check size={16} />}
          </button>
          {backgroundTopics.map((topic) => (
              <button
                key={topic.id}
                type="button"
                className={value === topic.id ? 'background-choice selected' : 'background-choice'}
                onClick={() => choose(topic.id)}
              >
                <span className="background-choice-icon" aria-hidden="true">
                  <img src={topic.iconImage} alt="" />
                </span>
                <span className="background-choice-copy">
                  <strong>{t(topic.label)}</strong>
                </span>
                {value === topic.id && <Check size={16} />}
              </button>
          ))}
        </div>
      )}
    </div>
  );
}
