import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Check, ChevronRight, HeartHandshake, Leaf, MessageSquare, Puzzle, Users } from 'lucide-react';
import { useT } from '../data/translations.js';
import { VisualAsset } from '../components/VisualAsset.jsx';
import { asArray } from '../lib/collections.js';
import { activities, categoryLabels, learnedSkillActivityMap, learnSections } from '../data/appData.jsx';

export function getActivityDisplayTitle(activity) {
  return activity?.displayTitle || activity?.title || '';
}

export function CategoryPage({ category, profile, progress, soundOff, learnSection, onBack, onLearnSection, onLesson, onStart }) {
  const t = useT();
  const [showLearnedSkills, setShowLearnedSkills] = useState(false);
  const titles = {
    learn: ['Learn', <BookOpen key="i" />],
    daily: ['Daily Skills', <HeartHandshake key="i" />],
    speech: ['Communication', <MessageSquare key="i" />],
    social: ['Social Skills', <Users key="i" />],
    play: ['Games', <Puzzle key="i" />],
    calm: ['Calm Zone', <Leaf key="i" />]
  };
  const learnSectionTitles = {
    daily: ['Daily Skills', <HeartHandshake key="i" />],
    social: ['Social', <Users key="i" />],
    'numbers-letters': ['Numbers & Letters', <BookOpen key="i" />]
  };
  const activityCategory = category === 'learn'
    ? (learnSection === 'numbers-letters' ? 'learn' : learnSection || 'learn')
    : category;
  const pageTitle = category === 'learn' && learnSection ? learnSectionTitles[learnSection] : titles[category];
  const canReviewLearnedSkills = activityCategory === 'daily' && asArray(profile?.dailySkills).length > 0;
  const list = filterActivities(activityCategory, profile, showLearnedSkills);
  const completedSet = new Set(progress.completed);

  if (category === 'learn' && !learnSection) {
    return (
      <section>
        <div className="page-title">
          <button className="icon-button" onClick={onBack} aria-label={t('Go back')}><ArrowLeft /></button>
          <span className="round-icon"><BookOpen /></span>
          <div>
            <p className="eyebrow">{t('Learn activities')}</p>
            <h1>{t('Learn')}</h1>
          </div>
        </div>
        <div className="activity-grid learn-section-grid">
          {learnSections.map((section) => (
            <button
              key={section.id}
              type="button"
              className="activity-card learn-section-card"
              onClick={() => onLearnSection(section.id)}
            >
              <div className="activity-visual" aria-hidden="true">
                <VisualAsset label={section.icon} imageKey={section.icon} />
              </div>
              <div>
                <div className="activity-heading">
                  <h2>{t(section.title)}</h2>
                  <ChevronRight size={22} />
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className={category === 'calm' ? 'calm-zone-page' : undefined}>
      <div className="page-title">
        <button className="icon-button" onClick={onBack} aria-label={t('Go back')}><ArrowLeft /></button>
        <span className="round-icon">{pageTitle[1]}</span>
        <div>
          <p className="eyebrow">{t(category === 'learn' ? 'Learn activities' : `${categoryLabels[category]} activities`)}</p>
          <h1>{t(pageTitle[0])}</h1>
        </div>
      </div>
      {canReviewLearnedSkills && (
        <div className="activity-toolbar">
          <label className="toggle-row">
            <input
              type="checkbox"
              checked={showLearnedSkills}
              onChange={(event) => setShowLearnedSkills(event.target.checked)}
            />
            <span>{t('Show learned skills for practice')}</span>
          </label>
        </div>
      )}
      <div className="activity-grid">
        {list.map((activity) => {
          const completed = completedSet.has(activity.title);
          const isSocialActivity = activityCategory === 'social';
          const startActivity = activity.title === 'Tie Shoes' ? () => onLesson(activity) : () => onStart(activity);
          const activityDisplayTitle = getActivityDisplayTitle(activity);
          return (
            <button
              type="button"
              className={[
                'activity-card',
                'activity-start-card',
                isSocialActivity ? 'social-story-card' : '',
                completed ? 'completed' : ''
              ].filter(Boolean).join(' ')}
              key={activity.title}
              onClick={startActivity}
              aria-label={t(activityDisplayTitle)}
            >
              <div className="activity-visual" aria-hidden="true">
                <VisualAsset label={activity.icon} imageKey={activity.title === 'Calm Sounds' ? activity.icon : activity.title} />
              </div>
              <div>
                <div className="activity-heading">
                  <h2>{t(activityDisplayTitle)}</h2>
                  {completed && <span className="done-badge"><Check size={15} /> {t('Complete')}</span>}
                </div>
                {isSocialActivity && activity.storyTitle && <strong className="activity-story-title">{t(activity.storyTitle)}</strong>}
                {activity.title === 'Calm Sounds' && soundOff && <span className="pill">{t('Quiet mode')}</span>}
              </div>
              <span className="primary-button activity-card-action" aria-hidden="true">
                {t(completed ? 'Practice again' : isSocialActivity ? 'Start story' : 'Start')}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}


function filterActivities(category, profile, includeLearned = false) {
  if (category === 'daily' && !includeLearned) {
    const learnedActivityTitles = new Set(
      asArray(profile?.dailySkills).flatMap((skill) => learnedSkillActivityMap[skill] || [])
    );
    return activities.daily.filter((activity) => !learnedActivityTitles.has(activity.title));
  }
  if (category !== 'learn') return activities[category];
  return activities.learn.filter((activity) => {
    if (profile?.letters === 'Does not recognize letters' && activity.level === 'word') return false;
    return true;
  });
}
