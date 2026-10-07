import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, Banana, Bed, Bone, Car, Cat as CatIcon, Check, ChevronRight, CupSoda, Delete, Droplets, FileText, Flame, Flower2, HeartHandshake, Info, KeyRound, LockKeyhole, Minus, Pencil, Plus, Puzzle, RotateCcw, Rocket, Smile, Star, Umbrella, Volume2 } from 'lucide-react';
import { LanguageContext, useT } from '../data/translations.js';
import { speak } from '../lib/speech.js';
import { VisualAsset } from '../components/VisualAsset.jsx';
import { MediaToggle } from './MediaToggle.jsx';
import { getActivityDisplayTitle } from './Categories.jsx';
import { activityGames, createMemoryDeck, getImageAsset, shuffleCards } from '../data/appData.jsx';

const shapeSortColorVariants = ['coral', 'blue', 'gold', 'plum', 'leaf', 'pink', 'orange', 'aqua'];

function ShapeIcon({ shape, size = 'small', colorVariant }) {
  return (
    <span
      className={[
        'shape-icon',
        `shape-${shape.toLowerCase()}`,
        `shape-${size}`,
        colorVariant ? `shape-color-${colorVariant}` : ''
      ].filter(Boolean).join(' ')}
      aria-hidden="true"
    />
  );
}

function createShapeSortPieces(choices = []) {
  return shuffleCards(choices.flatMap((choice, choiceIndex) => (
    [0, 1].map((copyIndex) => ({
      ...choice,
      id: `${choice.value}-${copyIndex}`,
      colorVariant: shapeSortColorVariants[(choiceIndex * 2 + copyIndex) % shapeSortColorVariants.length]
    }))
  )));
}

function SizeSortIcon({ size = 'medium', target = false }) {
  return <span className={`size-sort-icon size-sort-${size}${target ? ' size-sort-target' : ''}`} aria-hidden="true" />;
}

function SizeSortObjectVisual({ piece }) {
  const object = piece.object || 'Ball';
  if (object === 'Ball') {
    return <span className={`size-sort-object size-sort-object-${piece.size} size-sort-ball`} aria-hidden="true" />;
  }
  if (object === 'Car') {
    return <Car className={`size-sort-object size-sort-object-${piece.size} size-sort-line-object`} aria-hidden="true" />;
  }
  return (
    <VisualAsset
      label={object}
      className={`size-sort-object size-sort-object-${piece.size} size-sort-image-object`}
      fallback={false}
    />
  );
}

const pairObjectIcons = {
  banana: Banana,
  bed: Bed,
  cat: CatIcon,
  cup: CupSoda,
  key: KeyRound,
  lock: LockKeyhole,
  paper: FileText,
  pencil: Pencil,
  rain: Droplets,
  umbrella: Umbrella,
  water: Droplets
};

function PairObjectVisual({ item, className = 'pair-object-icon' }) {
  const Icon = pairObjectIcons[item.icon] || pairObjectIcons[item.id];
  if (!Icon) return <VisualAsset label={item.label} className={className} fallback={false} />;
  return <Icon className={className} aria-hidden="true" />;
}

function WordLetterBadge({ label, className = '' }) {
  const firstLetter = String(label || '').trim().charAt(0).toUpperCase();
  return <span className={`word-letter-badge ${className}`.trim()} aria-hidden="true">{firstLetter}</span>;
}

function GameTargetVisual({ activityTitle, target, label }) {
  const displayLabel = label || target.label;
  if (activityTitle === 'Color Match') {
    return <span className="sr-only">{target.label}</span>;
  }
  if (activityTitle === 'Sound Match') {
    return <Volume2 className="sound-target-icon" aria-hidden="true" />;
  }
  if (activityTitle === 'Letter Match') {
    return <span className="game-letter game-letter-large">{target.label}</span>;
  }
  if (activityTitle === 'Picture Words') {
    return (
      <div className="picture-word-target">
        <VisualAsset label={target.label} className="target-image picture-word-target-image" />
        <div className="picture-word-target-copy">
          <WordLetterBadge label={displayLabel} />
          <strong>{displayLabel}</strong>
        </div>
      </div>
    );
  }
  if (activityTitle === 'Shape Sort') {
    return <ShapeIcon shape={target.label} size="large" />;
  }
  if (activityTitle === 'Sort by Size') {
    return <SizeSortIcon size={target.size} target />;
  }
  if (activityTitle === 'Match Pairs') {
    return <PairObjectVisual item={target} className="pair-object-icon pair-target-icon" />;
  }
  if (activityTitle === 'Number Garden') {
    const flowerCount = Number.isFinite(target.count) ? target.count : Number(target.label) || 3;
    const countItem = target.item || 'Flower';
    return (
      <div className="flower-count" aria-hidden="true">
        {Array.from({ length: flowerCount }).map((_, index) => (
          <VisualAsset key={index} label={countItem} className="count-image" />
        ))}
      </div>
    );
  }
  return <VisualAsset label={target.label} className="target-image" />;
}

function GameChoiceVisual({ activityTitle, choice, label }) {
  const displayLabel = label || choice.label;
  if (activityTitle === 'Color Match') {
    return <span className="color-swatch" style={{ '--swatch-color': choice.value }} aria-hidden="true" />;
  }
  if (activityTitle === 'Letter Match') {
    return <span className="game-letter game-letter-small" aria-hidden="true">{choice.label}</span>;
  }
  if (activityTitle === 'Shape Sort') {
    return <ShapeIcon shape={choice.label} />;
  }
  if (activityTitle === 'Sort by Size') {
    return <SizeSortIcon size={choice.size} />;
  }
  if (activityTitle === 'Match Pairs') {
    return <PairObjectVisual item={choice} className="pair-object-icon pair-choice-icon" />;
  }
  if (activityTitle === 'Picture Words') {
    return (
      <span className="picture-word-choice-copy">
        <WordLetterBadge label={displayLabel} className="choice-letter" />
        <span>{displayLabel}</span>
      </span>
    );
  }
  return <VisualAsset label={choice.label} className="choice-image" fallback={false} />;
}

function getPositiveMessage(activityTitle, roundIndex, hadHelp = false) {
  if (hadHelp) return 'You found it!';
  const messagesByGame = {
    'Sound Match': ['Great listening!', 'You heard it!', 'Nice listening!'],
    'Emotion Match': ['You found the feeling!', 'Nice looking!', 'You noticed it!'],
    'Shape Sort': ['Nice sorting!', 'Right group!', 'Good sorting!'],
    'Sort by Size': ['Nice order!', 'You sorted it!', 'Great ordering!'],
    'Match Pairs': ['Great match!', 'They go together!', 'Nice pair!'],
    'Picture Words': ['Nice word!', 'You read it!', 'Great word match!'],
    'Color Match': ['Nice work!', 'You found it!', 'Great match!'],
    'Letter Match': ['Nice work!', 'You found it!', 'Great match!'],
    'Number Garden': ['Nice counting!', 'You counted it!', 'Great counting!']
  };
  const messages = messagesByGame[activityTitle] || ['Nice work!', 'You found it!', 'Great match!'];
  return messages[roundIndex % messages.length];
}

function RoundCelebration({ label = '+1' }) {
  return (
    <div className="round-celebration" aria-hidden="true">
      <span className="round-celebration-star"><Star size={18} /></span>
      <span>{label}</span>
    </div>
  );
}

