import React, { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Home,
  Leaf,
  Lock,
  Volume2,
  VolumeX
} from 'lucide-react';
import {
  LanguageContext,
  translateText
} from './data/translations.js';
import {
  ACTIVE_PROFILE_KEY,
  BACKGROUND_TOPIC_KEY,
  LANGUAGE_KEY,
  PROFILES_KEY,
  PROGRESS_KEY,
  STORAGE_KEY,
  getCalendarDayDiff,
  getTodayKey,
  loadJson,
  loadText,
  saveJson,
  saveText
} from './lib/storage.js';
import { LanguageSwitcher } from './components/LanguageSwitcher.jsx';
import { asArray, asChoiceArray } from './lib/collections.js';
import {
  normalizeMyVoiceSettings
} from './data/communication.js';
import {
  defaultProfile,
  defaultProgress,
  getMoodAvatar,
  normalizeAvatar,
  normalizeSupportLevel
} from './data/profileCore.js';
import { NavButton } from './screens/Navigation.jsx';
import './styles.css';

const BackgroundTopicPicker = lazy(() => import('./components/ProfileControls.jsx').then((module) => ({ default: module.BackgroundTopicPicker })));
const ChildHome = lazy(() => import('./screens/Home.jsx').then((module) => ({ default: module.ChildHome })));
const Celebration = lazy(() => import('./screens/Home.jsx').then((module) => ({ default: module.Celebration })));
const ActivityPlayer = lazy(() => import('./screens/ActivityPlayer.jsx').then((module) => ({ default: module.ActivityPlayer })));
const CategoryPage = lazy(() => import('./screens/Categories.jsx').then((module) => ({ default: module.CategoryPage })));
const ShoeLesson = lazy(() => import('./screens/Lessons.jsx').then((module) => ({ default: module.ShoeLesson })));
const Onboarding = lazy(() => import('./components/ProfileSetup.jsx').then((module) => ({ default: module.Onboarding })));
const ChildAvatarSetup = lazy(() => import('./components/ProfileSetup.jsx').then((module) => ({ default: module.ChildAvatarSetup })));
const ParentDashboard = lazy(() => import('./components/ParentDashboard.jsx').then((module) => ({ default: module.ParentDashboard })));
const ParentGate = lazy(() => import('./components/ParentDashboard.jsx').then((module) => ({ default: module.ParentGate })));

const socialStoryTitles = ['Say Hello', 'Take Turns', 'Share Toys', 'Copy Movements', 'Feelings', 'Faces'];
const myVoiceActivity = { title: 'My Voice', icon: 'Speech Board', detail: 'Tap picture words to speak a clear message' };

function hasChoiceText(values, text) {
  const terms = text === 'AAC' || text === 'CAA' ? ['AAC', 'CAA'] : [text];
  return asChoiceArray(values).some((value) => terms.some((term) => value.includes(term)));
}

function formatChoiceList(values, translate = (value) => value) {
  const list = asChoiceArray(values);
  return list.length ? list.map((value) => translate(value)).join(', ') : translate('Not set');
}

