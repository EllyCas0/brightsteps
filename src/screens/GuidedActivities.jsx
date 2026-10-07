import React, { useContext, useEffect, useRef, useState } from 'react';
import { ArrowLeft, Car, Check, ChevronRight, Clock, CupSoda, Hand, Image as ImageIcon, Info, MessageSquare, Pause, Play, Puzzle, RotateCcw, Star, Users, Volume2 } from 'lucide-react';
import { LanguageContext, useT } from '../data/translations.js';
import { BREATH_SOUND_IDLE_MS } from '../lib/storage.js';
import { speak } from '../lib/speech.js';
import { VisualAsset } from '../components/VisualAsset.jsx';
import { MediaToggle } from './MediaToggle.jsx';
import { getActivityDisplayTitle } from './Categories.jsx';
import { GameCompleteActions } from './Games.jsx';

export function SocialStory({ activity, config, soundOff, onBack, onComplete, onNextStory }) {
  const t = useT();
  const language = useContext(LanguageContext);
  const [sceneIndex, setSceneIndex] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [practiceDone, setPracticeDone] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [caregiverOpen, setCaregiverOpen] = useState(false);
  const scenes = config.scenes || [];
  const scene = scenes[sceneIndex] || scenes[0];
  const isLastScene = sceneIndex >= scenes.length - 1;
  const scenePracticeComplete = scene?.type !== 'practice'
    || practiceDone
    || (scene.practice === 'choice' && selectedChoice === scene.correct);

  useEffect(() => {
    setSceneIndex(0);
    setCompleted(false);
    setPracticeDone(false);
    setSelectedChoice(null);
    setCaregiverOpen(false);
  }, [activity.title]);

  useEffect(() => {
    setPracticeDone(false);
    setSelectedChoice(null);
    setCaregiverOpen(false);
  }, [sceneIndex]);

  function speakText(text) {
    speak(text, language, soundOff, { rate: 0.9, region: 'ES' });
  }

  function completeStory() {
    if (!completed) {
      setCompleted(true);
      onComplete();
    }
  }

function goNext() {
    if (!scenes.length) return;
    if (isLastScene) {
      completeStory();
      return;
    }
    setSceneIndex((index) => Math.min(index + 1, scenes.length - 1));
  }

  function resetStory() {
    setSceneIndex(0);
    setCompleted(false);
    setPracticeDone(false);
    setSelectedChoice(null);
    setCaregiverOpen(false);
  }

  function startNextStory() {
    resetStory();
    onNextStory?.();
  }

  if (!scene) {
    return (
      <section className="game-page social-story-page">
        <div className="page-title social-story-title">
          <button className="icon-button" onClick={onBack} aria-label={t('Go back')}><ArrowLeft /></button>
          <span className="round-icon"><Users /></span>
          <div>
            <p className="eyebrow">{t('Social')}</p>
            <h1>{t('Story not ready')}</h1>
          </div>
        </div>
        <article className="social-story-panel">
          <p>{t('This story needs more steps before it can be played.')}</p>
          <button className="primary-button" type="button" onClick={onBack}>
            <Users size={18} /> {t('Back to Social')}
          </button>
        </article>
      </section>
    );
  }

  return (
    <section className="game-page social-story-page">
      <div className="page-title social-story-title">
        <button className="icon-button" onClick={onBack} aria-label={t('Go back')}><ArrowLeft /></button>
        <span className="round-icon"><Users /></span>
        <div>
          <p className="eyebrow">{t(activity.title)}</p>
          <h1>{t(config.storyTitle)}</h1>
        </div>
      </div>

      <article className="social-story-panel">
        <div className="social-story-status">
          <span>{t('Story')} {sceneIndex + 1} {t('of')} {scenes.length}</span>
          <StoryProgress current={sceneIndex} total={scenes.length} />
        </div>

        <StorySceneVisual scene={scene} practiced={practiceDone || completed} selectedChoice={selectedChoice} />

        <div className="social-story-copy">
          {scene.type === 'practice' && <p className="eyebrow">{t('Your turn')}</p>}
          {scene.type === 'model' && <p className="eyebrow">{t('Watch')}</p>}
          <h2>{t(scene.text)}</h2>
          {scene.supportingText && <p>{t(scene.supportingText)}</p>}
        </div>

        {scene.type === 'practice' && scene.practice !== 'choice' && (
          <PracticeScene
            scene={scene}
            practiced={practiceDone}
            onPractice={() => setPracticeDone(true)}
            onSpeak={() => speakText(t(scene.listenText || scene.text))}
          />
        )}

        {scene.type === 'practice' && scene.practice === 'choice' && (
          <div className="social-choice-grid">
            {scene.choices.map((choice) => {
              const isSelected = selectedChoice === choice;
              const isCorrect = selectedChoice === scene.correct && choice === scene.correct;
              return (
                <button
                  key={choice}
                  type="button"
                  className={[
                    'social-choice-card',
                    isSelected ? 'selected' : '',
                    isCorrect ? 'correct' : ''
                  ].filter(Boolean).join(' ')}
                  onClick={() => setSelectedChoice(choice)}
                >
                  <VisualAsset label={choice} className="choice-image" fallback={false} />
                  <span>{t(choice)}</span>
                  {isCorrect && <Check className="choice-state-icon" size={20} aria-label={t('Great job!')} />}
                </button>
              );
            })}
          </div>
        )}

        {scene.type === 'ending' && (
          <div className="social-story-ending" aria-live="polite">
            <Star className="social-story-star" aria-hidden="true" />
            <strong>{t('Nice practicing!')}</strong>
            <span>{t(scene.practicedText)}</span>
          </div>
        )}

        <div className="social-story-actions">
          <button className="secondary-button" type="button" onClick={() => speakText(t(scene.listenText || scene.text))} disabled={soundOff}>
            <Volume2 size={18} /> {t('Listen')}
          </button>
          {config.caregiverTip && (
            <button className="secondary-button" type="button" onClick={() => setCaregiverOpen((value) => !value)} aria-expanded={caregiverOpen}>
              <Info size={18} /> {t('Caregiver tip')}
            </button>
          )}
          {scene.type === 'ending' ? (
            <button className="primary-button" type="button" onClick={completeStory}>
              <Check size={18} /> {t('Finish')}
            </button>
          ) : (
            <button className="primary-button" type="button" onClick={goNext} disabled={!scenePracticeComplete}>
              {t(scene.action || 'Next')} <ChevronRight size={18} />
            </button>
          )}
        </div>

        {caregiverOpen && (
          <aside className="social-caregiver-tip">
            <strong>{t('Caregiver tip')}</strong>
            <p>{t(config.caregiverTip)}</p>
          </aside>
        )}

        {completed && (
          <div className="social-story-complete">
            <button className="secondary-button" type="button" onClick={resetStory}>
              <RotateCcw size={18} /> {t('Practice again')}
            </button>
            <button className="secondary-button" type="button" onClick={onBack}>
              <Users size={18} /> {t('Back to Social')}
            </button>
            {onNextStory && (
              <button className="primary-button" type="button" onClick={startNextStory}>
                {t('Another story')} <ChevronRight size={18} />
              </button>
            )}
          </div>
        )}
      </article>
    </section>
  );
}