function playSoftCelebrationSound(soundOff) {
  if (soundOff) return;
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;
  const context = new AudioContext();
  const output = context.createGain();
  output.gain.setValueAtTime(0.16, context.currentTime);
  output.connect(context.destination);
  [523.25, 659.25].forEach((frequency, index) => {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const startAt = context.currentTime + index * 0.08;
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, startAt);
    gain.gain.setValueAtTime(0.0001, startAt);
    gain.gain.exponentialRampToValueAtTime(0.09, startAt + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, startAt + 0.18);
    oscillator.connect(gain).connect(output);
    oscillator.start(startAt);
    oscillator.stop(startAt + 0.22);
  });
  window.setTimeout(() => {
    output.disconnect();
    context.close?.();
  }, 420);
}

function asProfileList(value) {
  if (Array.isArray(value)) return value;
  if (!value) return [];
  return [value];
}

function getProfileText(profile, field) {
  return String(profile?.[field] || '');
}

function usesVisualCommunication(profile) {
  const communication = asProfileList(profile?.communication).join(' ');
  return communication.includes('AAC')
    || communication.includes('picture')
    || communication.includes('visual')
    || communication.includes('facial expression')
    || communication.includes('gesture');
}

function needsLowFrustrationMode(profile) {
  const communication = asProfileList(profile?.communication).join(' ');
  return profile?.supportLevel?.startsWith('Level 3')
    || communication.includes('Very limited')
    || communication.includes('AAC')
    || communication.includes('picture');
}

function getChoiceLimit(profile, activityTitle) {
  if (activityTitle === 'Sort by Size') return null;
  if (profile?.supportLevel?.startsWith('Level 3')) return 2;
  if (needsLowFrustrationMode(profile)) return 2;
  if (profile?.supportLevel?.startsWith('Level 2')) return 3;
  if (activityTitle === 'Letter Match' && getProfileText(profile, 'letters') === 'Does not recognize letters') return 2;
  if (activityTitle === 'Number Garden' && getProfileText(profile, 'numbers') === 'Does not recognize numbers') return 2;
  return null;
}

function limitRoundChoices(round, limit) {
  if (!limit || !round?.choices || round.choices.length <= limit) return round;
  const correctChoice = round.choices.find((choice) => choice.value === round.target.value) || round.choices[0];
  const distractors = round.choices.filter((choice) => choice !== correctChoice).slice(0, Math.max(0, limit - 1));
  return {
    ...round,
    choices: shuffleCards([correctChoice, ...distractors])
  };
}

function getAdaptiveExtraRounds(activityTitle, profile) {
  if (activityTitle === 'Number Garden' && getProfileText(profile, 'numbers') === 'Recognizes numbers beyond 10') {
    return [
      {
        prompt: 'How many hearts are in the garden?',
        target: { label: '8', value: '8', count: 8, item: 'Heart' },
        choices: [
          { label: '6', value: '6' },
          { label: '8', value: '8' },
          { label: '9', value: '9' },
          { label: '10', value: '10' }
        ]
      },
      {
        prompt: 'How many suns are in the garden?',
        target: { label: '10', value: '10', count: 10, item: 'Sun' },
        choices: [
          { label: '7', value: '7' },
          { label: '9', value: '9' },
          { label: '10', value: '10' },
          { label: '11', value: '11' }
        ]
      }
    ];
  }

  if (activityTitle === 'Letter Match' && ['Can read simple words', 'Can read fluently'].includes(getProfileText(profile, 'letters'))) {
    return [
      {
        prompt: 'Find the same letter.',
        target: { label: 'T', value: 'T' },
        choices: [
          { label: 'F', value: 'F' },
          { label: 'T', value: 'T' },
          { label: 'L', value: 'L' },
          { label: 'I', value: 'I' }
        ]
      },
      {
        prompt: 'Find the same letter.',
        target: { label: 'R', value: 'R' },
        choices: [
          { label: 'P', value: 'P' },
          { label: 'B', value: 'B' },
          { label: 'R', value: 'R' },
          { label: 'D', value: 'D' }
        ]
      }
    ];
  }

  return [];
}

function getProfileAdaptedRounds(activityTitle, activityIcon, profile) {
  const baseRounds = getGameRounds(activityTitle, activityIcon);
  const rounds = [...baseRounds, ...getAdaptiveExtraRounds(activityTitle, profile)];
  const choiceLimit = getChoiceLimit(profile, activityTitle);
  return rounds.map((round) => limitRoundChoices(round, choiceLimit));
}

function getInitialMemoryPairCount(profile) {
  if (needsLowFrustrationMode(profile)) return 2;
  if (getProfileText(profile, 'numbers') === 'Recognizes numbers beyond 10') return 4;
  if (getProfileText(profile, 'numbers') === 'Recognizes numbers 1-10') return 3;
  return 2;
}

export function GameCompleteActions({ onRepeat, onGames, onNext, backLabel = 'Back to Games', nextLabel = 'Next story' }) {
  const t = useT();
  return (
    <div className="game-complete-card" aria-live="polite">
      <div className="celebration-star game-complete-star"><Star /></div>
      <strong>{t('Good job!')}</strong>
      <div className="form-actions">
        <button className="secondary-button" type="button" onClick={onRepeat}>
          <RotateCcw size={18} /> {t('Repeat')}
        </button>
        <button className={onNext ? 'secondary-button' : 'primary-button'} type="button" onClick={onGames}>
          <Puzzle size={18} /> {t(backLabel)}
        </button>
        {onNext && (
          <button className="primary-button" type="button" onClick={onNext}>
            {t(nextLabel)} <ChevronRight size={18} />
          </button>
        )}
      </div>
    </div>
  );
}

function getGameRounds(activityTitle, activityIcon) {
  const game = activityGames[activityTitle];
  if (game?.rounds) return game.rounds;
  if (game) return [game];
  return [
    {
      prompt: 'Choose the best match.',
      target: { label: activityIcon, value: activityTitle },
      choices: [
        { label: activityTitle, value: activityTitle },
        { label: 'Try later', value: 'later' },
        { label: 'Wait', value: 'wait' },
        { label: 'Help', value: 'help' }
      ]
    }
  ];
}