function createProfileId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `child-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function normalizeProfile(saved) {
  if (!saved || typeof saved !== 'object') return null;
  const objectives = asArray(saved.objectives).map((objective) => (
    objective === 'Numbers and problem solving' ? 'Numbers and logic' : objective
  ));
  return {
    ...defaultProfile,
    ...saved,
    id: saved.id || createProfileId(),
    avatar: normalizeAvatar(saved.avatar),
    supportLevel: normalizeSupportLevel(saved.supportLevel),
    communication: asChoiceArray(saved.communication),
    sensory: asArray(saved.sensory),
    dailySkills: asArray(saved.dailySkills),
    objectives,
    learningStyle: asArray(saved.learningStyle, defaultProfile.learningStyle),
    interests: asArray(saved.interests),
    myVoice: normalizeMyVoiceSettings(saved.myVoice),
    diagnosisConfirmed: Boolean(saved.diagnosisConfirmed)
  };
}

function loadProfiles() {
  const savedProfiles = asArray(loadJson(PROFILES_KEY, []))
    .map((item) => normalizeProfile(item))
    .filter(Boolean);
  if (savedProfiles.length) return savedProfiles;
  const legacyProfile = normalizeProfile(loadJson(STORAGE_KEY, null));
  return legacyProfile ? [legacyProfile] : [];
}

function getInitialProfileState() {
  const profiles = loadProfiles();
  const activeId = loadText(ACTIVE_PROFILE_KEY);
  const profile = profiles.find((item) => item.id === activeId) || profiles[0] || null;
  return { profiles, profile };
}

function getProgressStorageKey(profileId) {
  return profileId ? `${PROGRESS_KEY}-${profileId}` : PROGRESS_KEY;
}

function normalizeProgress(saved) {
  const todayKey = getTodayKey();
  const lastActiveDate = saved?.lastActiveDate || todayKey;
  const dayDiff = getCalendarDayDiff(lastActiveDate, todayKey);
  const isNewDay = dayDiff > 0;
  const savedStreak = Number.isFinite(saved?.streak) ? saved.streak : defaultProgress.streak;
  const streak = isNewDay
    ? (dayDiff === 1 && saved?.todayDone ? savedStreak + 1 : 0)
    : savedStreak;
  const hasActivityHistory = Boolean(
    saved?.hasSeenHome
    || asArray(saved?.completed).length
    || asArray(saved?.practiced).length
    || asArray(saved?.moodLog).length
    || asArray(saved?.todayActivities).length
    || asArray(saved?.badges).length
  );
  return {
    ...defaultProgress,
    ...saved,
    completed: asArray(saved?.completed, defaultProgress.completed),
    practiced: asArray(saved?.practiced, defaultProgress.practiced),
    counts: { ...defaultProgress.counts, ...(saved?.counts || {}) },
    moodLog: asArray(saved?.moodLog, defaultProgress.moodLog),
    rewardStars: Number.isFinite(saved?.rewardStars) ? saved.rewardStars : defaultProgress.rewardStars,
    todayDone: isNewDay ? false : Boolean(saved?.todayDone),
    dailyGoal: Number.isFinite(saved?.dailyGoal) && saved.dailyGoal > 0 ? saved.dailyGoal : defaultProgress.dailyGoal,
    todayActivities: isNewDay ? [] : asArray(saved?.todayActivities, defaultProgress.todayActivities),
    badges: asArray(saved?.badges, defaultProgress.badges),
    streak,
    hasSeenHome: hasActivityHistory,
    lastActiveDate: todayKey
  };
}

function getPersonalization(profile) {
  if (!profile) return [];
  const notes = [];
  if (profile.letters === 'Does not recognize letters') notes.push('Start with visual letter matching.');
  if (profile.letters !== 'Does not recognize letters') notes.push('Include simple word play.');
  if (profile.letters === 'Can read fluently') notes.push('Offer short reading choices with clear visuals.');
  if (hasChoiceText(profile.communication, 'AAC') || hasChoiceText(profile.communication, 'picture') || hasChoiceText(profile.communication, 'Very limited')) {
    notes.push('Show visual choices and AAC-style buttons.');
  }
  if (asArray(profile.objectives).includes('Attention and following directions')) notes.push('Try joint attention and one-step directions.');
  if (asArray(profile.objectives).includes('Self-care routines')) notes.push('Practice hands, teeth, dressing, bathroom, and bedtime.');
  if (asArray(profile.learningStyle).includes('Images')) notes.push('Prioritize picture-first steps.');
  if (profile.supportLevel?.startsWith('Level 3')) notes.push('Use shorter activities with fewer choices.');
  return notes;
}

function LoadingSection({ language }) {
  return (
    <section className="loading-panel" aria-live="polite">
      <p>{translateText('Loading...', language)}</p>
    </section>
  );
}

function App() {
  const [{ profiles, profile }, setProfileState] = useState(getInitialProfileState);
  const [progress, setProgress] = useState(() => normalizeProgress(loadJson(getProgressStorageKey(profile?.id), loadJson(PROGRESS_KEY, defaultProgress))));
  const [screen, setScreen] = useState(profile ? 'home' : 'onboarding');
  const [parentUnlocked, setParentUnlocked] = useState(false);
  const [soundOff, setSoundOff] = useState(false);
  const [activeActivity, setActiveActivity] = useState(null);
  const [learnSection, setLearnSection] = useState(null);
  const [celebration, setCelebration] = useState(null);
  const [profileDraft, setProfileDraft] = useState(undefined);
  const [welcomeProfileId, setWelcomeProfileId] = useState(null);
  const [backgroundTopicId, setBackgroundTopicId] = useState(() => loadText(BACKGROUND_TOPIC_KEY) || '');
  const [backgroundTopic, setBackgroundTopic] = useState(null);
  const [language, setLanguage] = useState(() => loadText(LANGUAGE_KEY) || 'en');

  const personalization = useMemo(() => getPersonalization(profile), [profile]);
  const activeAvatar = getMoodAvatar(progress.moodLog[0]?.mood, profile?.avatar);
  const activeSocialIndex = activeActivity?.category === 'social'
    ? socialStoryTitles.indexOf(activeActivity.title)
    : -1;
  const hasNextSocialStory = activeSocialIndex >= 0 && activeSocialIndex < socialStoryTitles.length - 1;

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [screen]);

  useEffect(() => {
    let isCurrent = true;
    if (!backgroundTopicId) {
      setBackgroundTopic(null);
      return () => {
        isCurrent = false;
      };
    }

    import('./data/backgroundTopics.jsx').then(({ getBackgroundTopic }) => {
      if (isCurrent) setBackgroundTopic(getBackgroundTopic(backgroundTopicId));
    });

    return () => {
      isCurrent = false;
    };
  }, [backgroundTopicId]);

  useEffect(() => {
    if (!profile) return undefined;

    const intervalId = window.setInterval(() => {
      setProgress((current) => {
        const next = normalizeProgress(current);
        if (next.lastActiveDate === current.lastActiveDate) return current;
        saveJson(getProgressStorageKey(profile?.id), next);
        return next;
      });
    }, 60000);

    return () => window.clearInterval(intervalId);
  }, [profile?.id]);

  useEffect(() => {
    if (screen !== 'home') {
      setWelcomeProfileId(null);
      return;
    }
    if (!profile || progress.hasSeenHome) return;
    setWelcomeProfileId(profile.id);
    const next = { ...progress, hasSeenHome: true };
    setProgress(next);
    saveJson(getProgressStorageKey(profile.id), next);
  }, [screen, profile?.id, progress.hasSeenHome]);

  function persistActiveProfile(nextProfile, nextProfiles) {
    setProfileState({ profiles: nextProfiles, profile: nextProfile });
    setSoundOff(false);
    saveJson(PROFILES_KEY, nextProfiles);
    saveJson(STORAGE_KEY, nextProfile);
    saveText(ACTIVE_PROFILE_KEY, nextProfile.id);
  }

  function saveProgress(next) {
    saveJson(getProgressStorageKey(profile?.id), next);
  }

  function completeActivity(name, category, options = {}) {
    const { showCelebration = true } = options;
    const currentProgress = normalizeProgress(progress);
    const nextTodayActivities = Array.from(new Set([...currentProgress.todayActivities, name]));
    const earnedBadges = [...currentProgress.badges];
    if (category === 'calm' && !earnedBadges.includes('Calm Helper')) {
      earnedBadges.push('Calm Helper');
    }
    if (nextTodayActivities.length === 1 && !earnedBadges.includes('First Step')) {
      earnedBadges.push('First Step');
    }
    const next = {
      ...currentProgress,
      completed: Array.from(new Set([...currentProgress.completed, name])),
      practiced: Array.from(new Set([...currentProgress.practiced, name])),
      counts: { ...currentProgress.counts, [category]: (currentProgress.counts[category] || 0) + 1 },
      rewardStars: currentProgress.rewardStars + 2,
      todayActivities: nextTodayActivities,
      todayDone: nextTodayActivities.length >= currentProgress.dailyGoal,
      badges: earnedBadges,
      lastActiveDate: getTodayKey()
    };
    setProgress(next);
    saveProgress(next);
    if (showCelebration) {
      setCelebration({
        title: 'Great job!',
        message: `${name} is complete.`,
        stars: 2,
        badge: earnedBadges.length > currentProgress.badges.length ? earnedBadges[earnedBadges.length - 1] : null,
        completeCount: nextTodayActivities.length,
        goal: currentProgress.dailyGoal
      });
      setScreen('celebration');
    }
  }

  async function openNextSocialStory() {
    if (!activeActivity || activeActivity.category !== 'social') return;
    const currentIndex = socialStoryTitles.indexOf(activeActivity.title);
    const nextTitle = socialStoryTitles[currentIndex + 1];
    const { activities } = await import('./data/appData.jsx');
    const nextActivity = activities.social.find((activity) => activity.title === nextTitle);
    if (!nextActivity) {
      setScreen('social');
      return;
    }
    setActiveActivity({ ...nextActivity, category: 'social' });
    setScreen('activity');
  }

  function handleQuickChoice(choice) {
    const currentProgress = normalizeProgress(progress);
    const now = new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    const updates = {
      happy: {
        moodLog: [{ mood: 'Happy', time: now }, ...currentProgress.moodLog].slice(0, 5),
        rewardStars: currentProgress.rewardStars + 1,
        lastActiveDate: getTodayKey()
      }
    };
    const next = { ...currentProgress, ...updates[choice] };
    setProgress(next);
    saveProgress(next);
  }

  function handleMoodChoice(mood) {
    const currentProgress = normalizeProgress(progress);
    const now = new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    const next = {
      ...currentProgress,
      moodLog: [{ mood, time: now }, ...currentProgress.moodLog].slice(0, 5),
      rewardStars: currentProgress.rewardStars + 1,
      lastActiveDate: getTodayKey()
    };
    setProgress(next);
    saveProgress(next);
  }

  function handleProfile(nextProfile) {
    const normalizedProfile = normalizeProfile(nextProfile);
    const exists = profiles.some((item) => item.id === normalizedProfile.id);
    const nextProfiles = exists
      ? profiles.map((item) => item.id === normalizedProfile.id ? normalizedProfile : item)
      : [...profiles, normalizedProfile];
    persistActiveProfile(normalizedProfile, nextProfiles);
    setProgress(normalizeProgress(loadJson(getProgressStorageKey(normalizedProfile.id), defaultProgress)));
    setProfileDraft(undefined);
    setScreen(exists ? 'home' : 'avatar');
  }

  function updateProfile(updates) {
    const normalizedProfile = normalizeProfile({ ...profile, ...updates });
    const nextProfiles = profiles.map((item) => item.id === normalizedProfile.id ? normalizedProfile : item);
    persistActiveProfile(normalizedProfile, nextProfiles);
  }

  function switchProfile(profileId) {
    const nextProfile = profiles.find((item) => item.id === profileId);
    if (!nextProfile) return;
    persistActiveProfile(nextProfile, profiles);
    setProgress(normalizeProgress(loadJson(getProgressStorageKey(nextProfile.id), defaultProgress)));
    setScreen('home');
  }

  function startNewProfile() {
    setProfileDraft(null);
    setScreen('onboarding');
  }

  function openSpeechTable() {
    setActiveActivity({ ...myVoiceActivity, category: 'speech', backScreen: 'home' });
    setScreen('activity');
  }

  function updateBackgroundTopic(topicId) {
    setBackgroundTopicId(topicId);
    saveText(BACKGROUND_TOPIC_KEY, topicId);
  }

  function updateLanguage(nextLanguage) {
    setLanguage(nextLanguage);
    saveText(LANGUAGE_KEY, nextLanguage);
  }

  if (screen === 'onboarding') {
    return (
      <LanguageContext.Provider value={language}>
        <Suspense fallback={<LoadingSection language={language} />}>
          <Onboarding
            onComplete={handleProfile}
            initialProfile={profileDraft === undefined ? profile : profileDraft}
            language={language}
            onLanguageChange={updateLanguage}
          />
        </Suspense>
      </LanguageContext.Provider>
    );
  }

  if (screen === 'avatar' && profile) {
    return (
      <LanguageContext.Provider value={language}>
        <Suspense fallback={<LoadingSection language={language} />}>
          <ChildAvatarSetup profile={profile} onChoose={(avatar) => {
            updateProfile({ avatar });
            setScreen('home');
          }} />
        </Suspense>
      </LanguageContext.Provider>
    );
  }

  return (
    <LanguageContext.Provider value={language}>
      <div
        className={backgroundTopic ? 'app-shell has-topic-background' : 'app-shell'}
        style={backgroundTopic ? {
          '--topic-background': `url(${backgroundTopic.image})`,
          '--topic-background-tint': backgroundTopic.tint
        } : undefined}
      >
        <header className="topbar">
          <div className="brand">
            <button className="brand-copy" type="button" onClick={() => setScreen('home')} aria-label={translateText('Go home', language)}>
              <strong>BrightSteps</strong>
            </button>
            <span className="deploy-version" aria-label="Deploy version 0.3.2">Deploy v0.3.2</span>
          </div>
          <div className="topbar-actions">
            <LanguageSwitcher value={language} onChange={updateLanguage} />
            <Suspense fallback={null}>
              <BackgroundTopicPicker
                value={backgroundTopicId}
                onChange={updateBackgroundTopic}
              />
            </Suspense>
            <button
              className="calm-header-button"
              type="button"
              onClick={() => setScreen('calm')}
              aria-label={translateText('Open Calm Zone', language)}
              title={translateText('Calm Zone', language)}
            >
              <Leaf size={18} />
              <span>{translateText('Calm Zone', language)}</span>
            </button>
            <button
              className="icon-button"
              onClick={() => setSoundOff((value) => !value)}
              aria-label={translateText(soundOff ? 'Enable sound' : 'Disable sound', language)}
              title={translateText(soundOff ? 'Enable sound' : 'Disable sound', language)}
            >
              {soundOff ? <VolumeX /> : <Volume2 />}
            </button>
          </div>
        </header>

        <main className="main-content">
        <Suspense fallback={<LoadingSection language={language} />}>
        {screen === 'home' && (
          <ChildHome
            profile={profile}
            activeAvatar={activeAvatar}
            progress={progress}
            isFirstHomeVisit={welcomeProfileId === profile?.id || !progress.hasSeenHome}
            soundOff={soundOff}
            setScreen={setScreen}
            onLearn={() => {
              setLearnSection(null);
              setScreen('learn');
            }}
            onChangeAvatar={() => setScreen('avatar')}
            onSpeechTable={openSpeechTable}
            onQuickChoice={handleQuickChoice}
            onMoodChoice={handleMoodChoice}
          />
        )}
        {['learn', 'daily', 'speech', 'social', 'play', 'calm'].includes(screen) && (
          <CategoryPage
            category={screen}
            profile={profile}
            progress={progress}
            soundOff={soundOff}
            learnSection={learnSection}
            onBack={() => {
              if (screen === 'learn' && learnSection) {
                setLearnSection(null);
                return;
              }
              setScreen('home');
            }}
            onLearnSection={setLearnSection}
            onLesson={(activity) => {
              setActiveActivity({ ...activity, category: 'daily', backScreen: 'learn' });
              setScreen('shoeLesson');
            }}
            onStart={(activity) => {
              const activityCategory = screen === 'learn'
                ? (learnSection === 'numbers-letters' ? 'learn' : learnSection || 'learn')
                : screen;
              setActiveActivity({ ...activity, category: activityCategory, backScreen: screen === 'learn' ? 'learn' : undefined });
              setScreen('activity');
            }}
          />
        )}
        {screen === 'activity' && activeActivity && (
          <ActivityPlayer
            activity={activeActivity}
            profile={profile}
            soundOff={soundOff}
            onBack={() => setScreen(activeActivity.backScreen || activeActivity.category)}
            onComplete={() => {
              completeActivity(activeActivity.title, activeActivity.category, {
                showCelebration: !['play', 'social'].includes(activeActivity.category)
              });
            }}
            onNextStory={hasNextSocialStory ? openNextSocialStory : undefined}
          />
        )}
        {screen === 'celebration' && celebration && (
          <Celebration
            celebration={celebration}
            onContinue={() => setScreen(activeActivity?.backScreen || activeActivity?.category || 'home')}
            onHome={() => setScreen('home')}
          />
        )}
        {screen === 'shoeLesson' && (
          <ShoeLesson
            onBack={() => setScreen('learn')}
            onComplete={() => {
              completeActivity('Tie Shoes', 'daily');
            }}
          />
        )}
        {screen === 'parents' && (
          parentUnlocked ? (
            <ParentDashboard
              profile={profile}
              profiles={profiles}
              progress={progress}
              personalization={personalization}
              onProfileChange={updateProfile}
              onSwitchProfile={switchProfile}
              onAddChild={startNewProfile}
              onEdit={() => {
                setProfileDraft(profile);
                setScreen('onboarding');
              }}
              onReset={() => {
                localStorage.removeItem(STORAGE_KEY);
                localStorage.removeItem(PROFILES_KEY);
                localStorage.removeItem(ACTIVE_PROFILE_KEY);
                localStorage.removeItem(PROGRESS_KEY);
                localStorage.removeItem(BACKGROUND_TOPIC_KEY);
                localStorage.removeItem(LANGUAGE_KEY);
                profiles.forEach((item) => localStorage.removeItem(getProgressStorageKey(item.id)));
                setProfileState({ profiles: [], profile: null });
                setProgress(normalizeProgress(defaultProgress));
                setParentUnlocked(false);
                setProfileDraft(undefined);
                setScreen('onboarding');
              }}
            />
          ) : (
            <ParentGate onUnlock={() => setParentUnlocked(true)} onBack={() => setScreen('home')} />
          )
        )}
        </Suspense>
        </main>

        <nav className="bottom-nav" aria-label={translateText('Main sections', language)}>
          <NavButton icon={<Home />} label="Home" active={screen === 'home'} onClick={() => setScreen('home')} />
          <NavButton icon={<Lock />} label="Parents" active={screen === 'parents'} onClick={() => setScreen('parents')} />
        </nav>
      </div>
    </LanguageContext.Provider>
  );
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
