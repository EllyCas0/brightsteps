import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Volume2 } from 'lucide-react';
import { useT } from '../../data/translations.js';

const calmSoundOptions = [
  { id: 'rain', label: 'Rain', description: 'Soft steady rain' },
  { id: 'ocean', label: 'Ocean', description: 'Slow wave sound' },
  { id: 'nature', label: 'Nature', description: 'Gentle outdoor tone' },
  { id: 'music', label: 'Soft music', description: 'Simple calm notes' },
  { id: 'hum', label: 'Mmmm hum', description: 'Gentle yoga hum' }
];

export function CalmSoundActivity({ activity, soundOff, onBack }) {
  const t = useT();
  return (
    <section className="calm-sound-activity">
      <div className="page-title">
        <button className="icon-button" onClick={onBack} aria-label="Go back"><ArrowLeft /></button>
        <span className="round-icon"><Volume2 /></span>
        <div>
          <p className="eyebrow">{t('Calm activities')}</p>
          <h1>{t(activity.title)}</h1>
        </div>
      </div>
      {soundOff && <span className="pill">{t('Quiet mode')}</span>}
      <CalmSoundPanel soundOff={soundOff} />
    </section>
  );
}

function CalmSoundPanel({ soundOff }) {
  const t = useT();
  const [activeSound, setActiveSound] = useState('');
  const [volume, setVolume] = useState(0.34);
  const soundRef = useRef({ context: null, gain: null, sources: [], intervals: [] });

  useEffect(() => {
    if (soundRef.current.gain) {
      soundRef.current.gain.gain.setTargetAtTime(volume, soundRef.current.context.currentTime, 0.04);
    }
  }, [volume]);

  useEffect(() => {
    if (soundOff) {
      stopCalmSound();
      setActiveSound('');
    }
  }, [soundOff]);

  useEffect(() => () => stopCalmSound(), []);

  function createNoiseSource(context) {
    const bufferSize = context.sampleRate * 2;
    const buffer = context.createBuffer(1, bufferSize, context.sampleRate);
    const data = buffer.getChannelData(0);
    for (let index = 0; index < bufferSize; index += 1) {
      data[index] = Math.random() * 2 - 1;
    }
    const source = context.createBufferSource();
    source.buffer = buffer;
    source.loop = true;
    return source;
  }

  function ensureAudioContext() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return null;
    if (!soundRef.current.context || soundRef.current.context.state === 'closed') {
      soundRef.current.context = new AudioContext();
    }
    if (soundRef.current.context.state === 'suspended') {
      soundRef.current.context.resume();
    }
    return soundRef.current.context;
  }

  function trackNode(node) {
    soundRef.current.sources.push(node);
    return node;
  }

  function stopCalmSound() {
    soundRef.current.intervals.forEach((intervalId) => window.clearInterval(intervalId));
    soundRef.current.sources.forEach((source) => {
      try {
        source.stop?.();
      } catch {
        // Some audio nodes may already be stopped.
      }
      source.disconnect?.();
    });
    soundRef.current.gain?.disconnect();
    soundRef.current = { ...soundRef.current, gain: null, sources: [], intervals: [] };
  }

  function playTone(context, output, frequency, duration = 0.22, delay = 0) {
    const oscillator = trackNode(context.createOscillator());
    const toneGain = context.createGain();
    const startAt = context.currentTime + delay;
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, startAt);
    toneGain.gain.setValueAtTime(0.0001, startAt);
    toneGain.gain.exponentialRampToValueAtTime(0.08, startAt + 0.04);
    toneGain.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);
    oscillator.connect(toneGain).connect(output);
    oscillator.start(startAt);
    oscillator.stop(startAt + duration + 0.04);
  }

  function playBirdChirp(context, output, delay = 0) {
    const chirpCount = 2 + Math.floor(Math.random() * 2);
    const baseFrequency = 1250 + Math.random() * 950;

    for (let index = 0; index < chirpCount; index += 1) {
      const oscillator = trackNode(context.createOscillator());
      const chirpGain = context.createGain();
      const startAt = context.currentTime + delay + index * (0.11 + Math.random() * 0.05);
      const duration = 0.09 + Math.random() * 0.05;
      const startFrequency = baseFrequency + Math.random() * 320;
      const endFrequency = startFrequency + 420 + Math.random() * 520;

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(startFrequency, startAt);
      oscillator.frequency.exponentialRampToValueAtTime(endFrequency, startAt + duration);
      chirpGain.gain.setValueAtTime(0.0001, startAt);
      chirpGain.gain.exponentialRampToValueAtTime(0.045, startAt + 0.02);
      chirpGain.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);
      oscillator.connect(chirpGain).connect(output);
      oscillator.start(startAt);
      oscillator.stop(startAt + duration + 0.03);
    }
  }

  function startCalmSound(soundId) {
    stopCalmSound();
    if (soundOff) return;
    const context = ensureAudioContext();
    if (!context) return;

    const masterGain = context.createGain();
    masterGain.gain.setValueAtTime(volume, context.currentTime);
    masterGain.connect(context.destination);
    soundRef.current.gain = masterGain;

    if (soundId === 'rain') {
      const rain = trackNode(createNoiseSource(context));
      const filter = context.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 1650;
      filter.Q.value = 0.55;
      rain.connect(filter).connect(masterGain);
      rain.start();
    }

    if (soundId === 'ocean') {
      const ocean = trackNode(createNoiseSource(context));
      const filter = context.createBiquadFilter();
      const waveGain = context.createGain();
      const lfo = trackNode(context.createOscillator());
      const lfoGain = context.createGain();
      filter.type = 'lowpass';
      filter.frequency.value = 520;
      waveGain.gain.value = 0.42;
      lfo.frequency.value = 0.08;
      lfoGain.gain.value = 0.24;
      lfo.connect(lfoGain).connect(waveGain.gain);
      ocean.connect(filter).connect(waveGain).connect(masterGain);
      ocean.start();
      lfo.start();
    }

    if (soundId === 'nature') {
      const base = trackNode(createNoiseSource(context));
      const filter = context.createBiquadFilter();
      const baseGain = context.createGain();
      filter.type = 'lowpass';
      filter.frequency.value = 620;
      baseGain.gain.value = 0.34;
      base.connect(filter).connect(baseGain).connect(masterGain);
      base.start();
      playBirdChirp(context, masterGain, 0.18);
      playBirdChirp(context, masterGain, 0.72);
      const birdIntervalId = window.setInterval(() => {
        playBirdChirp(context, masterGain);
        if (Math.random() > 0.48) playBirdChirp(context, masterGain, 0.44);
      }, 2100);
      const softToneIntervalId = window.setInterval(() => {
        const notes = [523.25, 659.25, 783.99, 987.77];
        playTone(context, masterGain, notes[Math.floor(Math.random() * notes.length)], 0.14);
      }, 2400);
      soundRef.current.intervals.push(birdIntervalId, softToneIntervalId);
    }

    if (soundId === 'music') {
      const notes = [261.63, 329.63, 392, 523.25];
      notes.forEach((frequency, index) => {
        const oscillator = trackNode(context.createOscillator());
        const toneGain = context.createGain();
        oscillator.type = 'sine';
        oscillator.frequency.value = frequency;
        toneGain.gain.value = index === 0 ? 0.09 : 0.035;
        oscillator.connect(toneGain).connect(masterGain);
        oscillator.start();
      });
    }

    if (soundId === 'hum') {
      const humGain = context.createGain();
      const pulse = trackNode(context.createOscillator());
      const pulseGain = context.createGain();
      const base = trackNode(context.createOscillator());
      const warmth = trackNode(context.createOscillator());

      humGain.gain.setValueAtTime(0.15, context.currentTime);
      pulse.type = 'sine';
      pulse.frequency.value = 0.18;
      pulseGain.gain.value = 0.045;
      base.type = 'sine';
      base.frequency.value = 136.1;
      warmth.type = 'triangle';
      warmth.frequency.value = 204.2;

      pulse.connect(pulseGain).connect(humGain.gain);
      base.connect(humGain);
      warmth.connect(humGain);
      humGain.connect(masterGain);
      [pulse, base, warmth].forEach((node) => node.start());
    }

    setActiveSound(soundId);
  }

  function stopSoundButton() {
    stopCalmSound();
    setActiveSound('');
  }

  return (
    <div className="calm-sound-panel">
      <div className="calm-sound-heading">
        <div>
          <p>{soundOff ? t('Sound is muted.') : (activeSound ? `${t(calmSoundOptions.find((option) => option.id === activeSound)?.label)} ${t('is playing.')}` : t('Pick a sound'))}</p>
        </div>
        <button className="secondary-button" type="button" onClick={stopSoundButton} disabled={!activeSound}>
          {t('Stop')}
        </button>
      </div>
      <div className="calm-sound-grid" aria-label="Relaxing sounds">
        {calmSoundOptions.map((option) => (
          <button
            key={option.id}
            type="button"
            className={activeSound === option.id ? 'calm-sound-option active' : 'calm-sound-option'}
            disabled={soundOff}
            onClick={() => startCalmSound(option.id)}
          >
            <strong>{t(option.label)}</strong>
            <span>{t(option.description)}</span>
          </button>
        ))}
      </div>
      <label className="calm-volume-control">
        {t('Volume')}
        <input
          type="range"
          min="0"
          max="0.7"
          step="0.01"
          value={volume}
          disabled={soundOff}
          onChange={(event) => setVolume(Number(event.target.value))}
        />
      </label>
    </div>
  );
}