export function MatchGame({ activity, profile, soundOff, onBack, onComplete }) {
  const t = useT();
  const language = useContext(LanguageContext);
  const soundGameAudioRef = useRef({ context: null, nodes: [] });
  const soundHighlightTimerRef = useRef(null);
  const shapeDraggingRef = useRef(false);
  const isSoundMatch = activity.title === 'Sound Match';
  const isEmotionMatch = activity.title === 'Emotion Match';
  const isShapeSort = activity.title === 'Shape Sort';
  const isMatchPairs = activity.title === 'Match Pairs';
  const isSizeSort = activity.title === 'Sort by Size';
  const isPictureWords = activity.title === 'Picture Words';
  const rounds = useMemo(
    () => getProfileAdaptedRounds(activity.title, activity.icon, profile),
    [activity.title, activity.icon, profile]
  );
  const [roundIndex, setRoundIndex] = useState(0);
  const game = rounds[roundIndex] || rounds[0];
  const [choiceOrder, setChoiceOrder] = useState(() => shuffleCards(game.choices));
  const [selected, setSelected] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [helpRequested, setHelpRequested] = useState(false);
  const [soundHighlighted, setSoundHighlighted] = useState(false);
  const [shapeDragging, setShapeDragging] = useState(false);
  const [dragOverChoice, setDragOverChoice] = useState(null);
  const [shapeSortPieces, setShapeSortPieces] = useState(() => createShapeSortPieces(game.choices));
  const [shapePlacements, setShapePlacements] = useState({});
  const [activeShapePieceId, setActiveShapePieceId] = useState(null);
  const [sizeSlots, setSizeSlots] = useState([null, null, null]);
  const [activeSizePieceId, setActiveSizePieceId] = useState(null);
  const [sizeSortChecked, setSizeSortChecked] = useState(false);
  const [sizeSortAttempts, setSizeSortAttempts] = useState(0);
  const [dragOverSizeSlot, setDragOverSizeSlot] = useState(null);
  const sizeSortFilled = sizeSlots.every(Boolean);
  const sizeSortIsCorrect = isSizeSort
    && sizeSortChecked
    && sizeSlots.every((piece, index) => piece?.value === game.target.order[index]);
  const shapeSortIsCorrect = isShapeSort
    && shapeSortPieces.length > 0
    && shapeSortPieces.every((piece) => shapePlacements[piece.id] === piece.value);
  const isCorrect = isShapeSort ? shapeSortIsCorrect : isSizeSort ? sizeSortIsCorrect : selected?.value === game.target.value;
  const isLastRound = roundIndex >= rounds.length - 1;
  const successDetail = isMatchPairs ? (game.explanation || 'These two go together.') : 'You found the right answer.';
  const retryDetail = isMatchPairs
    ? 'Look at the big card and pick what goes with it.'
    : isPictureWords
      ? 'Look at the picture and pick its word.'
    : 'Look at the big card and pick the same one.';
  const visualCommunicationMode = usesVisualCommunication(profile);
  const showAnswerHint = helpRequested;
  const reduceChoices = helpRequested && wrongAttempts >= 3 && !isCorrect && !isShapeSort && !isSizeSort;
  const successTitle = getPositiveMessage(activity.title, roundIndex, wrongAttempts > 0 || sizeSortAttempts > 1);

  useEffect(() => () => {
    stopSoundGameAudio();
    window.clearTimeout(soundHighlightTimerRef.current);
  }, []);

  useEffect(() => {
    setSelected(null);
    setWrongAttempts(0);
    setHelpRequested(false);
    setSoundHighlighted(false);
    shapeDraggingRef.current = false;
    setShapeDragging(false);
    setDragOverChoice(null);
    setShapeSortPieces(createShapeSortPieces(game.choices));
    setShapePlacements({});
    setActiveShapePieceId(null);
    setSizeSlots([null, null, null]);
    setActiveSizePieceId(null);
    setSizeSortChecked(false);
    setSizeSortAttempts(0);
    setDragOverSizeSlot(null);
    window.clearTimeout(soundHighlightTimerRef.current);
    setChoiceOrder(shuffleCards(game.choices));
  }, [game]);

  function speakText(text) {
    speak(text, language, soundOff, { rate: 0.9, pitch: 1.05 });
  }

  function ensureSoundGameContext() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return null;
    if (!soundGameAudioRef.current.context || soundGameAudioRef.current.context.state === 'closed') {
      soundGameAudioRef.current.context = new AudioContext();
    }
    if (soundGameAudioRef.current.context.state === 'suspended') {
      soundGameAudioRef.current.context.resume();
    }
    return soundGameAudioRef.current.context;
  }

  function trackSoundGameNode(node) {
    soundGameAudioRef.current.nodes.push(node);
    return node;
  }

  function stopSoundGameAudio() {
    soundGameAudioRef.current.nodes.forEach((node) => {
      try {
        node.stop?.();
      } catch {
        // Sound clue nodes may already be stopped.
      }
      node.disconnect?.();
    });
    soundGameAudioRef.current = { ...soundGameAudioRef.current, nodes: [] };
  }

  function showSoundHighlight() {
    setSoundHighlighted(true);
    window.clearTimeout(soundHighlightTimerRef.current);
    soundHighlightTimerRef.current = window.setTimeout(() => setSoundHighlighted(false), 700);
  }

  function createSoundGameNoise(context) {
    const buffer = context.createBuffer(1, context.sampleRate * 1.2, context.sampleRate);
    const data = buffer.getChannelData(0);
    for (let index = 0; index < data.length; index += 1) {
      data[index] = Math.random() * 2 - 1;
    }
    const source = trackSoundGameNode(context.createBufferSource());
    source.buffer = buffer;
    return source;
  }

  function playSoundGameTone(context, output, frequency, startAt, duration = 0.2) {
    const oscillator = trackSoundGameNode(context.createOscillator());
    const gain = context.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, startAt);
    gain.gain.setValueAtTime(0.0001, startAt);
    gain.gain.exponentialRampToValueAtTime(0.12, startAt + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);
    oscillator.connect(gain).connect(output);
    oscillator.start(startAt);
    oscillator.stop(startAt + duration + 0.04);
  }

  function playAnswerFeedbackSound(result) {
    if (soundOff) return;
    stopSoundGameAudio();
    const context = ensureSoundGameContext();
    if (!context) return;

    const output = context.createGain();
    output.gain.setValueAtTime(result === 'correct' ? 0.28 : 0.22, context.currentTime);
    output.connect(context.destination);

    if (result === 'correct') {
      [523.25, 659.25, 783.99].forEach((frequency, index) => {
        playSoundGameTone(context, output, frequency, context.currentTime + index * 0.09, 0.13);
      });
    } else {
      [220, 164.81].forEach((frequency, index) => {
        playSoundGameTone(context, output, frequency, context.currentTime + index * 0.12, 0.18);
      });
    }

    trackSoundGameNode(output);
  }

  function playCatMeow(context, output, startAt) {
    const oscillator = trackSoundGameNode(context.createOscillator());
    const voiceGain = context.createGain();
    const nasalFormant = context.createBiquadFilter();
    const brightFormant = context.createBiquadFilter();

    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(760, startAt);
    oscillator.frequency.exponentialRampToValueAtTime(430, startAt + 0.18);
    oscillator.frequency.exponentialRampToValueAtTime(690, startAt + 0.48);
    oscillator.frequency.exponentialRampToValueAtTime(520, startAt + 0.72);

    nasalFormant.type = 'bandpass';
    nasalFormant.frequency.setValueAtTime(880, startAt);
    nasalFormant.frequency.linearRampToValueAtTime(1180, startAt + 0.44);
    nasalFormant.Q.value = 6;

    brightFormant.type = 'bandpass';
    brightFormant.frequency.setValueAtTime(1650, startAt);
    brightFormant.Q.value = 5;

    voiceGain.gain.setValueAtTime(0.0001, startAt);
    voiceGain.gain.exponentialRampToValueAtTime(0.2, startAt + 0.06);
    voiceGain.gain.exponentialRampToValueAtTime(0.12, startAt + 0.34);
    voiceGain.gain.exponentialRampToValueAtTime(0.0001, startAt + 0.76);

    oscillator.connect(nasalFormant).connect(voiceGain).connect(output);
    oscillator.connect(brightFormant).connect(voiceGain);
    oscillator.start(startAt);
    oscillator.stop(startAt + 0.82);
  }

  function playBedSleepSound(context, output, startAt) {
    const snore = trackSoundGameNode(context.createOscillator());
    const snoreGain = context.createGain();
    const snoreFilter = context.createBiquadFilter();
    snore.type = 'sawtooth';
    snore.frequency.setValueAtTime(96, startAt);
    snore.frequency.exponentialRampToValueAtTime(54, startAt + 0.36);
    snore.frequency.exponentialRampToValueAtTime(88, startAt + 0.82);
    snoreFilter.type = 'lowpass';
    snoreFilter.frequency.setValueAtTime(360, startAt);
    snoreFilter.Q.value = 1.4;
    snoreGain.gain.setValueAtTime(0.0001, startAt);
    snoreGain.gain.exponentialRampToValueAtTime(0.18, startAt + 0.12);
    snoreGain.gain.exponentialRampToValueAtTime(0.08, startAt + 0.48);
    snoreGain.gain.exponentialRampToValueAtTime(0.0001, startAt + 0.9);
    snore.connect(snoreFilter).connect(snoreGain).connect(output);
    snore.start(startAt);
    snore.stop(startAt + 0.96);

    const breath = createSoundGameNoise(context);
    const breathFilter = context.createBiquadFilter();
    const breathGain = context.createGain();
    breathFilter.type = 'lowpass';
    breathFilter.frequency.setValueAtTime(520, startAt);
    breathGain.gain.setValueAtTime(0.0001, startAt);
    breathGain.gain.linearRampToValueAtTime(0.12, startAt + 0.16);
    breathGain.gain.linearRampToValueAtTime(0.0001, startAt + 0.8);
    breath.connect(breathFilter).connect(breathGain).connect(output);
    breath.start(startAt);
    breath.stop(startAt + 0.88);
  }

  function playSoundClue(label = game.target.label) {
    if (soundOff) return;
    showSoundHighlight();
    stopSoundGameAudio();
    const context = ensureSoundGameContext();
    if (!context) return;
    const output = context.createGain();
    output.gain.setValueAtTime(0.32, context.currentTime);
    output.connect(context.destination);

    if (label === 'Rain') {
      const rain = createSoundGameNoise(context);
      const filter = context.createBiquadFilter();
      const gain = context.createGain();
      filter.type = 'bandpass';
      filter.frequency.value = 1450;
      filter.Q.value = 0.7;
      gain.gain.setValueAtTime(0.0001, context.currentTime);
      gain.gain.linearRampToValueAtTime(0.28, context.currentTime + 0.18);
      gain.gain.linearRampToValueAtTime(0.0001, context.currentTime + 1.35);
      rain.connect(filter).connect(gain).connect(output);
      rain.start();
      rain.stop(context.currentTime + 1.45);
    } else if (label === 'Cat') {
      playCatMeow(context, output, context.currentTime + 0.04);
      playCatMeow(context, output, context.currentTime + 0.78);
    } else if (label === 'Toy') {
      [784, 1046.5, 1318.5].forEach((frequency, index) => {
        playSoundGameTone(context, output, frequency, context.currentTime + index * 0.14, 0.16);
      });
    } else if (label === 'Bed') {
      playBedSleepSound(context, output, context.currentTime + 0.02);
      playBedSleepSound(context, output, context.currentTime + 1.02);
    }

    trackSoundGameNode(output);
  }

  useEffect(() => {
    if (!isSoundMatch || !selected || isCorrect) return;
    showSoundHighlight();
  }, [isSoundMatch, selected, isCorrect]);

  function startShapeDrag() {
    if (!isShapeSort || isCorrect) return;
    shapeDraggingRef.current = true;
    setShapeDragging(true);
  }

  function finishShapeDrag(clientX, clientY) {
    if (!shapeDraggingRef.current) return;
    const dropTarget = document.elementFromPoint(clientX, clientY)?.closest?.('[data-shape-choice]');
    const droppedChoice = choiceOrder.find((choice) => choice.value === dropTarget?.getAttribute('data-shape-choice'));
    shapeDraggingRef.current = false;
    setShapeDragging(false);
    setDragOverChoice(null);
    if (droppedChoice) chooseMatch(droppedChoice);
  }

  useEffect(() => {
    if (!isShapeSort) return undefined;

    function handlePointerUp(event) {
      finishShapeDrag(event.clientX, event.clientY);
    }

    function handleTouchEnd(event) {
      const touch = event.changedTouches?.[0];
      if (touch) finishShapeDrag(touch.clientX, touch.clientY);
    }

    document.addEventListener('pointerup', handlePointerUp, true);
    document.addEventListener('mouseup', handlePointerUp, true);
    document.addEventListener('touchend', handleTouchEnd, true);
    return () => {
      document.removeEventListener('pointerup', handlePointerUp, true);
      document.removeEventListener('mouseup', handlePointerUp, true);
      document.removeEventListener('touchend', handleTouchEnd, true);
    };
  }, [isShapeSort, choiceOrder, isCorrect]);

  useEffect(() => {
    if (!isCorrect || completed) return;
    playAnswerFeedbackSound('correct');
    setScore((value) => value + 1);
    if (isLastRound) {
      setCompleted(true);
      if (activity.category === 'play') {
        onComplete();
        return;
      }
      const timerId = window.setTimeout(onComplete, 700);
      return () => window.clearTimeout(timerId);
    }
    return undefined;
  }, [isCorrect]);

  useEffect(() => {
    const answeredIncorrectly = isSizeSort
      ? sizeSortChecked && !isCorrect
      : selected && !isCorrect;
    if (!answeredIncorrectly) return;
    playAnswerFeedbackSound('incorrect');
  }, [selected, sizeSortChecked, isCorrect]);

  function goToNextRound() {
    stopSoundGameAudio();
    window.clearTimeout(soundHighlightTimerRef.current);
    shapeDraggingRef.current = false;
    setRoundIndex((index) => Math.min(index + 1, rounds.length - 1));
  }

  function resetGame() {
    stopSoundGameAudio();
    window.clearTimeout(soundHighlightTimerRef.current);
    setRoundIndex(0);
    setSelected(null);
    setCompleted(false);
    setScore(0);
    setWrongAttempts(0);
    setHelpRequested(false);
    setSoundHighlighted(false);
    shapeDraggingRef.current = false;
    setShapeDragging(false);
    setDragOverChoice(null);
    setShapeSortPieces(createShapeSortPieces(rounds[0].choices));
    setShapePlacements({});
    setActiveShapePieceId(null);
    setSizeSlots([null, null, null]);
    setActiveSizePieceId(null);
    setSizeSortChecked(false);
    setSizeSortAttempts(0);
    setDragOverSizeSlot(null);
    setChoiceOrder(shuffleCards(rounds[0].choices));
  }

  function chooseMatch(choice) {
    setSelected(choice);
    if (choice.value !== game.target.value) {
      setWrongAttempts((attempts) => attempts + 1);
    }
    speakText(t(choice.label));
  }

  function findShapePiece(pieceId) {
    return shapeSortPieces.find((piece) => piece.id === pieceId) || null;
  }

  function placeShapePiece(piece, binValue) {
    if (!piece || isCorrect) return;
    setShapePlacements((placements) => ({
      ...placements,
      [piece.id]: binValue
    }));
    setActiveShapePieceId(null);
    setDragOverChoice(null);
    setShapeDragging(false);
    if (piece.value !== binValue) {
      setWrongAttempts((attempts) => attempts + 1);
    }
    speakText(t(piece.label));
  }

  function chooseShapePiece(piece) {
    if (isCorrect) return;
    setActiveShapePieceId((pieceId) => pieceId === piece.id ? null : piece.id);
  }

  function chooseShapeBin(binValue) {
    if (isCorrect) return;
    const activePiece = findShapePiece(activeShapePieceId);
    if (activePiece) {
      placeShapePiece(activePiece, binValue);
    }
  }

  function findSizePiece(pieceId) {
    return choiceOrder.find((piece) => piece.id === pieceId) || sizeSlots.find((piece) => piece?.id === pieceId) || null;
  }

  function placeSizePiece(piece, slotIndex) {
    if (!piece || isCorrect) return;
    setSizeSlots((slots) => {
      const previousSlotIndex = slots.findIndex((slot) => slot?.id === piece.id);
      const displacedPiece = slots[slotIndex];
      const nextSlots = slots.map((slot) => slot?.id === piece.id ? null : slot);
      nextSlots[slotIndex] = piece;
      if (displacedPiece && previousSlotIndex >= 0 && previousSlotIndex !== slotIndex) {
        nextSlots[previousSlotIndex] = displacedPiece;
      }
      return nextSlots;
    });
    setActiveSizePieceId(null);
    setSizeSortChecked(false);
    setDragOverSizeSlot(null);
  }

  function chooseSizePiece(piece) {
    if (isCorrect) return;
    if (activeSizePieceId === piece.id) {
      const emptySlotIndex = sizeSlots.findIndex((slot) => !slot);
      if (emptySlotIndex >= 0) {
        placeSizePiece(piece, emptySlotIndex);
        return;
      }
    }
    setActiveSizePieceId(piece.id);
    setSizeSortChecked(false);
  }

  function chooseSizeSlot(slotIndex) {
    if (isCorrect) return;
    const activePiece = findSizePiece(activeSizePieceId);
    if (activePiece) {
      placeSizePiece(activePiece, slotIndex);
      return;
    }
    if (sizeSlots[slotIndex]) {
      setActiveSizePieceId(sizeSlots[slotIndex].id);
      setSizeSortChecked(false);
    }
  }

  function checkSizeOrder() {
    if (!sizeSortFilled || isCorrect) return;
    setSizeSortChecked(true);
    setSizeSortAttempts((attempts) => attempts + 1);
  }

  function changeSizeOrder() {
    if (!isSizeSort || isCorrect) return;
    const firstWrongPiece = sizeSlots.find((piece, index) => piece && piece.value !== game.target.order[index]);
    setSizeSortChecked(false);
    setActiveSizePieceId(firstWrongPiece?.id || null);
  }

  function askForHelp() {
    if (isCorrect) return;
    setHelpRequested(true);
    speakText(t(getHelpMessage()));
  }

  function getHelpMessage() {
    if (isSoundMatch) return 'I can help. Listen again and try the highlighted answer.';
    if (isEmotionMatch) return 'I can help. Look at the highlighted feeling.';
    if (isMatchPairs) return game.hint || 'I can help. Try the highlighted card.';
    if (isPictureWords) return 'I can help. Look at the first letter and picture.';
    if (isSizeSort) return 'I can help. Small goes first, then medium, then big.';
    if (isShapeSort) return 'I can help. Pick a shape, then try the highlighted group.';
    return 'I can help. Try the highlighted answer.';
  }

  function getFeedbackTitle() {
    if (isCorrect) return successTitle;
    if (shouldShowSupportHint && wrongAttempts === 0 && !sizeSortChecked) return 'I can help.';
    if (isSizeSort) return 'Almost! Try again.';
    if (isMatchPairs || isSoundMatch || isEmotionMatch || isShapeSort) return 'Try again.';
    return 'Try one more time.';
  }

  function getProgressiveHint() {
    const attempts = isSizeSort ? sizeSortAttempts : wrongAttempts;
    if (isCorrect) {
      if (isSizeSort) return 'Small → Medium → Big';
      if (isEmotionMatch) return `${t('That face is')} ${t(game.target.label).toLowerCase()}.`;
      if (isShapeSort) return 'All shapes are in the right groups.';
      return successDetail;
    }
    if (attempts >= 3 && showAnswerHint) {
      if (isSoundMatch) return 'Only two choices now. Listen and pick the matching sound.';
      if (isEmotionMatch) return 'Only two choices now. Look at the mouth and eyes.';
      if (isMatchPairs) return game.hint || 'Only two choices now. Pick what goes with it.';
      if (isPictureWords) return 'Only two choices now. Pick the word for the picture.';
      if (isSizeSort) return 'Use the highlighted spots to fix the order.';
      if (isShapeSort) return getShapeHint(getFirstMisplacedShape()?.label || game.target.label);
      return 'Only two choices now. Pick the matching answer.';
    }
    if (attempts >= 2 && showAnswerHint) {
      if (isSoundMatch) return 'The matching sound is highlighted.';
      if (isEmotionMatch) return 'The matching feeling is highlighted.';
      if (isMatchPairs) return game.hint || 'The matching card is highlighted.';
      if (isPictureWords) return 'The matching word is highlighted.';
      if (isSizeSort) return getSizeSortHint();
      if (isShapeSort) return 'The matching group is highlighted.';
      return 'The matching answer is highlighted.';
    }
    if (isSizeSort) return getSizeSortHint();
    if (isEmotionMatch) return 'Look at the face one more time.';
    if (isShapeSort) return 'Look at the shape.';
    if (isSoundMatch) return 'Listen one more time and choose again.';
    return retryDetail;
  }

  function getShapeHint(shape) {
    if (shape === 'Circle') return 'Round. No corners.';
    if (shape === 'Square') return '4 equal sides.';
    if (shape === 'Triangle') return '3 sides.';
    if (shape === 'Star') return 'Look at the points.';
    return 'Look at its sides.';
  }

  function getSizeSortHint() {
    if (sizeSortAttempts <= 1) return 'Find the smallest one first.';
    if (sizeSortAttempts === 2) return 'Which one is the smallest?';
    return 'Now find the biggest one.';
  }

  function getFirstMisplacedShape() {
    return shapeSortPieces.find((piece) => {
      const placement = shapePlacements[piece.id];
      return placement && placement !== piece.value;
    }) || null;
  }

  function getHintedShapeBinValue() {
    const activePiece = findShapePiece(activeShapePieceId);
    return activePiece?.value || getFirstMisplacedShape()?.value || null;
  }

  const sizeSortPlacedIds = new Set(sizeSlots.filter(Boolean).map((piece) => piece.id));
  const sizeSortSourcePieces = choiceOrder.filter((piece) => !sizeSortPlacedIds.has(piece.id));
  const shapeSortSourcePieces = shapeSortPieces.filter((piece) => !shapePlacements[piece.id]);
  const hintedShapeBinValue = showAnswerHint ? getHintedShapeBinValue() : null;
  const shouldShowSupportHint = !isCorrect && helpRequested;
  const visibleChoiceOrder = reduceChoices
    ? choiceOrder.filter((choice) => choice.value === game.target.value || choice.value === selected?.value)
    : choiceOrder;
  const shapeSortBins = choiceOrder.map((choice) => ({
    ...choice,
    pieces: shapeSortPieces.filter((piece) => shapePlacements[piece.id] === choice.value)
  }));

  return (
    <section className="game-page">
      <div className="page-title">
        <button className="icon-button" onClick={onBack} aria-label={t('Go back')}><ArrowLeft /></button>
        <span className="round-icon"><Puzzle /></span>
        <div>
          <p className="eyebrow">{t('Activity')}</p>
          <h1>{t(getActivityDisplayTitle(activity))}</h1>
        </div>
      </div>
      <div className="game-panel">
        <div className="game-progress" aria-live="polite">
          <span>{t('Round')} {roundIndex + 1} {t('of')} {rounds.length}</span>
          <span>{t('Score')}: {score}</span>
        </div>
          <div className={isSoundMatch ? 'game-prompt sound-game-prompt' : isEmotionMatch ? 'game-prompt emotion-game-prompt' : isShapeSort ? 'game-prompt shape-sort-prompt' : isMatchPairs ? 'game-prompt pair-game-prompt' : isSizeSort ? 'game-prompt size-sort-prompt' : isPictureWords ? 'game-prompt picture-word-prompt' : 'game-prompt'}>
          <p className="eyebrow">{t('Your turn')}</p>
          <h2>{t(isSoundMatch ? 'Listen, then pick what made the sound.' : isEmotionMatch ? 'What feeling is this?' : isShapeSort ? 'Drag each shape to its group.' : isMatchPairs ? 'What goes with this?' : isSizeSort ? 'Put them in order.' : game.prompt)}</h2>
          {visualCommunicationMode && helpRequested && (
            <div className="game-visual-cue" aria-label={t('Visual help')}>
              <span><Info size={18} aria-hidden="true" /> {t('Look')}</span>
              <span><Check size={18} aria-hidden="true" /> {t('Choose')}</span>
              <span><HeartHandshake size={18} aria-hidden="true" /> {t('Help me')}</span>
            </div>
          )}
          {isShapeSort && <p>{t('Put every shape with the same shape.')}</p>}
          {isMatchPairs && <p>{t('Find its match.')}</p>}
          {isSizeSort && (
            <div className="size-order-cue" aria-label={t('Small → Medium → Big')}>
              <SizeSortIcon size="small" />
              <span aria-hidden="true">→</span>
              <SizeSortIcon size="medium" />
              <span aria-hidden="true">→</span>
              <SizeSortIcon size="big" />
              <strong>{t('Small → Medium → Big')}</strong>
            </div>
          )}
          <button className="secondary-button game-help-button" type="button" onClick={askForHelp} disabled={isCorrect}>
            <Info size={18} /> {t('Help me')}
          </button>
        </div>
        {isShapeSort ? (
          <div className="shape-sort-workspace">
            <div className="shape-sort-pieces-area">
              <p className="eyebrow">{t('Shapes to sort')}</p>
              <div className="shape-sort-pieces" aria-label={t('Shapes to sort')}>
                {shapeSortSourcePieces.map((piece) => (
                  <button
                    key={piece.id}
                    type="button"
                    className={activeShapePieceId === piece.id ? 'shape-sort-piece selected' : 'shape-sort-piece'}
                    draggable={!isCorrect}
                    disabled={isCorrect}
                    aria-label={`${t(piece.label)}${activeShapePieceId === piece.id ? `. ${t('Selected')}` : ''}`}
                    onClick={() => chooseShapePiece(piece)}
                    onDragStart={(event) => {
                      event.dataTransfer.effectAllowed = 'move';
                      event.dataTransfer.setData('text/plain', piece.id);
                      setActiveShapePieceId(piece.id);
                      setShapeDragging(true);
                    }}
                    onDragEnd={() => {
                      setShapeDragging(false);
                      setDragOverChoice(null);
                    }}
                  >
                    <ShapeIcon shape={piece.label} colorVariant={piece.colorVariant} />
                    {activeShapePieceId === piece.id && <Check className="shape-sort-selected-icon" size={18} aria-hidden="true" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="shape-sort-bins-area">
              <p className="eyebrow">{t('Matching groups')}</p>
              <div className="shape-sort-bin-grid" aria-label={t('Matching groups')}>
                {shapeSortBins.map((bin) => (
                  <button
                    key={bin.value}
                    type="button"
                    className={[
                      'shape-sort-bin',
                      'shape-sort-drop-bin',
                      activeShapePieceId ? 'ready' : '',
                      dragOverChoice === bin.value ? 'drag-over' : '',
                      hintedShapeBinValue === bin.value ? 'hinted' : '',
                      isCorrect ? 'correct' : ''
                    ].filter(Boolean).join(' ')}
                    disabled={isCorrect}
                    data-shape-choice={bin.value}
                    aria-label={t(bin.label)}
                    onClick={() => chooseShapeBin(bin.value)}
                    onDragOver={(event) => {
                      if (isCorrect) return;
                      event.preventDefault();
                      event.dataTransfer.dropEffect = 'move';
                      setDragOverChoice(bin.value);
                    }}
                    onDragEnter={() => {
                      if (!isCorrect) setDragOverChoice(bin.value);
                    }}
                    onDragLeave={() => setDragOverChoice((value) => value === bin.value ? null : value)}
                    onDrop={(event) => {
                      if (isCorrect) return;
                      event.preventDefault();
                      const pieceId = event.dataTransfer.getData('text/plain') || activeShapePieceId;
                      placeShapePiece(findShapePiece(pieceId), bin.value);
                    }}
                  >
                    <ShapeIcon shape={bin.label} />
                    <span>{t(bin.label)}</span>
                    <span className="shape-sort-bin-count">{bin.pieces.length}</span>
                    <span className="shape-sort-bin-pieces" aria-hidden="true">
                      {bin.pieces.map((piece) => (
                        <span
                          key={piece.id}
                          className={piece.value === bin.value ? 'shape-sort-mini-piece correct' : 'shape-sort-mini-piece needs-retry'}
                          onClick={(event) => {
                            event.stopPropagation();
                            chooseShapePiece(piece);
                          }}
                        >
                          <ShapeIcon shape={piece.label} colorVariant={piece.colorVariant} />
                        </span>
                      ))}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : isSizeSort ? (
          <div className="size-sort-workspace">
            <div className="size-sort-pieces-area">
              <p className="eyebrow">{t('Pieces to sort')}</p>
              <div className="size-sort-pieces" aria-label={t('Pieces to sort')}>
                {sizeSortSourcePieces.map((piece) => (
                  <button
                    key={piece.id}
                    type="button"
                    className={activeSizePieceId === piece.id ? 'size-sort-piece selected' : 'size-sort-piece'}
                    draggable={!isCorrect}
                    disabled={isCorrect}
                    aria-label={`${t(game.target.object)} ${t(piece.label)}${activeSizePieceId === piece.id ? `. ${t('Selected')}` : ''}`}
                    onClick={() => chooseSizePiece(piece)}
                    onDragStart={(event) => {
                      event.dataTransfer.effectAllowed = 'move';
                      event.dataTransfer.setData('text/plain', piece.id);
                      setActiveSizePieceId(piece.id);
                    }}
                  >
                    <SizeSortObjectVisual piece={piece} />
                    {activeSizePieceId === piece.id && <Check className="size-sort-selected-icon" size={18} aria-hidden="true" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="size-sort-tray-area">
              <p className="eyebrow">{t('Put them in order.')}</p>
              <div className="size-sort-slots" aria-label={t('Small → Medium → Big')}>
                {game.target.order.map((size, index) => {
                  const piece = sizeSlots[index];
                  const slotLabel = index === 0 ? 'Spot 1' : index === 1 ? 'Spot 2' : 'Spot 3';
                  const shouldHint = !isCorrect
                    && showAnswerHint
                    && (piece ? piece.value !== size : index === 0);
                  return (
                    <button
                      key={size}
                      type="button"
                      className={[
                        'size-sort-slot',
                        piece ? 'filled' : '',
                        activeSizePieceId === piece?.id ? 'selected' : '',
                        dragOverSizeSlot === index ? 'drag-over' : '',
                        shouldHint ? 'hinted' : '',
                        isCorrect ? 'correct' : ''
                      ].filter(Boolean).join(' ')}
                      disabled={isCorrect}
                      draggable={Boolean(piece) && !isCorrect}
                      aria-label={`${t(slotLabel)}: ${piece ? `${t(game.target.object)} ${t(piece.label)}` : t('Empty spot')}`}
                      onClick={() => chooseSizeSlot(index)}
                      onDragStart={(event) => {
                        if (!piece || isCorrect) return;
                        event.dataTransfer.effectAllowed = 'move';
                        event.dataTransfer.setData('text/plain', piece.id);
                        setActiveSizePieceId(piece.id);
                      }}
                      onDragOver={(event) => {
                        if (isCorrect) return;
                        event.preventDefault();
                        event.dataTransfer.dropEffect = 'move';
                        setDragOverSizeSlot(index);
                      }}
                      onDragEnter={() => {
                        if (!isCorrect) setDragOverSizeSlot(index);
                      }}
                      onDragLeave={() => setDragOverSizeSlot((value) => value === index ? null : value)}
                      onDrop={(event) => {
                        if (isCorrect) return;
                        event.preventDefault();
                        const pieceId = event.dataTransfer.getData('text/plain') || activeSizePieceId;
                        placeSizePiece(findSizePiece(pieceId), index);
                      }}
                    >
                      <span className="size-sort-slot-label">{t(size === 'small' ? 'Small' : size === 'medium' ? 'Medium' : 'Big')}</span>
                      <span className="size-sort-slot-box">
                        {piece ? (
                          <>
                            <SizeSortObjectVisual piece={piece} />
                            {isCorrect && <Check className="size-sort-slot-check" size={18} aria-hidden="true" />}
                          </>
                        ) : (
                          <span className="size-sort-slot-number" aria-hidden="true">{index + 1}</span>
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <button className="primary-button size-sort-check-button" type="button" onClick={checkSizeOrder} disabled={!sizeSortFilled || isCorrect}>
              <Check size={18} /> {t('Check my order')}
            </button>
            {sizeSortChecked && !isCorrect && (
              <button className="secondary-button size-sort-check-button" type="button" onClick={changeSizeOrder}>
                <RotateCcw size={18} /> {t('Change order')}
              </button>
            )}
          </div>
        ) : isSoundMatch ? (
          <button
            className={soundHighlighted ? 'sound-listen-card listening' : 'sound-listen-card'}
            type="button"
            onClick={() => playSoundClue()}
            disabled={soundOff}
            aria-label={t('Listen to sound')}
          >
            <span className="sound-wave sound-wave-left" aria-hidden="true" />
            <span className="sound-listen-button" aria-hidden="true">
              <Volume2 size={44} />
            </span>
            <span className="sound-wave sound-wave-right" aria-hidden="true" />
            <strong>{t('Tap to listen')}</strong>
          </button>
        ) : (
          <div
            className={[
              activity.title === 'Color Match'
                ? 'target-card color-target'
                : isEmotionMatch
                  ? 'target-card emotion-target-card'
                  : isShapeSort
                    ? 'target-card shape-sort-target-card'
                    : isMatchPairs
                      ? 'target-card pair-target-card'
                      : isPictureWords
                        ? 'target-card picture-word-target-card'
                      : 'target-card',
              isMatchPairs && isCorrect ? 'matched' : ''
            ].filter(Boolean).join(' ')}
            aria-label={activity.title === 'Color Match' ? `Color card: ${game.target.label}` : isEmotionMatch ? `${t('What feeling is this?')} ${t(game.target.label)}` : isShapeSort ? `${t('Shape to sort')}: ${t(game.target.label)}` : isMatchPairs ? `${t('What goes with this?')} ${t(game.target.label)}` : isPictureWords ? `${t('Choose the word for the picture.')} ${t(game.target.label)}` : undefined}
            style={activity.title === 'Color Match' ? { '--target-color': game.target.value } : undefined}
            draggable={isShapeSort && !isCorrect}
            onDragStart={(event) => {
              if (!isShapeSort) return;
              startShapeDrag();
              event.dataTransfer.effectAllowed = 'move';
              event.dataTransfer.setData('text/plain', game.target.value);
            }}
            onDragEnd={() => {
              shapeDraggingRef.current = false;
              setShapeDragging(false);
              setDragOverChoice(null);
            }}
            onPointerDown={(event) => {
              if (!isShapeSort || isCorrect) return;
              startShapeDrag();
              event.currentTarget.setPointerCapture?.(event.pointerId);
            }}
            onPointerUp={(event) => {
              if (!isShapeSort || isCorrect) return;
              finishShapeDrag(event.clientX, event.clientY);
            }}
            onMouseDown={startShapeDrag}
            onPointerCancel={() => {
              shapeDraggingRef.current = false;
              setShapeDragging(false);
              setDragOverChoice(null);
            }}
          >
            {isShapeSort && <span className="eyebrow">{t('This shape')}</span>}
            <GameTargetVisual activityTitle={activity.title} target={game.target} label={t(game.target.label)} />
            {isMatchPairs && <strong className="pair-object-label">{t(game.target.label)}</strong>}
          </div>
        )}
        {!isShapeSort && !isSizeSort && (
        <div className={isSoundMatch ? 'game-choices sound-choice-grid' : isEmotionMatch ? 'game-choices emotion-choice-grid' : isShapeSort ? 'game-choices shape-sort-bin-grid' : isMatchPairs ? 'game-choices pair-choice-grid' : isPictureWords ? 'game-choices picture-word-choice-grid' : 'game-choices'}>
          {visibleChoiceOrder.map((choice) => {
            const isSelectedChoice = selected?.label === choice.label;
            const isCorrectChoice = isSoundMatch && isCorrect && choice.value === game.target.value;
            const isEmotionCorrectChoice = isEmotionMatch && isCorrect && choice.value === game.target.value;
            const isShapeCorrectChoice = isShapeSort && isCorrect && choice.value === game.target.value;
            const isPairCorrectChoice = isMatchPairs && isCorrect && choice.value === game.target.value;
            const isPictureWordCorrectChoice = isPictureWords && isCorrect && choice.value === game.target.value;
            const isHintedChoice = showAnswerHint && !isCorrect && choice.value === game.target.value;
            const choiceClassName = [
              'game-choice',
              isSoundMatch ? 'sound-choice-card' : '',
              isEmotionMatch ? 'emotion-choice-card' : '',
              isShapeSort ? 'shape-sort-bin' : '',
              isMatchPairs ? 'pair-choice-card' : '',
              isPictureWords ? 'picture-word-choice-card' : '',
              isSelectedChoice ? 'selected' : '',
              isHintedChoice ? 'hinted' : '',
              (isCorrectChoice || isEmotionCorrectChoice || isShapeCorrectChoice || isPairCorrectChoice || isPictureWordCorrectChoice) ? 'correct' : '',
              (isSoundMatch || isEmotionMatch || isShapeSort || isMatchPairs) && isSelectedChoice && !isCorrect ? 'needs-retry' : '',
              isShapeSort && shapeDragging ? 'drag-ready' : '',
              isShapeSort && dragOverChoice === choice.value ? 'drag-over' : ''
            ].filter(Boolean).join(' ');

            return (
              <button
                key={choice.label}
                type="button"
                className={choiceClassName}
                disabled={isCorrect}
                data-shape-choice={isShapeSort ? choice.value : undefined}
                aria-label={isShapeSort ? t(choice.label) : undefined}
                onDragOver={(event) => {
                  if (!isShapeSort || isCorrect) return;
                  event.preventDefault();
                  event.dataTransfer.dropEffect = 'move';
                  setDragOverChoice(choice.value);
                }}
                onDragEnter={() => {
                  if (isShapeSort && !isCorrect) setDragOverChoice(choice.value);
                }}
                onDragLeave={() => {
                  if (isShapeSort) setDragOverChoice((value) => value === choice.value ? null : value);
                }}
                onDrop={(event) => {
                  if (!isShapeSort || isCorrect) return;
                  event.preventDefault();
                  setShapeDragging(false);
                  setDragOverChoice(null);
                  chooseMatch(choice);
                }}
                onClick={() => {
                  chooseMatch(choice);
                }}
              >
                {!isEmotionMatch && activity.title !== 'Color Match' && <GameChoiceVisual activityTitle={activity.title} choice={choice} label={t(choice.label)} />}
                {activity.title !== 'Letter Match' && !isPictureWords && <span>{t(choice.label)}</span>}
                {isHintedChoice && <Info className="choice-state-icon hint-icon" size={22} aria-label={t('Try this one')} />}
                {(isCorrectChoice || isEmotionCorrectChoice || isShapeCorrectChoice || isPairCorrectChoice || isPictureWordCorrectChoice) && <Check className="choice-state-icon" size={22} aria-label={t('Great job!')} />}
                {(isEmotionMatch || isShapeSort || isMatchPairs) && isSelectedChoice && !isCorrect && <span className="choice-state-icon selection-dot" aria-hidden="true" />}
              </button>
            );
          })}
        </div>
        )}
        {(selected || sizeSortChecked || wrongAttempts > 0 || shouldShowSupportHint || (isShapeSort && isCorrect)) && (
          <div className={isCorrect ? 'game-feedback success' : 'game-feedback'} role="status" aria-live="polite">
            {isMatchPairs && isCorrect && (
              <div className="pair-success-link" aria-hidden="true">
                <span>
                  <PairObjectVisual item={game.target} className="pair-success-icon" />
                  <small>{t(game.target.label)}</small>
                </span>
                <span className="pair-connector" />
                <span>
                  <PairObjectVisual item={selected} className="pair-success-icon" />
                  <small>{t(selected.label)}</small>
                </span>
              </div>
            )}
            {(isSoundMatch || isEmotionMatch || isShapeSort || isMatchPairs || isSizeSort) && (
              <span className="feedback-icon" aria-hidden="true">
                {isCorrect ? <Check size={20} /> : isSoundMatch ? <Volume2 size={20} /> : <Info size={20} />}
              </span>
            )}
            {isCorrect && <RoundCelebration />}
            <strong>{t(getFeedbackTitle())}</strong>
            <span>
              {shouldShowSupportHint && !isCorrect
                ? t(getHelpMessage())
                : isSizeSort
                ? t(getProgressiveHint())
                : isEmotionMatch
                ? (isCorrect ? getProgressiveHint() : t(getProgressiveHint()))
                : isShapeSort
                  ? t(getProgressiveHint())
                  : isMatchPairs
                    ? t(getProgressiveHint())
                    : t(getProgressiveHint())}
            </span>
            {isEmotionMatch && !isCorrect && <small>{t('Look at the mouth and eyes.')}</small>}
            {isShapeSort && !isCorrect && <small>{t('Move a shape to the matching group.')}</small>}
          </div>
        )}
        {completed && (
          <GameCompleteActions onRepeat={resetGame} onGames={onBack} />
        )}
        <div className="form-actions">
          <button className="secondary-button game-reset-button" type="button" onClick={resetGame}>
            <RotateCcw size={18} /> {t('Reset')}
          </button>
          {isCorrect && !isLastRound && (
            <button className="primary-button" type="button" onClick={goToNextRound}>
              {t('Next round')} <ChevronRight size={18} />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export function MemoryGame({ activity, profile, soundOff, onBack, onComplete }) {
  const t = useT();
  const language = useContext(LanguageContext);
  const startsWithImages = profile?.letters === 'Does not recognize letters';
  const initialPairCount = getInitialMemoryPairCount(profile);
  const [mode, setMode] = useState(startsWithImages ? 'images' : 'words');
  const [pairCount, setPairCount] = useState(initialPairCount);
  const [deck, setDeck] = useState(() => shuffleCards(createMemoryDeck(initialPairCount)));
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [completed, setCompleted] = useState(false);
  const [lastMemoryMatch, setLastMemoryMatch] = useState(null);
  const complete = matched.length === deck.length;
  const matchedPairs = matched.length / 2;
  const memoryColumns = pairCount <= 2 ? 2 : pairCount <= 3 ? 3 : pairCount <= 8 ? 4 : 5;

  function resetGame(nextMode = mode, nextPairCount = pairCount) {
    setMode(nextMode);
    setPairCount(nextPairCount);
    setDeck(shuffleCards(createMemoryDeck(nextPairCount)));
    setFlipped([]);
    setMatched([]);
    setCompleted(false);
    setLastMemoryMatch(null);
  }

  function changePairCount(delta) {
    const nextPairCount = Math.min(10, Math.max(2, pairCount + delta));
    if (nextPairCount !== pairCount) resetGame(mode, nextPairCount);
  }

  useEffect(() => {
    if (!complete || completed) return;
    setCompleted(true);
    if (activity.category === 'play') {
      onComplete();
      return;
    }
    const timerId = window.setTimeout(onComplete, 700);
    return () => window.clearTimeout(timerId);
  }, [complete]);

  function chooseCard(card) {
    if (flipped.includes(card.id) || matched.includes(card.id) || flipped.length === 2) return;
    if (mode === 'words') {
      speak(t(card.label), language, soundOff, { rate: 0.86, pitch: 1.05 });
    }
    const nextFlipped = [...flipped, card.id];
    setFlipped(nextFlipped);
    if (nextFlipped.length === 2) {
      const pair = deck.filter((item) => nextFlipped.includes(item.id));
      if (pair[0].label === pair[1].label) {
        playSoftCelebrationSound(soundOff);
        window.setTimeout(() => {
          setMatched((items) => [...items, pair[0].id, pair[1].id]);
          setLastMemoryMatch(pair[0].label);
          setFlipped([]);
        }, 450);
      } else {
        window.setTimeout(() => {
          setLastMemoryMatch(null);
          setFlipped([]);
        }, 800);
      }
    }
  }

  return (
    <section className="game-page">
      <div className="page-title">
        <button className="icon-button" onClick={onBack} aria-label={t('Go back')}><ArrowLeft /></button>
        <span className="round-icon"><Puzzle /></span>
        <div>
          <p className="eyebrow">{t('Activity')}</p>
          <h1>{t(getActivityDisplayTitle(activity))}</h1>
        </div>
      </div>
      <div className="game-panel">
        <div className="game-prompt memory-prompt">
          <div>
            <p className="eyebrow">{t('Find pairs')}</p>
            <h2>{t(mode === 'images' ? 'Turn over two cards. Match the same pictures.' : 'Turn over two cards. Match the same words.')}</h2>
          </div>
          <div className="pair-stepper" aria-label={t('Number of pairs')}>
            <button
              type="button"
              className="icon-button"
              disabled={pairCount <= 2}
              onClick={() => changePairCount(-1)}
              aria-label={t('Fewer pairs')}
            >
              <Minus />
            </button>
            <strong>{pairCount} {t('Pairs')}</strong>
            <button
              type="button"
              className="icon-button"
              disabled={pairCount >= 10}
              onClick={() => changePairCount(1)}
              aria-label={t('More pairs')}
            >
              <Plus />
            </button>
          </div>
        </div>
        <div className="mode-toggle" aria-label={t('Memory card mode')}>
          <button
            type="button"
            className={mode === 'images' ? 'mode-option active' : 'mode-option'}
            aria-pressed={mode === 'images'}
            onClick={() => resetGame('images')}
          >
            {t('Images')}
          </button>
          <button
            type="button"
            className={mode === 'words' ? 'mode-option active' : 'mode-option'}
            aria-pressed={mode === 'words'}
            disabled={startsWithImages}
            onClick={() => resetGame('words')}
          >
            {t('Words')}
          </button>
        </div>
        <div className="memory-grid" style={{ '--memory-columns': memoryColumns }}>
          {deck.map((card) => {
            const visible = flipped.includes(card.id) || matched.includes(card.id);
            return (
              <button
                key={card.id}
                type="button"
                className={visible ? 'memory-card visible' : 'memory-card'}
                onClick={() => chooseCard(card)}
                aria-label={visible ? t(card.label) : t('Hidden card')}
              >
                {visible ? (
                  mode === 'images' ? (
                    <VisualAsset label={card.label} className="memory-image" />
                  ) : (
                    t(card.label)
                  )
                ) : '?'}
              </button>
            );
          })}
        </div>
        <div className={complete || lastMemoryMatch ? 'game-feedback success' : 'game-feedback'}>
          {lastMemoryMatch && <RoundCelebration label="+2" />}
          <strong>{complete ? t('All pairs found!') : lastMemoryMatch ? t('Nice pair!') : `${matchedPairs} ${t('of')} ${pairCount} ${t('Pairs')}`}</strong>
          {lastMemoryMatch && !complete && <span>{`${t('You found it!')} ${t(lastMemoryMatch)}.`}</span>}
        </div>
        {completed && (
          <GameCompleteActions onRepeat={() => resetGame()} onGames={onBack} />
        )}
        <div className="form-actions">
          <button className="secondary-button" type="button" onClick={() => resetGame()}>
            {t('Reset')}
          </button>
        </div>
      </div>
    </section>
  );
}

