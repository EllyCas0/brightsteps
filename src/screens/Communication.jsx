import React, { useContext, useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Check, ChevronDown, Delete, MessageSquare, Plus, RotateCcw, Star, Trash2, Volume2 } from 'lucide-react';
import { LanguageContext, useT } from '../data/translations.js';
import { VisualAsset } from '../components/VisualAsset.jsx';
import { speak } from '../lib/speech.js';
import { breakSupportCards, communicationCategories, createCustomCommunicationCategory, hurtBodyCards, hurtIntensityCards, normalizeMyVoiceSettings, quickCommunicationCards } from '../data/communication.js';
import { getActivityDisplayTitle } from './Categories.jsx';

export function SpeechBoard({ activity, board, profile, soundOff, onBack, onComplete }) {
  if (board.type === 'communication-board') {
    return <CommunicationBoard activity={activity} profile={profile} soundOff={soundOff} onBack={onBack} onComplete={onComplete} />;
  }
  return <SimpleSpeechBoard activity={activity} board={board} soundOff={soundOff} onBack={onBack} onComplete={onComplete} />;
}

function SimpleSpeechBoard({ activity, board, soundOff, onBack, onComplete }) {
  const t = useT();
  const language = useContext(LanguageContext);
  const [phrase, setPhrase] = useState([]);
  const [lastSpoken, setLastSpoken] = useState('');
  const cards = board.groups.flatMap((group) => group.cards);

  function speakText(text) {
    setLastSpoken(text);
    speak(text, language, soundOff, { rate: 0.82, pitch: 1.08 });
  }

  function addWord(card) {
    const spokenText = card.speak || card.label;
    setPhrase((current) => [...current.slice(-3), card.label]);
    speakText(spokenText);
  }

  function addStarter(starter) {
    setPhrase([starter]);
    speakText(starter);
  }

  function speakPhrase() {
    if (!phrase.length) return;
    speakText(phrase.join(' '));
  }

  return (
    <section className="speech-page">
      <div className="page-title">
        <button className="icon-button" onClick={onBack} aria-label={t('Go back')}><ArrowLeft /></button>
        <span className="round-icon"><MessageSquare /></span>
        <div>
          <p className="eyebrow">{t('Communication')}</p>
          <h1>{t(getActivityDisplayTitle(activity))}</h1>
        </div>
      </div>

      <div className="speech-builder" aria-live="polite">
        <div className="speech-phrase">
          {phrase.length ? phrase.map((word, index) => (
            <span key={`${word}-${index}`}>{word}</span>
          )) : (
            <span>{t('Tap a picture')}</span>
          )}
        </div>
        <div className="speech-actions">
          <button className="primary-button" type="button" disabled={!phrase.length} onClick={speakPhrase}>
            <Volume2 size={18} /> {t('Speak')}
          </button>
          <button className="secondary-button" type="button" disabled={!phrase.length} onClick={() => setPhrase((current) => current.slice(0, -1))}>
            <Delete size={18} /> {t('Backspace')}
          </button>
          <button className="secondary-button" type="button" disabled={!phrase.length} onClick={() => setPhrase([])}>
            <Trash2 size={18} /> {t('Clear')}
          </button>
        </div>
      </div>

      {!!board.phraseStarters.length && (
        <div className="speech-starters" aria-label={t('Phrase starters')}>
          {board.phraseStarters.map((starter) => (
            <button key={starter} type="button" onClick={() => addStarter(starter)}>
              <VisualAsset label={starter} className="speech-mini-image" fallback={false} />
              {t(starter)}
            </button>
          ))}
        </div>
      )}

      <div className="speech-groups">
        {board.groups.map((group) => (
          <section className="speech-group" key={group.title}>
            <h2>{t(group.title)}</h2>
            <div className="speech-card-grid">
              {group.cards.map((card) => (
                <button
                  key={card.label}
                  type="button"
                  className={lastSpoken === (card.speak || card.label) ? 'speech-card selected' : 'speech-card'}
                  onClick={() => addWord(card)}
                >
                  <VisualAsset label={card.label} imageKey={card.image} className="speech-card-image" />
                  <strong>{t(card.label)}</strong>
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="speech-footer">
        <span>{soundOff ? t('Voice muted') : (lastSpoken ? `${t('Heard')}: ${lastSpoken}` : `${cards.length} ${t('picture words')}`)}</span>
        <button className="primary-button" type="button" disabled={!lastSpoken} onClick={onComplete}>
          <Star size={18} /> {t('Finish')}
        </button>
      </div>
    </section>
  );
}

function CommunicationBoard({ activity, profile, soundOff, onBack, onComplete }) {
  const language = useContext(LanguageContext);
  const t = useT();
  const alphabetLetters = language === 'es'
    ? 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('')
    : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const myVoiceSettings = useMemo(() => normalizeMyVoiceSettings(profile?.myVoice), [profile?.myVoice]);
  const configuredQuickCards = useMemo(
    () => quickCommunicationCards.filter((card) => myVoiceSettings.enabledQuick.includes(card.label)),
    [myVoiceSettings]
  );
  const fallbackCategories = useMemo(() => {
    const configuredCategories = communicationCategories.filter((category) => myVoiceSettings.enabledCategories.includes(category.id));
    const customCategory = myVoiceSettings.customCards.length ? createCustomCommunicationCategory(myVoiceSettings.customCards) : null;
    const availableCategories = customCategory ? [...configuredCategories, customCategory] : configuredCategories;
    return availableCategories.length ? availableCategories : communicationCategories;
  }, [myVoiceSettings]);
  const [activeTab, setActiveTab] = useState(fallbackCategories[0].id);
  const [sentenceParts, setSentenceParts] = useState([]);
  const [letterWord, setLetterWord] = useState('');
  const [alphabetOpen, setAlphabetOpen] = useState(false);
  const [lastSpoken, setLastSpoken] = useState('');
  const [followUp, setFollowUp] = useState(null);
  const sentence = sentenceParts.join(' ');
  const activeCategory = fallbackCategories.find((category) => category.id === activeTab) || fallbackCategories[0];

  useEffect(() => {
    if (!fallbackCategories.some((category) => category.id === activeTab)) {
      setActiveTab(fallbackCategories[0].id);
      setFollowUp(null);
    }
  }, [activeTab, fallbackCategories]);

  function speakText(text) {
    setLastSpoken(text);
    speak(text, language, soundOff, { rate: 0.82, pitch: 1.08 });
  }

  function chooseCard(card) {
    const text = card.custom ? (card.sentence || card.label) : t(card.sentence || card.label);
    setSentenceParts((current) => [...current, text].slice(-2));
    setFollowUp(card.followUp || null);
    speakText(text);
  }

  function repeatSentence() {
    if (sentence) speakText(sentence);
  }

  function addLetter(letter) {
    setLetterWord((current) => `${current}${letter.toLowerCase()}`.slice(0, 18));
  }

  function speakLetterWord() {
    if (letterWord) speakText(letterWord);
  }

  function addLetterWordToMessage() {
    if (!letterWord) return;
    setSentenceParts((current) => [...current, letterWord].slice(-2));
    speakText(letterWord);
    setLetterWord('');
    setFollowUp(null);
  }

  const followUpTitle = followUp === 'break'
    ? 'What would help?'
    : followUp === 'hurt'
      ? 'Where does it hurt?'
      : followUp === 'hurt-intensity'
        ? 'How much does it hurt?'
        : '';
  const followUpCards = followUp === 'break' ? breakSupportCards : followUp === 'hurt' ? hurtBodyCards : followUp === 'hurt-intensity' ? hurtIntensityCards : [];
  const visibleCards = followUpCards.length ? followUpCards : activeCategory.cards;
  const groupedCards = visibleCards.reduce((groups, card) => {
    const groupName = card.group || '';
    if (!groups[groupName]) groups[groupName] = [];
    groups[groupName].push(card);
    return groups;
  }, {});
  const cardGroups = Object.entries(groupedCards);

  return (
    <section className="speech-page communication-page">
      <header className="communication-header">
        <button className="icon-button communication-back-button" onClick={onBack} aria-label={t('Go back')}><ArrowLeft /></button>
        <div className="communication-title">
          <div className="communication-title-heading">
            <h1>{t('My Voice')}</h1>
            <span className="communication-title-icon" aria-hidden="true"><MessageSquare size={26} /></span>
          </div>
          <p>{t('Tap pictures to tell us what you want to say')}</p>
        </div>
        <button className="icon-button communication-finish-button" type="button" disabled={!lastSpoken} onClick={onComplete} aria-label={t('Finish')}>
          <Check />
        </button>
      </header>

      <div className="speech-builder communication-builder" aria-live="polite">
        <div className="communication-message">
          <p>{t('Your message')}</p>
          <div className="speech-phrase communication-phrase" aria-label={t('Sentence builder')}>
            {sentenceParts.length ? sentenceParts.map((part, index) => (
              <span key={`${part}-${index}`}>{part}</span>
            )) : (
              <span>{t('Tap a picture')}</span>
            )}
          </div>
        </div>
        <div className="speech-actions">
          <button className="primary-button" type="button" disabled={!sentence} onClick={repeatSentence}>
            <Volume2 size={18} /> {t('Speak')}
          </button>
          <button className="secondary-button" type="button" disabled={!sentenceParts.length} onClick={() => setSentenceParts((current) => current.slice(0, -1))}>
            <Delete size={18} /> {t('Back')}
          </button>
          <button className="secondary-button" type="button" disabled={!sentenceParts.length} onClick={() => { setSentenceParts([]); setFollowUp(null); }}>
            <Trash2 size={18} /> {t('Clear')}
          </button>
        </div>
      </div>

      {!!configuredQuickCards.length && (
        <div className="quick-communication-bar" aria-label={t('Quick communication')}>
          {configuredQuickCards.map((card) => (
            <button key={card.label} type="button" onClick={() => chooseCard(card)}>
              <VisualAsset label={card.label} imageKey={card.image} className="quick-card-image" fallback={false} />
              <span>{card.custom ? card.label : t(card.label)}</span>
            </button>
          ))}
        </div>
      )}

      <div className="communication-workspace">
        <nav className="communication-tabs" aria-label={t('Communication categories')}>
          {fallbackCategories.map((category) => (
            <button
              key={category.id}
              type="button"
              className={activeTab === category.id ? 'active' : ''}
              onClick={() => { setActiveTab(category.id); setFollowUp(null); }}
            >
              <VisualAsset label={category.label} imageKey={category.image} className="communication-tab-image" fallback={false} />
              <span>
                <strong>{t(category.label)}</strong>
                <small>{t(category.description)}</small>
              </span>
              {activeTab === category.id && <Check size={18} aria-hidden="true" />}
            </button>
          ))}
        </nav>

        <div className="communication-main-panel">
          <section className={alphabetOpen ? 'alphabet-builder open' : 'alphabet-builder'} aria-label={t('Alphabet word builder')}>
            <button
              className="alphabet-builder-toggle"
              type="button"
              aria-expanded={alphabetOpen}
              onClick={() => setAlphabetOpen((isOpen) => !isOpen)}
            >
              <span>
                <small>{t('Letters')}</small>
                <strong>{t('Spell a word')}</strong>
              </span>
              <span className="alphabet-word compact" aria-label={t('Word from letters')}>
                {letterWord || t('Tap letters')}
              </span>
              <ChevronDown className="alphabet-toggle-icon" size={20} aria-hidden="true" />
            </button>
            {alphabetOpen && (
              <>
                <div className="alphabet-grid">
                  {alphabetLetters.map((letter) => (
                    <button key={letter} type="button" onClick={() => addLetter(letter)} aria-label={`${t('Letter')} ${letter}`}>
                      {letter}
                    </button>
                  ))}
                </div>
                <div className="alphabet-actions">
                  <button className="primary-button" type="button" disabled={!letterWord} onClick={addLetterWordToMessage}>
                    <Plus size={18} /> {t('Add word')}
                  </button>
                  <button className="secondary-button" type="button" disabled={!letterWord} onClick={speakLetterWord}>
                    <Volume2 size={18} /> {t('Speak word')}
                  </button>
                  <button className="secondary-button" type="button" disabled={!letterWord} onClick={() => setLetterWord((current) => current.slice(0, -1))}>
                    <Delete size={18} /> {t('Back')}
                  </button>
                  <button className="secondary-button" type="button" disabled={!letterWord} onClick={() => setLetterWord('')}>
                    <Trash2 size={18} /> {t('Clear')}
                  </button>
                </div>
              </>
            )}
          </section>

          <section className="speech-group communication-group">
            <h2>{t(followUpTitle || activeCategory.label)}</h2>
            {activeCategory.id === 'choice' && (
              <p className="caregiver-note">{t('Caregivers can swap these choices for the real options available right now.')}</p>
            )}
            {activeCategory.id === 'hurt' && (
              <p className="caregiver-note">{t('Caregiver note: this app does not provide medical assessment or diagnosis.')}</p>
            )}
            {activeCategory.id === 'questions' && (
              <p className="caregiver-note">{t('For children who are ready for this level.')}</p>
            )}
            {cardGroups.map(([groupName, cards]) => (
              <div className="communication-card-section" key={groupName || activeCategory.id}>
                {groupName && <h3>{t(groupName)}</h3>}
                <div className={activeCategory.large ? 'speech-card-grid communication-card-grid large-cards' : 'speech-card-grid communication-card-grid'}>
                  {cards.map((card) => (
                    <button
                      key={card.label}
                      type="button"
                      className={card.prominent ? 'speech-card communication-card prominent' : 'speech-card communication-card'}
                      onClick={() => chooseCard(card)}
                    >
                      <VisualAsset label={card.label} imageKey={card.image} className="speech-card-image communication-card-image" fallback={false} />
                      <strong>{card.custom ? card.label : t(card.label)}</strong>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>

      <div className="speech-footer">
        <span>{soundOff ? t('Voice muted') : (lastSpoken ? `${t('Heard')}: ${lastSpoken}` : t('Ready to communicate'))}</span>
        <button className="secondary-button" type="button" disabled={!lastSpoken} onClick={() => speakText(lastSpoken)}>
          <RotateCcw size={18} /> {t('Repeat')}
        </button>
      </div>
    </section>
  );
}