function StoryProgress({ current, total }) {
  return (
    <div className="story-progress-dots" aria-hidden="true">
      {Array.from({ length: total }).map((_, index) => (
        <span key={index} className={index <= current ? 'active' : ''} />
      ))}
    </div>
  );
}

function StorySceneVisual({ scene, practiced, selectedChoice }) {
  const t = useT();
  return (
    <div className={`social-scene-visual scene-${scene.mood || 'play'}`}>
      <div className="story-floor" aria-hidden="true" />
      <StoryCharacter name="Mia" pose={scene.type === 'practice' || practiced ? 'wave' : 'stand'} />
      {scene.leo && <StoryCharacter name="Leo" pose={scene.mood === 'sad' ? 'sad' : scene.mood === 'happy' ? 'happy' : scene.type === 'response' ? 'wave' : 'stand'} />}
      {scene.tower && <StoryTower blocks={scene.tower} />}
      {scene.mood === 'cars' && <StoryCars shared={scene.type === 'response' || practiced} />}
      {scene.mood === 'snack' && <StorySnack />}
      {scene.type === 'practice' && scene.practice === 'hello' && (
        <div className="story-communication-options" aria-hidden="true">
          <span><Hand size={24} /> {t('Wave')}</span>
          <span><MessageSquare size={24} /> {t('Hello')}</span>
          <span><ImageIcon size={24} /> {t('AAC')}</span>
        </div>
      )}
      {selectedChoice && <span className="story-choice-bubble">{t(selectedChoice)}</span>}
    </div>
  );
}

