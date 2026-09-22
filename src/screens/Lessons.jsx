import React, { useContext, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ChevronRight, HeartHandshake, ListChecks, Pause, Play, RotateCcw, Star, Volume2 } from 'lucide-react';
import { LanguageContext, useT } from '../data/translations.js';
import { speak } from '../lib/speech.js';
import { VisualAsset } from '../components/VisualAsset.jsx';
import { lessonSteps, shoeLessonIntro } from '../data/appData.jsx';
import { MediaToggle } from './MediaToggle.jsx';

export function ShoeLesson({ onBack, onComplete }) {
  const t = useT();
  const language = useContext(LanguageContext);
  const [step, setStep] = useState(0);
  const [mediaMode, setMediaMode] = useState('images');
  const [videoPlaying, setVideoPlaying] = useState(false);
  const narrationRunRef = useRef(0);
  const narrationTimerRef = useRef(null);
  const videoTimerRef = useRef(null);
  const current = lessonSteps[step];

  useEffect(() => () => {
    narrationRunRef.current += 1;
    window.clearTimeout(narrationTimerRef.current);
    window.clearInterval(videoTimerRef.current);
    window.speechSynthesis?.cancel();
  }, []);

  useEffect(() => {
    window.clearInterval(videoTimerRef.current);
    if (mediaMode !== 'videos' || !videoPlaying) return undefined;

    videoTimerRef.current = window.setInterval(() => {
      setStep((currentStep) => {
        if (currentStep >= lessonSteps.length - 1) {
          setVideoPlaying(false);
          window.clearInterval(videoTimerRef.current);
          return currentStep;
        }
        return currentStep + 1;
      });
    }, 1300);

    return () => window.clearInterval(videoTimerRef.current);
  }, [mediaMode, videoPlaying]);

  function stopNarration() {
    narrationRunRef.current += 1;
    window.clearTimeout(narrationTimerRef.current);
    window.speechSynthesis?.cancel();
  }

  function changeMediaMode(nextMode) {
    stopNarration();
    setMediaMode(nextMode);
    setVideoPlaying(nextMode === 'videos');
  }

  function speakText(text, options = {}) {
    return speak(text, language, false, { rate: 0.82, pitch: 1.03, ...options });
  }

  function speakCurrentStep() {
    stopNarration();
    speakText(`${t('Step')} ${step + 1}. ${t(current.title)}. ${t(current.text)}`);
  }

  function speakAllSteps() {
    const runId = narrationRunRef.current + 1;
    narrationRunRef.current = runId;
    window.clearTimeout(narrationTimerRef.current);
    setMediaMode('images');

    function playStep(index) {
      if (narrationRunRef.current !== runId || index >= lessonSteps.length) return;
      const item = lessonSteps[index];
      setStep(index);
      const intro = index === 0 ? `${t(shoeLessonIntro)} ` : '';
      const narrationText = `${intro}${t('Step')} ${index + 1}. ${t(item.title)}. ${t(item.text)}`;
      let movedNext = false;
      const goToNextStep = () => {
        if (movedNext || narrationRunRef.current !== runId) return;
        movedNext = true;
        window.clearTimeout(narrationTimerRef.current);
        playStep(index + 1);
      };
      const started = speakText(narrationText, {
        onEnd: goToNextStep,
        onError: () => {
          if (narrationRunRef.current === runId) goToNextStep();
        }
      });
      if (!started) {
        narrationTimerRef.current = window.setTimeout(goToNextStep, 900);
        return;
      }
      const wordCount = narrationText.trim().split(/\s+/).length;
      const fallbackDelay = Math.max(1800, Math.min(5200, wordCount * 420));
      narrationTimerRef.current = window.setTimeout(goToNextStep, fallbackDelay);
    }

    playStep(0);
  }

  return (
    <section className="lesson">
      <div className="page-title">
        <button className="icon-button" onClick={onBack} aria-label={t('Back to daily skills')}><ArrowLeft /></button>
        <span className="round-icon"><HeartHandshake /></span>
        <h1>{t('Tie Shoes')}</h1>
        <MediaToggle value={mediaMode} onChange={changeMediaMode} />
      </div>

      <div className={`lesson-stage lesson-stage-${mediaMode}`}>
        {mediaMode === 'videos' ? (
          <div className="lesson-video-demo">
            <div className="lesson-video-stage" aria-label={t('Animated example')}>
              <VisualAsset label={current.visual} className="lesson-video-image" />
              <span className="lesson-video-step-badge">{step + 1}</span>
            </div>
            <div className="lesson-video-controls">
              <button
                className="primary-button"
                type="button"
                onClick={() => setVideoPlaying((value) => !value)}
              >
                {videoPlaying ? <Pause size={18} /> : <Play size={18} />}
                {t(videoPlaying ? 'Pause demo' : 'Play demo')}
              </button>
              <button
                className="secondary-button"
                type="button"
                onClick={() => {
                  setStep(0);
                  setVideoPlaying(true);
                }}
              >
                <RotateCcw size={18} /> {t('Replay demo')}
              </button>
            </div>
            <div className="lesson-video-board" aria-label={t('Tie shoes steps')}>
              {lessonSteps.map((item, index) => (
                <button
                  key={item.title}
                  type="button"
                  className={index === step ? 'video-step-card active' : 'video-step-card'}
                  onClick={() => {
                    setStep(index);
                    setVideoPlaying(false);
                  }}
                  aria-label={`${t('Show step')} ${index + 1}: ${t(item.title)}`}
                >
                  <VisualAsset label={item.visual} className="video-step-image" />
                  <span>{index + 1}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="lesson-visual">
            <VisualAsset label={current.visual} className="lesson-image" />
          </div>
        )}

        <div className="lesson-copy">
          <p className="eyebrow">{t('Step')} {step + 1} {t('of')} {lessonSteps.length}</p>
          <h2>{t(current.title)}</h2>
          <p>{t(current.text)}</p>

          {mediaMode === 'images' && (
            <>
              <p className="lesson-helper">{t('Look at the picture, then try the same movement with real laces.')}</p>
              <div className="lesson-audio-panel">
                <button className="secondary-button" type="button" onClick={speakCurrentStep}>
                  <Volume2 size={18} /> {t('Hear this step')}
                </button>
                <button className="secondary-button" type="button" onClick={speakAllSteps}>
                  <ListChecks size={18} /> {t('Hear all steps')}
                </button>
              </div>
            </>
          )}

          {mediaMode === 'videos' && (
            <p className="lesson-helper">{t('Watch the pictures change like a short video, or tap a frame to pause on that step.')}</p>
          )}

          {mediaMode === 'steps' && (
            <div className="lesson-step-list" aria-label={t('Tie shoes steps')}>
              {lessonSteps.map((item, index) => (
                <button
                  key={item.title}
                  type="button"
                  className={index === step ? 'lesson-step-item active' : (index < step ? 'lesson-step-item done' : 'lesson-step-item')}
                  onClick={() => setStep(index)}
                >
                  <span>{index + 1}</span>
                  <strong>{t(item.title)}</strong>
                  <small>{t(item.text)}</small>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="step-dots" aria-label={t('Lesson progress')}>
        {lessonSteps.map((item, index) => <span key={item.title} className={index <= step ? 'active' : ''} />)}
      </div>
      <div className="form-actions">
        <button className="secondary-button" onClick={() => setStep(Math.max(0, step - 1))}><ArrowLeft size={18} /> {t('Back')}</button>
        {step < lessonSteps.length - 1 ? (
          <button className="primary-button" onClick={() => setStep(step + 1)}>{t('Next')} <ChevronRight size={18} /></button>
        ) : (
          <button className="primary-button" onClick={onComplete}><Star size={18} /> {t('Complete')}</button>
        )}
      </div>
    </section>
  );
}
