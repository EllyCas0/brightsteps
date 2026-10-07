import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, RotateCcw, Sparkles, Star } from 'lucide-react';
import { useT } from '../data/translations.js';
import { getActivityDisplayTitle } from './Categories.jsx';

const sensoryBubbleSeeds = [
  { id: 1, x: 12, y: 18, size: 74, color: '#84d9ff' },
  { id: 2, x: 32, y: 34, size: 92, color: '#c9f27c' },
  { id: 3, x: 58, y: 18, size: 68, color: '#ffcf70' },
  { id: 4, x: 78, y: 40, size: 104, color: '#f6a6ff' },
  { id: 5, x: 20, y: 68, size: 98, color: '#8ef0d1' },
  { id: 6, x: 48, y: 64, size: 78, color: '#9fb9ff' },
  { id: 7, x: 72, y: 72, size: 86, color: '#ff9aa2' }
];

const sensoryWaveColors = ['#74d6ff', '#a7f070', '#ffd166', '#f8a5ff', '#8ef0d1', '#b5a7ff'];

export function SensoryPlayActivity({ activity, soundOff, onBack, onComplete }) {
  const t = useT();
  const [mode, setMode] = useState('bubbles');
  const [bubbles, setBubbles] = useState(sensoryBubbleSeeds);
  const [waves, setWaves] = useState([]);
  const [waveSize, setWaveSize] = useState(190);
  const [waveDuration, setWaveDuration] = useState(2.4);
  const [waveAmount, setWaveAmount] = useState(1);
  const bubblePopAudioRef = useRef({ context: null, nodes: [] });
  const poppedBubbleIdsRef = useRef(new Set());
  const pendingWaveRef = useRef(null);
  const waveFrameRef = useRef(null);

  useEffect(() => () => {
    if (waveFrameRef.current) window.cancelAnimationFrame(waveFrameRef.current);
    stopBubblePopAudio();
  }, []);

  function resetBubbles() {
    poppedBubbleIdsRef.current.clear();
    setBubbles(sensoryBubbleSeeds);
  }

  function ensureBubblePopContext() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return null;
    if (!bubblePopAudioRef.current.context || bubblePopAudioRef.current.context.state === 'closed') {
      bubblePopAudioRef.current.context = new AudioContext();
    }
    if (bubblePopAudioRef.current.context.state === 'suspended') {
      bubblePopAudioRef.current.context.resume();
    }
    return bubblePopAudioRef.current.context;
  }

  function trackBubblePopNode(node) {
    bubblePopAudioRef.current.nodes.push(node);
    return node;
  }

  function stopBubblePopAudio() {
    bubblePopAudioRef.current.nodes.forEach((node) => {
      try {
        node.stop?.();
      } catch {
        // Bubble pop nodes may already be stopped.
      }
      node.disconnect?.();
    });
    bubblePopAudioRef.current = { ...bubblePopAudioRef.current, nodes: [] };
  }

  function makeBubblePopNoise(context) {
    const buffer = context.createBuffer(1, Math.floor(context.sampleRate * 0.08), context.sampleRate);
    const data = buffer.getChannelData(0);
    for (let index = 0; index < data.length; index += 1) {
      data[index] = (Math.random() * 2 - 1) * (1 - index / data.length);
    }
    const source = trackBubblePopNode(context.createBufferSource());
    source.buffer = buffer;
    return source;
  }

  function playBubblePop() {
    if (soundOff) return;
    const context = ensureBubblePopContext();
    if (!context) return;

    const startAt = context.currentTime + 0.01;
    const output = trackBubblePopNode(context.createGain());
    const popTone = trackBubblePopNode(context.createOscillator());
    const toneGain = context.createGain();
    const noise = makeBubblePopNoise(context);
    const noiseFilter = context.createBiquadFilter();
    const noiseGain = context.createGain();

    output.gain.setValueAtTime(0.28, startAt);
    popTone.type = 'sine';
    popTone.frequency.setValueAtTime(760, startAt);
    popTone.frequency.exponentialRampToValueAtTime(1260, startAt + 0.055);
    toneGain.gain.setValueAtTime(0.0001, startAt);
    toneGain.gain.exponentialRampToValueAtTime(0.12, startAt + 0.008);
    toneGain.gain.exponentialRampToValueAtTime(0.0001, startAt + 0.11);

    noiseFilter.type = 'highpass';
    noiseFilter.frequency.value = 1200;
    noiseGain.gain.setValueAtTime(0.09, startAt);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, startAt + 0.075);

    popTone.connect(toneGain).connect(output);
    noise.connect(noiseFilter).connect(noiseGain).connect(output);
    output.connect(context.destination);
    popTone.start(startAt);
    popTone.stop(startAt + 0.13);
    noise.start(startAt);
    noise.stop(startAt + 0.085);

    window.setTimeout(() => {
      [output, popTone, toneGain, noise, noiseFilter, noiseGain].forEach((node) => node.disconnect?.());
      bubblePopAudioRef.current.nodes = bubblePopAudioRef.current.nodes.filter((node) => node !== output && node !== popTone && node !== noise);
    }, 220);
  }

  function popBubble(id) {
    if (poppedBubbleIdsRef.current.has(id)) return;
    poppedBubbleIdsRef.current.add(id);
    playBubblePop();
    setBubbles((current) => current.filter((bubble) => bubble.id !== id));
  }

  function handleBubblePointerDown(event, id) {
    event.preventDefault();
    event.stopPropagation();
    popBubble(id);
  }

  function commitPendingWave() {
    const wavePoint = pendingWaveRef.current;
    pendingWaveRef.current = null;
    waveFrameRef.current = null;
    if (!wavePoint) return;

    const newWaves = Array.from({ length: waveAmount }, (_, index) => {
      const spread = waveAmount === 1 ? 0 : 24;
      return {
        id: `${Date.now()}-${index}-${Math.random()}`,
        x: wavePoint.x + (Math.random() - 0.5) * spread,
        y: wavePoint.y + (Math.random() - 0.5) * spread,
        size: waveSize + Math.random() * 18,
        duration: waveDuration,
        color: sensoryWaveColors[Math.floor(Math.random() * sensoryWaveColors.length)]
      };
    });
    setWaves((current) => [...current.slice(-(10 - waveAmount)), ...newWaves]);
  }

  function addWave(event) {
    if (mode !== 'waves') return;
    const rect = event.currentTarget.getBoundingClientRect();
    pendingWaveRef.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
    if (!waveFrameRef.current) {
      waveFrameRef.current = window.requestAnimationFrame(commitPendingWave);
    }
  }

  function clearWaves() {
    setWaves([]);
  }

  return (
    <section className="game-page calm-zone-page sensory-play-page">
      <div className="page-title">
        <button className="icon-button" onClick={onBack} aria-label={t('Go back')}><ArrowLeft /></button>
        <span className="round-icon"><Sparkles /></span>
        <div>
          <p className="eyebrow">{t('Calm activities')}</p>
          <h1>{t(getActivityDisplayTitle(activity))}</h1>
        </div>
      </div>

      <div className="sensory-mode-bar" aria-label={t('Sensory play modes')}>
        <button type="button" className={mode === 'bubbles' ? 'active' : ''} onClick={() => setMode('bubbles')}>
          {t('Pop bubbles')}
        </button>
        <button type="button" className={mode === 'waves' ? 'active' : ''} onClick={() => setMode('waves')}>
          {t('Color waves')}
        </button>
      </div>

      {mode === 'waves' && (
        <div className="sensory-wave-controls" aria-label={t('Color waves')}>
          <label>
            <span>{t('Wave size')}</span>
            <input type="range" min="120" max="300" step="10" value={waveSize} onChange={(event) => setWaveSize(Number(event.target.value))} />
          </label>
          <label>
            <span>{t('Wave speed')}</span>
            <input type="range" min="1.4" max="3.8" step="0.05" value={waveDuration} onChange={(event) => setWaveDuration(Number(event.target.value))} />
          </label>
          <label>
            <span>{t('Wave amount')}</span>
            <input type="range" min="1" max="2" step="1" value={waveAmount} onChange={(event) => setWaveAmount(Number(event.target.value))} />
          </label>
        </div>
      )}

      <div
        className={mode === 'bubbles' ? 'sensory-play-surface bubbles-mode' : 'sensory-play-surface waves-mode'}
        onPointerMove={addWave}
      >
        {mode === 'bubbles' ? (
          bubbles.length ? bubbles.map((bubble) => (
            <button
              key={bubble.id}
              type="button"
              className="sensory-bubble"
              style={{ left: `${bubble.x}%`, top: `${bubble.y}%`, width: bubble.size, height: bubble.size, '--bubble-color': bubble.color }}
              aria-label={t('Pop bubble')}
              onPointerDown={(event) => handleBubblePointerDown(event, bubble.id)}
              onClick={() => popBubble(bubble.id)}
            />
          )) : (
            <button type="button" className="sensory-reset-card" onClick={resetBubbles}>
              {t('More bubbles')}
            </button>
          )
        ) : (
          waves.map((wave) => (
            <span
              key={wave.id}
              className="sensory-wave"
              style={{ left: wave.x, top: wave.y, '--wave-color': wave.color, '--wave-size': `${wave.size}px`, '--wave-duration': `${wave.duration}s` }}
              aria-hidden="true"
            />
          ))
        )}
      </div>

      <div className="form-actions">
        <button className="secondary-button" type="button" onClick={mode === 'bubbles' ? resetBubbles : clearWaves}>
          <RotateCcw size={18} /> {t('Reset')}
        </button>
        <button className="primary-button" type="button" onClick={onComplete}>
          <Star size={18} /> {t('Finish')}
        </button>
      </div>
    </section>
  );
}