function StoryCharacter({ name, pose }) {
  const initial = name === 'Mia' ? 'M' : 'L';
  return (
    <div className={`story-character story-character-${name.toLowerCase()} pose-${pose}`} aria-label={name}>
      <span className="story-character-head">
        <span className="story-character-hair" />
        <span className="story-character-face">{pose === 'sad' ? '•︵•' : '•‿•'}</span>
      </span>
      <span className="story-character-body">{initial}</span>
      <span className="story-character-arm left" />
      <span className="story-character-arm right" />
      <strong>{name}</strong>
    </div>
  );
}

function StoryTower({ blocks }) {
  return (
    <div className="story-tower" aria-hidden="true">
      {Array.from({ length: blocks }).map((_, index) => <span key={index} />)}
    </div>
  );
}

function StoryCars({ shared }) {
  return (
    <div className={shared ? 'story-cars shared' : 'story-cars'} aria-hidden="true">
      <Car />
      <Car />
    </div>
  );
}

function StorySnack() {
  return <div className="story-snack" aria-hidden="true"><CupSoda /></div>;
}

function PracticeScene({ scene, practiced, onPractice, onSpeak }) {
  const t = useT();
  if (scene.practice === 'block') {
    return (
      <button className={practiced ? 'practice-action-card done' : 'practice-action-card'} type="button" onClick={onPractice}>
        <span className="practice-block" aria-hidden="true" />
        <strong>{t(practiced ? 'Block added' : 'Add the block')}</strong>
      </button>
    );
  }
  if (scene.practice === 'share-car') {
    return (
      <button className={practiced ? 'practice-action-card done' : 'practice-action-card'} type="button" onClick={onPractice}>
        <Car aria-hidden="true" />
        <strong>{t(practiced ? 'Car shared' : 'Share the car')}</strong>
      </button>
    );
  }
  return (
    <div className="practice-confirm-card">
      {scene.listenText && (
        <button className="secondary-button" type="button" onClick={onSpeak}>
          <Volume2 size={18} /> {t('Hear “Hello!”')}
        </button>
      )}
      <button className="primary-button" type="button" onClick={onPractice}>
        <Check size={18} /> {t(practiced ? 'I did it' : 'I did it')}
      </button>
    </div>
  );
}

