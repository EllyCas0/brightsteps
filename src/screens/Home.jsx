import React, { useContext, useEffect, useState } from 'react';
import { BookOpen, Hand, MessageSquare, Puzzle, Star } from 'lucide-react';
import { LanguageContext, useT } from '../data/translations.js';
import { Avatar, VisualAsset } from '../components/VisualAsset.jsx';
import { speak } from '../lib/speech.js';

export function ChildHome({ profile, activeAvatar, progress, isFirstHomeVisit, soundOff, setScreen, onLearn, onChangeAvatar, onSpeechTable, onQuickChoice, onMoodChoice }) {
  const t = useT();
  const language = useContext(LanguageContext);
  const [moodPickerOpen, setMoodPickerOpen] = useState(!progress.moodLog[0]?.mood);
  const cards = [
    { id: 'learn', label: 'Learn', icon: <BookOpen />, tone: 'mint' },
    { id: 'speech', label: 'Communication', icon: <MessageSquare />, tone: 'aqua' },
    { id: 'play', label: 'Games', icon: <Puzzle />, tone: 'sky' }
  ];
  const moodOptions = [
    { face: ':)', label: 'Happy', image: 'Happy' },
    { face: ':D', label: 'Excited', image: 'Excited' },
    { face: ':|', label: 'Okay', image: 'Okay' },
    { face: ':(', label: 'Sad', image: 'Sad' },
    { face: ':/', label: 'Worried', image: 'Worried' },
    { face: '>:(', label: 'Mad', image: 'Mad' }
  ];
  const selectedMoodLabel = progress.moodLog[0]?.mood;
  const selectedMood = moodOptions.find((mood) => mood.label === selectedMoodLabel);
  const visibleMoodOptions = moodPickerOpen
    ? moodOptions
    : moodOptions.filter((mood) => mood.label === selectedMoodLabel);

  useEffect(() => {
    if (!selectedMoodLabel) {
      setMoodPickerOpen(true);
    }
  }, [selectedMoodLabel]);

  function selectMood(mood) {
    onMoodChoice(mood.label);
    setMoodPickerOpen(false);
    speak(t(mood.label), language, soundOff, { rate: 0.9 });
  }

  return (
    <>
      <section className="welcome-band">
        <div className="welcome-copy">
          <p className="eyebrow">{t(isFirstHomeVisit ? 'Welcome' : 'Welcome back')}</p>
          <h1 className="welcome-heading">
            <Hand className="welcome-hand-icon" aria-hidden="true" />
            <span>{language === 'es' ? `¡Hola ${profile?.name || 'amigo'}, vamos a divertirnos hoy!` : `Hi ${profile?.name || 'friend'}, let's have fun today!`}</span>
          </h1>
        </div>
        <button className="home-avatar-card avatar-edit-button" type="button" onClick={onChangeAvatar} aria-label={t('Change avatar')}>
          <Avatar avatar={activeAvatar} name={profile?.name || 'Child'} size="hero" />
        </button>
      </section>
      <section className={selectedMood && !moodPickerOpen ? 'home-section feelings-section feelings-section-compact' : 'home-section feelings-section'}>
        <div className="home-section-heading">
          <h2>{t('How do you feel?')}</h2>
          {selectedMood && !moodPickerOpen && (
            <button
              type="button"
              className="selected-mood-chip"
              aria-label={`${t('How do you feel?')} ${t(selectedMood.label)}`}
              onClick={() => setMoodPickerOpen(true)}
            >
              <span aria-hidden="true"><VisualAsset label={selectedMood.face} imageKey={selectedMood.image} /></span>
              <strong>{t(selectedMood.label)}</strong>
            </button>
          )}
        </div>
        {moodPickerOpen && (
          <div className="mood-picker" aria-label={t('How do you feel?')}>
            {visibleMoodOptions.map((mood) => {
              const isSelected = selectedMoodLabel === mood.label;
              return (
                <button
                  key={mood.label}
                  type="button"
                  className={isSelected ? 'mood-card selected' : 'mood-card'}
                  aria-pressed={isSelected}
                  onClick={() => selectMood(mood)}
                >
                  <span aria-hidden="true"><VisualAsset label={mood.face} imageKey={mood.image} /></span>
                  <strong>{t(mood.label)}</strong>
                </button>
              );
            })}
          </div>
        )}
      </section>
      <section className="home-section activity-choice-section">
        <div className="home-section-heading">
          <h2>{t('What do you want to do?')}</h2>
        </div>
        <div className="child-grid primary-child-grid" aria-label={t('What do you want to do?')}>
          {cards.map((card) => (
            <button
              key={card.id}
              className={`big-card ${card.tone}`}
              onClick={card.id === 'speech' ? onSpeechTable : card.id === 'learn' ? onLearn : () => setScreen(card.id)}
            >
              {card.icon}
              <span>{t(card.label)}</span>
            </button>
          ))}
        </div>
      </section>
    </>
  );
}

export function Celebration({ celebration, onContinue, onHome }) {
  const t = useT();
  return (
    <section className="celebration-page">
      <div className="celebration-burst" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="celebration-panel">
        <div className="celebration-star"><Star /></div>
        <h1>{t(celebration.title)}</h1>
        <div className="form-actions">
          <button className="secondary-button" type="button" onClick={onHome}>{t('Home')}</button>
          <button className="primary-button" type="button" onClick={onContinue}>{t('Keep practicing')}</button>
        </div>
      </div>
    </section>
  );
}

