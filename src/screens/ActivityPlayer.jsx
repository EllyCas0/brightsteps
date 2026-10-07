import React, { lazy, Suspense } from 'react';
import { useT } from '../data/translations.js';
import { speechBoards, guidedActivities } from '../data/appData.jsx';

const CalmSoundActivity = lazy(() => import('../components/calm/CalmSounds.jsx').then((module) => ({ default: module.CalmSoundActivity })));
const SensoryPlayActivity = lazy(() => import('./Calm.jsx').then((module) => ({ default: module.SensoryPlayActivity })));
const SpeechBoard = lazy(() => import('./Communication.jsx').then((module) => ({ default: module.SpeechBoard })));
const MatchGame = lazy(() => import('./Games.jsx').then((module) => ({ default: module.MatchGame })));
const MemoryGame = lazy(() => import('./Games.jsx').then((module) => ({ default: module.MemoryGame })));
const GuidedActivity = lazy(() => import('./GuidedActivities.jsx').then((module) => ({ default: module.GuidedActivity })));
const SocialStory = lazy(() => import('./GuidedActivities.jsx').then((module) => ({ default: module.SocialStory })));

function ActivityLoading() {
  const t = useT();
  return (
    <section className="game-page">
      <div className="game-panel loading-panel" aria-live="polite">
        <p>{t('Loading...')}</p>
      </div>
    </section>
  );
}

export function ActivityPlayer({ activity, profile, soundOff, onBack, onComplete, onNextStory }) {
  let activityView;

  if (activity.title === 'Calm Sounds') {
    activityView = <CalmSoundActivity activity={activity} soundOff={soundOff} onBack={onBack} />;
  } else if (activity.title === 'Sensory Play') {
    activityView = <SensoryPlayActivity activity={activity} soundOff={soundOff} onBack={onBack} onComplete={onComplete} />;
  } else if (activity.category === 'speech' && speechBoards[activity.title]) {
    activityView = <SpeechBoard activity={activity} board={speechBoards[activity.title]} profile={profile} soundOff={soundOff} onBack={onBack} onComplete={onComplete} />;
  } else if (activity.category === 'social' && guidedActivities[activity.title]?.type === 'social-story') {
    activityView = <SocialStory activity={activity} config={guidedActivities[activity.title]} soundOff={soundOff} onBack={onBack} onComplete={onComplete} onNextStory={onNextStory} />;
  } else if (activity.title === 'Memory Cards') {
    activityView = <MemoryGame activity={activity} profile={profile} soundOff={soundOff} onBack={onBack} onComplete={onComplete} />;
  } else if (guidedActivities[activity.title]) {
    activityView = <GuidedActivity activity={activity} config={guidedActivities[activity.title]} soundOff={soundOff} onBack={onBack} onComplete={onComplete} onNextStory={onNextStory} />;
  } else {
    activityView = <MatchGame activity={activity} profile={profile} soundOff={soundOff} onBack={onBack} onComplete={onComplete} />;
  }

  return (
    <Suspense fallback={<ActivityLoading />}>
      {activityView}
    </Suspense>
  );
}