export function GuidedActivity({ activity, config, soundOff, onBack, onComplete, onNextStory }) {
  const t = useT();
  const language = useContext(LanguageContext);
  const [mediaMode, setMediaMode] = useState('images');
  const [selected, setSelected] = useState(null);
  const [choiceRoundIndex, setChoiceRoundIndex] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [breaths, setBreaths] = useState(0);
  const [countIndex, setCountIndex] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(30);
  const [completed, setCompleted] = useState(false);
  const [dailyVideoStep, setDailyVideoStep] = useState(0);
  const [dailyVideoPlaying, setDailyVideoPlaying] = useState(false);
  const [storyVolume, setStoryVolume] = useState(0.9);
  const [yogaHumPlaying, setYogaHumPlaying] = useState(false);
  const [breathSoundPlaying, setBreathSoundPlaying] = useState(false);
  const [breathPhaseIndex, setBreathPhaseIndex] = useState(0);
  const yogaHumRef = useRef({ context: null, gain: null, nodes: [] });
  const breathAudioRef = useRef({ context: null, gain: null, nodes: [], intervals: [] });
  const breathIdleTimerRef = useRef(null);
  const isYogaCalm = activity.category === 'calm' && activity.title === 'Yoga Calm';
  const isBreathActivity = activity.category === 'calm' && config.type === 'breath';
  const isSocialStory = activity.category === 'social';
  const isDailyActivity = activity.category === 'daily';
  const breathPhases = [
    { key: 'Breathe in', label: 'Big breath in' },
    { key: 'Breathe out', label: 'Slow breath out' },
    { key: 'Rest', label: 'Rest softly' }
  ];
  const currentBreathPhase = breathPhases[breathPhaseIndex % breathPhases.length];

  useEffect(() => {
    setSelected(null);
    setChoiceRoundIndex(0);
    setStepIndex(0);
    setBreaths(0);
    setCountIndex(0);
    setTimerStarted(false);
    setSecondsLeft(30);
    setCompleted(false);
    setDailyVideoStep(0);
    setDailyVideoPlaying(false);
  }, [activity.title]);

  useEffect(() => {
    if (mediaMode !== 'videos') setDailyVideoPlaying(false);
  }, [mediaMode]);

  useEffect(() => {
    if (!timerStarted || secondsLeft === 0) return undefined;
    const timerId = window.setInterval(() => setSecondsLeft((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearInterval(timerId);
  }, [timerStarted, secondsLeft]);

  useEffect(() => {
    if (soundOff && yogaHumPlaying) stopYogaHum();
  }, [soundOff, yogaHumPlaying]);

  useEffect(() => {
    if (!isBreathActivity) return undefined;
    const phaseTimerId = window.setInterval(() => {
      setBreathPhaseIndex((value) => (value + 1) % breathPhases.length);
    }, 2800);
    return () => window.clearInterval(phaseTimerId);
  }, [isBreathActivity]);

  useEffect(() => {
    if (!isBreathActivity) return undefined;
    if (soundOff) {
      stopBreathSound();
      return undefined;
    }
    const timerId = window.setTimeout(startBreathSound, 120);
    return () => window.clearTimeout(timerId);
  }, [isBreathActivity, soundOff]);

  useEffect(() => {
    if (soundOff && breathSoundPlaying) stopBreathSound();
  }, [soundOff, breathSoundPlaying]);

  useEffect(() => () => stopYogaHum(), []);
  useEffect(() => () => stopBreathSound(), []);

  const choiceRounds = config.type === 'choices' ? (config.rounds || [config]) : [];
  const currentChoiceRound = choiceRounds[choiceRoundIndex] || choiceRounds[0] || config;
  const isLastChoiceRound = choiceRoundIndex >= choiceRounds.length - 1;
  const choiceComplete = config.type === 'choices' && selected === currentChoiceRound.correct;
  const choicesDone = choiceComplete && isLastChoiceRound;
  const stepsDone = ['steps', 'script', 'turns'].includes(config.type) && stepIndex >= (config.steps || config.lines || config.turns).length;
  const breathDone = config.type === 'breath' && breaths >= 3;
  const countDone = config.type === 'count' && countIndex >= (config.items || []).length;
  const timerDone = config.type === 'timer' && secondsLeft === 0;
  const done = choicesDone || stepsDone || breathDone || countDone || timerDone;
  const sequence = config.steps || config.lines || config.turns || [];
  const isDailyVideoDemo = isDailyActivity && mediaMode === 'videos' && ['steps', 'script', 'turns'].includes(config.type) && sequence.length > 0;
  const shouldShowListen = isSocialStory || (activity.category === 'daily' && mediaMode === 'images') || activity.category === 'calm';
  const shouldSpeakActions = isSocialStory || config.speak;
  const activeDailyVideoItem = sequence[dailyVideoStep] || sequence[0];

  useEffect(() => {
    if (!isDailyVideoDemo || !dailyVideoPlaying) return undefined;
    const timerId = window.setInterval(() => {
      setDailyVideoStep((currentStep) => {
        if (currentStep >= sequence.length - 1) {
          setDailyVideoPlaying(false);
          return currentStep;
        }
        return currentStep + 1;
      });
    }, 1300);
    return () => window.clearInterval(timerId);
  }, [isDailyVideoDemo, dailyVideoPlaying, sequence.length]);

  function getSequenceLabel(item) {
    return typeof item === 'string' ? item : item.label;
  }

  function getSequenceVisual(item) {
    return typeof item === 'string' ? activity.title : (item.image || activity.title);
  }

  function getSequenceStory(item) {
    return typeof item === 'string' ? '' : item.story;
  }

  function getSequenceCaregiverInstruction(item) {
    return typeof item === 'string' ? '' : item.caregiverInstruction;
  }

  useEffect(() => {
    if (!done || completed) return;
    setCompleted(true);
    if (activity.category === 'calm' && config.type === 'breath') return;
    if (activity.category === 'play') {
      onComplete();
      return;
    }
    const timerId = window.setTimeout(onComplete, 700);
    return () => window.clearTimeout(timerId);
  }, [done]);

  function speakText(text) {
    speak(text, language, soundOff, { rate: 0.9, volume: storyVolume, region: 'ES' });
  }

  function ensureYogaHumContext() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return null;
    if (!yogaHumRef.current.context || yogaHumRef.current.context.state === 'closed') {
      yogaHumRef.current.context = new AudioContext();
    }
    if (yogaHumRef.current.context.state === 'suspended') {
      yogaHumRef.current.context.resume();
    }
    return yogaHumRef.current.context;
  }

  function trackYogaHumNode(node) {
    yogaHumRef.current.nodes.push(node);
    return node;
  }

  function stopYogaHum() {
    yogaHumRef.current.nodes.forEach((node) => {
      try {
        node.stop?.();
      } catch {
        // Some audio nodes may already be stopped.
      }
      node.disconnect?.();
    });
    yogaHumRef.current.gain?.disconnect();
    yogaHumRef.current = { ...yogaHumRef.current, gain: null, nodes: [] };
    setYogaHumPlaying(false);
  }

  function ensureBreathContext() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return null;
    if (!breathAudioRef.current.context || breathAudioRef.current.context.state === 'closed') {
      breathAudioRef.current.context = new AudioContext();
    }
    if (breathAudioRef.current.context.state === 'suspended') {
      breathAudioRef.current.context.resume();
    }
    return breathAudioRef.current.context;
  }

  function trackBreathNode(node) {
    breathAudioRef.current.nodes.push(node);
    return node;
  }

  function makeBreathNoise(context) {
    const buffer = context.createBuffer(1, context.sampleRate * 2, context.sampleRate);
    const data = buffer.getChannelData(0);
    for (let index = 0; index < data.length; index += 1) {
      data[index] = Math.random() * 2 - 1;
    }
    const source = trackBreathNode(context.createBufferSource());
    source.buffer = buffer;
    source.loop = true;
    return source;
  }

  function playBreathPulse(context, masterGain, startTime, direction = 'in') {
    const noise = makeBreathNoise(context);
    const filter = context.createBiquadFilter();
    const gain = context.createGain();
    const lowFreq = direction === 'in' ? 520 : 420;
    const highFreq = direction === 'in' ? 1180 : 820;

    filter.type = 'bandpass';
    filter.Q.value = 0.6;
    filter.frequency.setValueAtTime(lowFreq, startTime);
    filter.frequency.linearRampToValueAtTime(highFreq, startTime + 1.7);
    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.linearRampToValueAtTime(0.18, startTime + 0.35);
    gain.gain.linearRampToValueAtTime(0.09, startTime + 1.65);
    gain.gain.linearRampToValueAtTime(0.0001, startTime + 2.25);

    noise.connect(filter).connect(gain).connect(masterGain);
    noise.start(startTime);
    noise.stop(startTime + 2.35);
  }

  function scheduleBreathCycle(context, masterGain) {
    const now = context.currentTime + 0.05;
    playBreathPulse(context, masterGain, now, 'in');
    playBreathPulse(context, masterGain, now + 2.8, 'out');
  }

  function stopBreathSound() {
    if (breathIdleTimerRef.current) {
      window.clearTimeout(breathIdleTimerRef.current);
      breathIdleTimerRef.current = null;
    }
    breathAudioRef.current.intervals.forEach((intervalId) => window.clearInterval(intervalId));
    breathAudioRef.current.nodes.forEach((node) => {
      try {
        node.stop?.();
      } catch {
        // Timed breath nodes may already have stopped.
      }
      node.disconnect?.();
    });
    breathAudioRef.current.gain?.disconnect();
    breathAudioRef.current = { ...breathAudioRef.current, gain: null, nodes: [], intervals: [] };
    setBreathSoundPlaying(false);
  }

  function scheduleBreathIdleStop() {
    if (breathIdleTimerRef.current) window.clearTimeout(breathIdleTimerRef.current);
    breathIdleTimerRef.current = window.setTimeout(stopBreathSound, BREATH_SOUND_IDLE_MS);
  }

  function markBreathUsed() {
    if (breathSoundPlaying) scheduleBreathIdleStop();
  }

  function startBreathSound() {
    stopBreathSound();
    if (soundOff || !isBreathActivity) return;
    const context = ensureBreathContext();
    if (!context) return;

    const masterGain = context.createGain();
    masterGain.gain.setValueAtTime(0.28, context.currentTime);
    masterGain.connect(context.destination);
    breathAudioRef.current.gain = masterGain;

    scheduleBreathCycle(context, masterGain);
    const intervalId = window.setInterval(() => {
      if (breathAudioRef.current.context && breathAudioRef.current.gain) {
        scheduleBreathCycle(breathAudioRef.current.context, breathAudioRef.current.gain);
      }
    }, 8400);
    breathAudioRef.current.intervals.push(intervalId);
    scheduleBreathIdleStop();
    setBreathSoundPlaying(true);
  }

  function toggleBreathSound() {
    if (breathSoundPlaying) {
      stopBreathSound();
    } else {
      startBreathSound();
    }
  }

  function startYogaHum() {
    stopYogaHum();
    if (soundOff) return;
    const context = ensureYogaHumContext();
    if (!context) return;

    const masterGain = context.createGain();
    const humGain = context.createGain();
    const pulse = trackYogaHumNode(context.createOscillator());
    const pulseGain = context.createGain();
    const base = trackYogaHumNode(context.createOscillator());
    const warmth = trackYogaHumNode(context.createOscillator());

    masterGain.gain.setValueAtTime(0.18, context.currentTime);
    humGain.gain.setValueAtTime(0.16, context.currentTime);
    pulse.type = 'sine';
    pulse.frequency.value = 0.18;
    pulseGain.gain.value = 0.05;
    base.type = 'sine';
    base.frequency.value = 136.1;
    warmth.type = 'triangle';
    warmth.frequency.value = 204.2;

    pulse.connect(pulseGain).connect(humGain.gain);
    base.connect(humGain);
    warmth.connect(humGain);
    humGain.connect(masterGain).connect(context.destination);

    [pulse, base, warmth].forEach((node) => node.start());
    yogaHumRef.current.gain = masterGain;
    setYogaHumPlaying(true);
  }

  function toggleYogaHum() {
    if (yogaHumPlaying) {
      stopYogaHum();
    } else {
      startYogaHum();
    }
  }

  return (
    <section className={activity.category === 'calm' ? 'game-page calm-zone-page calm-activity-page' : 'game-page'}>
      <div className="page-title">
        <button className="icon-button" onClick={onBack} aria-label={t('Go back')}><ArrowLeft /></button>
        <span className="round-icon"><Puzzle /></span>
        <div>
          <p className="eyebrow">{t('Activity')}</p>
          <h1>{t(getActivityDisplayTitle(activity))}</h1>
        </div>
        {activity.category === 'daily' && <MediaToggle value={mediaMode} onChange={setMediaMode} />}
      </div>
      <div className="game-panel">
        <div className="game-prompt">
          <p className="eyebrow">{t('Easy practice')}</p>
          <h2>{t(config.prompt)}</h2>
          {shouldShowListen && (
            <button className="secondary-button audio-prompt-button" type="button" onClick={() => speakText(t(config.prompt))}>
              <Volume2 size={18} /> {t('Listen')}
            </button>
          )}
          {isSocialStory && (
            <label className="story-volume-control">
              <span>{t('Story sound')}</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={storyVolume}
                disabled={soundOff}
                onChange={(event) => setStoryVolume(Number(event.target.value))}
              />
            </label>
          )}
          {isYogaCalm && (
            <button className="secondary-button audio-prompt-button" type="button" onClick={toggleYogaHum} disabled={soundOff}>
              <Volume2 size={18} /> {t(yogaHumPlaying ? 'Stop gentle hum' : 'Start gentle hum')}
            </button>
          )}
        </div>

        {config.type === 'choices' && (
          <>
            <div className="target-card">
              <VisualAsset label={currentChoiceRound.visual} className="target-image" />
            </div>
            <div className="game-choices">
              {currentChoiceRound.choices.map((choice) => (
                <button
                  key={choice}
                  type="button"
                  className={[
                    'game-choice',
                    selected === choice ? 'selected' : '',
                    choiceComplete && choice === currentChoiceRound.correct ? 'correct' : ''
                  ].filter(Boolean).join(' ')}
                  disabled={choiceComplete}
                  onClick={() => {
                    setSelected(choice);
                    if (shouldSpeakActions) speakText(t(choice));
                  }}
                >
                  <VisualAsset label={choice} className="choice-image" fallback={false} />
                  {t(choice)}
                  {choiceComplete && choice === currentChoiceRound.correct && <Check className="choice-state-icon" size={22} aria-label={t('Great job!')} />}
                </button>
              ))}
            </div>
          </>
        )}

        {isDailyVideoDemo && (
          <div className="lesson-video-demo daily-video-demo">
            <div className="lesson-video-stage daily-video-stage" aria-label={t('Animated example')}>
              <VisualAsset label={getSequenceVisual(activeDailyVideoItem)} className="lesson-video-image" />
              <span className="lesson-video-step-badge">{dailyVideoStep + 1}</span>
              <strong className="daily-video-step-title">{t(getSequenceLabel(activeDailyVideoItem))}</strong>
            </div>
            <div className="lesson-video-controls">
              <button
                className="primary-button"
                type="button"
                onClick={() => setDailyVideoPlaying((value) => !value)}
              >
                {dailyVideoPlaying ? <Pause size={18} /> : <Play size={18} />}
                {t(dailyVideoPlaying ? 'Pause demo' : 'Play demo')}
              </button>
              <button
                className="secondary-button"
                type="button"
                onClick={() => {
                  setDailyVideoStep(0);
                  setDailyVideoPlaying(true);
                }}
              >
                <RotateCcw size={18} /> {t('Replay demo')}
              </button>
            </div>
            <div className="lesson-video-board daily-video-board" aria-label={t('Daily activity steps')}>
              {sequence.map((item, index) => (
                <button
                  key={`${getSequenceLabel(item)}-${index}`}
                  type="button"
                  className={index === dailyVideoStep ? 'video-step-card active' : 'video-step-card'}
                  onClick={() => {
                    setDailyVideoStep(index);
                    setDailyVideoPlaying(false);
                  }}
                  aria-label={`${t('Show step')} ${index + 1}: ${t(getSequenceLabel(item))}`}
                >
                  <VisualAsset label={getSequenceVisual(item)} className="video-step-image" />
                  <span>{index + 1}</span>
                  <strong>{t(getSequenceLabel(item))}</strong>
                </button>
              ))}
            </div>
            <p className="lesson-helper">{t('Watch the pictures change like a short video, or tap a frame to pause on that step.')}</p>
          </div>
        )}

        {['steps', 'script', 'turns'].includes(config.type) && !isDailyVideoDemo && (
          <div className="sequence-board">
            {sequence.map((item, index) => (
              <button
                key={getSequenceLabel(item)}
                type="button"
                className={item.image ? (index < stepIndex ? 'sequence-step visual done' : 'sequence-step visual') : (index < stepIndex ? 'sequence-step done' : 'sequence-step')}
                disabled={index !== stepIndex}
                onClick={() => {
                  setStepIndex((value) => value + 1);
                  if (shouldSpeakActions) speakText(t(getSequenceLabel(item)));
                }}
              >
                <span>{index + 1}</span>
                {item.image && <VisualAsset label={item.image} className="sequence-step-image" />}
                <div className="sequence-step-copy">
                  <strong>{t(getSequenceLabel(item))}</strong>
                  {getSequenceStory(item) && <small>{t(getSequenceStory(item))}</small>}
                  {index === stepIndex && getSequenceCaregiverInstruction(item) && (
                    <em>
                      <b>{t('Caregiver prompt')}</b>
                      {t(getSequenceCaregiverInstruction(item))}
                    </em>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}

        {config.type === 'breath' && (
          <div className="breath-practice guided-breath-practice">
            <div className="breath-stage" aria-label={t(currentBreathPhase.label)}>
              <div className="breath-ring" aria-hidden="true">
                <div className="breath-ring-inner" />
              </div>
              <div className="breath-phase">
                <strong>{t(currentBreathPhase.label)}</strong>
              </div>
            </div>
            <p className="breath-sound-status">
              <Volume2 size={18} /> {soundOff ? t('Sound is muted.') : (breathSoundPlaying ? t('Breathing sound is on.') : t('Breathing sound'))}
            </p>
            <strong>{breaths} {t('of')} 3 {t('breaths')}</strong>
            <div className="breath-actions">
              <button className="primary-button" type="button" onClick={() => {
                const instruction = sequence[breaths % sequence.length];
                markBreathUsed();
                setBreaths((value) => Math.min(3, value + 1));
                if (shouldSpeakActions && instruction) speakText(t(getSequenceLabel(instruction)));
              }}>
                {t('I breathed')}
              </button>
              <button className="secondary-button" type="button" onClick={toggleBreathSound} disabled={soundOff}>
                <Volume2 size={18} /> {t(breathSoundPlaying ? 'Stop breathing sound' : 'Start breathing sound')}
              </button>
              <button className="secondary-button" type="button" onClick={() => { setBreaths(0); setCompleted(false); }}>
                <RotateCcw size={18} /> {t('Repeat')}
              </button>
            </div>
          </div>
        )}

        {config.type === 'count' && (
          <div className="count-practice">
            <div className="count-row" aria-label={t('Counting cards')}>
              {(config.items || []).map((item, index) => (
                <button
                  key={item}
                  type="button"
                  className={index < countIndex ? 'count-card done' : 'count-card'}
                  disabled={index !== countIndex}
                  onClick={() => setCountIndex((value) => value + 1)}
                >
                  <VisualAsset label="Bed" className="count-image" />
                  <strong>{item}</strong>
                </button>
              ))}
            </div>
            <strong>{Math.min(countIndex, (config.items || []).length)} {t('of')} {(config.items || []).length}</strong>
          </div>
        )}

        {config.type === 'timer' && (
          <div className="timer-practice">
            <div className="timer large" aria-live="polite"><Clock /> 0:{String(secondsLeft).padStart(2, '0')}</div>
            <button className="primary-button" type="button" onClick={() => setTimerStarted(true)}>
              {t('Start timer')}
            </button>
          </div>
        )}

        {(selected || done) && (
          <div className={done || choiceComplete ? 'game-feedback success' : 'game-feedback'}>
            <strong>{t(done || choiceComplete ? 'Nice work!' : 'Keep trying.')}</strong>
            <span>{t(done ? 'Activity complete.' : choiceComplete ? 'You found the right answer.' : 'Try the matching answer or next step.')}</span>
            {choiceComplete && !isLastChoiceRound && (
              <button
                className="primary-button"
                type="button"
                onClick={() => {
                  setSelected(null);
                  setChoiceRoundIndex((index) => Math.min(index + 1, choiceRounds.length - 1));
                }}
              >
                {t('Next round')} <ChevronRight size={18} />
              </button>
            )}
          </div>
        )}

        {['play', 'social'].includes(activity.category) && completed && (
          <GameCompleteActions
            onRepeat={() => {
              setSelected(null);
              setChoiceRoundIndex(0);
              setStepIndex(0);
              setBreaths(0);
              setCountIndex(0);
              setTimerStarted(false);
              setSecondsLeft(30);
              setCompleted(false);
            }}
            onGames={onBack}
            onNext={activity.category === 'social' ? onNextStory : undefined}
            backLabel={activity.category === 'social' ? 'Back to Social' : 'Back to Games'}
          />
        )}

        <div className="form-actions">
          <button className="secondary-button" type="button" onClick={() => {
            setSelected(null);
            setChoiceRoundIndex(0);
            setStepIndex(0);
            setBreaths(0);
            setCountIndex(0);
            setTimerStarted(false);
            setSecondsLeft(30);
            setCompleted(false);
          }}>
            {t('Reset')}
          </button>
        </div>
      </div>
    </section>
  );
}
