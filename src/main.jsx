import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowLeft,
  Baby,
  Banana,
  Bed,
  Bone,
  BookOpen,
  Brain,
  Car,
  Cat as CatIcon,
  Check,
  ChevronRight,
  Clock,
  CupSoda,
  Delete,
  Droplets,
  Flame,
  Flower2,
  FileText,
  Hand,
  HeartHandshake,
  Home,
  Info,
  Image as ImageIcon,
  Languages,
  Leaf,
  ListChecks,
  Lock,
  LockKeyhole,
  KeyRound,
  MessageSquare,
  Minus,
  Moon,
  Palette,
  Pencil,
  Plus,
  Puzzle,
  RotateCcw,
  Rocket,
  Shield,
  Smile,
  Sparkles,
  Star,
  Trash2,
  Umbrella,
  Users,
  Video,
  Volume2,
  VolumeX
} from 'lucide-react';
import {
  LanguageContext,
  translateText,
  useT
} from './data/translations.js';
import {
  ACTIVE_PROFILE_KEY,
  BACKGROUND_TOPIC_KEY,
  BREATH_SOUND_IDLE_MS,
  LANGUAGE_KEY,
  PROFILES_KEY,
  PROGRESS_KEY,
  STORAGE_KEY,
  getCalendarDayDiff,
  getTodayKey,
  loadJson,
  loadText,
  resetLocalStateFromUrl,
  saveJson,
  saveText
} from './lib/storage.js';
import {
  Avatar,
  VisualAsset
} from './components/VisualAsset.jsx';
import { CalmSoundActivity } from './components/calm/CalmSounds.jsx';
import { ParentDashboard, ParentGate } from './components/ParentDashboard.jsx';
import {
  BackgroundTopicPicker,
  ChildAvatarSetup,
  LanguageSwitcher,
  Onboarding
} from './components/ProfileSetup.jsx';
import { asArray, asChoiceArray } from './lib/collections.js';
import {
  activities,
  activityGames,
  avatarOptions,
  backgroundTopics,
  categoryLabels,
  choiceSets,
  createMemoryDeck,
  defaultProfile,
  defaultProgress,
  getBackgroundTopic,
  getCommunicationOptions,
  getImageAsset,
  getMoodAvatar,
  guidedActivities,
  learnedSkillActivityMap,
  learnSections,
  lessonSteps,
  normalizeAvatar,
  normalizeSupportLevel,
  resources,
  shoeLessonIntro,
  shuffleCards,
  supportLevelDetails
} from './data/appData.jsx';
import './styles.css';

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
  const [language, setLanguage] = useState(() => loadText(LANGUAGE_KEY) || 'en');

  const personalization = useMemo(() => getPersonalization(profile), [profile]);
  const activeAvatar = getMoodAvatar(progress.moodLog[0]?.mood, profile?.avatar);
  const backgroundTopic = getBackgroundTopic(backgroundTopicId);
  const activeSocialIndex = activeActivity?.category === 'social'
    ? activities.social.findIndex((activity) => activity.title === activeActivity.title)
    : -1;
  const hasNextSocialStory = activeSocialIndex >= 0 && activeSocialIndex < activities.social.length - 1;

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [screen]);

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

  function openNextSocialStory() {
    if (!activeActivity || activeActivity.category !== 'social') return;
    const currentIndex = activities.social.findIndex((activity) => activity.title === activeActivity.title);
    const nextActivity = activities.social[currentIndex + 1];
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
    const speechTable = activities.speech.find((activity) => activity.title === 'My Voice');
    if (!speechTable) return;
    setActiveActivity({ ...speechTable, category: 'speech', backScreen: 'home' });
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
        <Onboarding
          onComplete={handleProfile}
          initialProfile={profileDraft === undefined ? profile : profileDraft}
          language={language}
          onLanguageChange={updateLanguage}
        />
      </LanguageContext.Provider>
    );
  }

  if (screen === 'avatar' && profile) {
    return <ChildAvatarSetup profile={profile} onChoose={(avatar) => {
      updateProfile({ avatar });
      setScreen('home');
    }} />;
  }

  return (
    <LanguageContext.Provider value={language}>
      <div
        className={backgroundTopic ? 'app-shell has-topic-background' : 'app-shell'}
        style={backgroundTopic ? { '--topic-background': `url(${backgroundTopic.image})` } : undefined}
      >
        <header className="topbar">
          <div className="brand">
            <button className="brand-copy" type="button" onClick={() => setScreen('home')} aria-label={translateText('Go home', language)}>
              <strong>BrightSteps</strong>
            </button>
          </div>
          <div className="topbar-actions">
            <LanguageSwitcher value={language} onChange={updateLanguage} />
            <BackgroundTopicPicker
              value={backgroundTopicId}
              onChange={updateBackgroundTopic}
            />
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
        </main>

        <nav className="bottom-nav" aria-label="Main sections">
          <NavButton icon={<Home />} label="Home" active={screen === 'home'} onClick={() => setScreen('home')} />
          <NavButton icon={<Lock />} label="Parents" active={screen === 'parents'} onClick={() => setScreen('parents')} />
        </nav>
      </div>
    </LanguageContext.Provider>
  );
}

function ChildHome({ profile, activeAvatar, progress, isFirstHomeVisit, soundOff, setScreen, onLearn, onChangeAvatar, onSpeechTable, onQuickChoice, onMoodChoice }) {
  const t = useT();
  const language = useContext(LanguageContext);
  const [moodPickerOpen, setMoodPickerOpen] = useState(false);
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
  const currentMood = moodOptions.find((mood) => mood.label === progress.moodLog[0]?.mood);
  const quickChoices = {
    happy: {
      icon: <VisualAsset label={currentMood?.face || 'Happy'} imageKey={currentMood?.image || 'Happy'} className="quick-choice-image" fallback={false} />,
      label: currentMood?.label || 'Mood',
      title: 'Choose a feeling',
      message: 'Pick the face that shows how you feel.'
    }
  };

  function selectQuickChoice(choice) {
    if (choice === 'happy') {
      setMoodPickerOpen((value) => !value);
      return;
    }
    onQuickChoice(choice);
    setMoodPickerOpen(false);
    if (!soundOff && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(t(quickChoices[choice].label));
      utterance.lang = language === 'es' ? 'es-US' : 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  }

  function selectMood(mood) {
    onMoodChoice(mood.label);
    setMoodPickerOpen(false);
    if (!soundOff && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(t(mood.label));
      utterance.lang = language === 'es' ? 'es-US' : 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
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
        <div className="aac-row" aria-label="Quick visual choices">
          {Object.entries(quickChoices).map(([choice, item]) => (
            <button key={choice} type="button" onClick={() => selectQuickChoice(choice)}>
              {item.icon}
              {t(item.label)}
            </button>
          ))}
        </div>
      </section>
      {moodPickerOpen && (
        <section className="mood-picker" aria-label="Choose mood">
          {moodOptions.map((mood) => (
            <button
              key={mood.label}
              type="button"
              className={progress.moodLog[0]?.mood === mood.label ? 'mood-card selected' : 'mood-card'}
              onClick={() => selectMood(mood)}
            >
              <span aria-hidden="true"><VisualAsset label={mood.face} imageKey={mood.image} /></span>
              <strong>{t(mood.label)}</strong>
            </button>
          ))}
        </section>
      )}
      <section className="child-grid primary-child-grid" aria-label="Activity sections">
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
      </section>
    </>
  );
}

function Celebration({ celebration, onContinue, onHome }) {
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

function CategoryPage({ category, profile, progress, soundOff, learnSection, onBack, onLearnSection, onLesson, onStart }) {
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
          <button className="icon-button" onClick={onBack} aria-label="Go back"><ArrowLeft /></button>
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
        <button className="icon-button" onClick={onBack} aria-label="Go back"><ArrowLeft /></button>
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
          return (
            <article className={[
              'activity-card',
              isSocialActivity ? 'social-story-card' : '',
              completed ? 'completed' : ''
            ].filter(Boolean).join(' ')} key={activity.title}>
              <div className="activity-visual" aria-hidden="true">
                <VisualAsset label={activity.icon} imageKey={activity.title === 'Calm Sounds' ? activity.icon : activity.title} />
              </div>
              <div>
                <div className="activity-heading">
                  <h2>{t(activity.title)}</h2>
                  {completed && <span className="done-badge"><Check size={15} /> {t('Complete')}</span>}
                </div>
                {isSocialActivity && activity.storyTitle && <strong className="activity-story-title">{t(activity.storyTitle)}</strong>}
                <p>{t(activity.detail) || activity.tags?.join(' / ')}</p>
                {activity.title === 'Calm Sounds' && soundOff && <span className="pill">{t('Quiet mode')}</span>}
              </div>
              <button className="primary-button" onClick={activity.title === 'Tie Shoes' ? () => onLesson(activity) : () => onStart(activity)}>
                {t(completed ? 'Practice again' : isSocialActivity ? 'Start story' : 'Start')}
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function ActivityPlayer({ activity, profile, soundOff, onBack, onComplete, onNextStory }) {
  if (activity.title === 'Calm Sounds') {
    return <CalmSoundActivity activity={activity} soundOff={soundOff} onBack={onBack} />;
  }
  if (activity.title === 'Sensory Play') {
    return <SensoryPlayActivity activity={activity} soundOff={soundOff} onBack={onBack} onComplete={onComplete} />;
  }
  if (activity.category === 'speech' && speechBoards[activity.title]) {
    return <SpeechBoard activity={activity} board={speechBoards[activity.title]} profile={profile} soundOff={soundOff} onBack={onBack} onComplete={onComplete} />;
  }
  if (activity.category === 'social' && guidedActivities[activity.title]?.type === 'social-story') {
    return <SocialStory activity={activity} config={guidedActivities[activity.title]} soundOff={soundOff} onBack={onBack} onComplete={onComplete} onNextStory={onNextStory} />;
  }
  if (activity.title === 'Memory Cards') {
    return <MemoryGame activity={activity} profile={profile} onBack={onBack} onComplete={onComplete} />;
  }
  if (guidedActivities[activity.title]) {
    return <GuidedActivity activity={activity} config={guidedActivities[activity.title]} soundOff={soundOff} onBack={onBack} onComplete={onComplete} onNextStory={onNextStory} />;
  }
  return <MatchGame activity={activity} soundOff={soundOff} onBack={onBack} onComplete={onComplete} />;
}

function MediaToggle({ value, onChange }) {
  const t = useT();
  return (
    <div className="mode-toggle media-toggle" aria-label="Media type">
      <button
        type="button"
        className={value === 'images' ? 'mode-option active' : 'mode-option'}
        aria-pressed={value === 'images'}
        onClick={() => onChange('images')}
      >
        <ImageIcon size={16} /> {t('Images')}
      </button>
      <button
        type="button"
        className={value === 'videos' ? 'mode-option active' : 'mode-option'}
        aria-pressed={value === 'videos'}
        onClick={() => onChange('videos')}
      >
        <Video size={16} /> {t('Videos')}
      </button>
      <button
        type="button"
        className={value === 'audio' ? 'mode-option active' : 'mode-option'}
        aria-pressed={value === 'audio'}
        onClick={() => onChange('audio')}
      >
        <Volume2 size={16} /> {t('Audio')}
      </button>
    </div>
  );
}

function ShapeIcon({ shape, size = 'small' }) {
  return <span className={`shape-icon shape-${shape.toLowerCase()} shape-${size}`} aria-hidden="true" />;
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

function GameTargetVisual({ activityTitle, target }) {
  if (activityTitle === 'Color Match') {
    return <span className="sr-only">{target.label}</span>;
  }
  if (activityTitle === 'Sound Match') {
    return <Volume2 className="sound-target-icon" aria-hidden="true" />;
  }
  if (activityTitle === 'Letter Match') {
    return <span className="game-letter game-letter-large">{target.label}</span>;
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

function GameChoiceVisual({ activityTitle, choice }) {
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
  return <VisualAsset label={choice.label} className="choice-image" fallback={false} />;
}

function GameCompleteActions({ onRepeat, onGames, onNext, backLabel = 'Back to Games', nextLabel = 'Next story' }) {
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

function SpeechBoard({ activity, board, profile, soundOff, onBack, onComplete }) {
  if (board.type === 'communication-board') {
    return <CommunicationBoard activity={activity} profile={profile} soundOff={soundOff} onBack={onBack} onComplete={onComplete} />;
  }
  return <SimpleSpeechBoard activity={activity} board={board} soundOff={soundOff} onBack={onBack} onComplete={onComplete} />;
}

function SimpleSpeechBoard({ activity, board, soundOff, onBack, onComplete }) {
  const [phrase, setPhrase] = useState([]);
  const [lastSpoken, setLastSpoken] = useState('');
  const cards = board.groups.flatMap((group) => group.cards);

  function speakText(text) {
    setLastSpoken(text);
    if (soundOff || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.82;
    utterance.pitch = 1.08;
    window.speechSynthesis.speak(utterance);
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
        <button className="icon-button" onClick={onBack} aria-label="Go back"><ArrowLeft /></button>
        <span className="round-icon"><MessageSquare /></span>
        <div>
          <p className="eyebrow">Communication</p>
          <h1>{activity.title}</h1>
        </div>
      </div>

      <div className="speech-builder" aria-live="polite">
        <div className="speech-phrase">
          {phrase.length ? phrase.map((word, index) => (
            <span key={`${word}-${index}`}>{word}</span>
          )) : (
            <span>Tap a picture</span>
          )}
        </div>
        <div className="speech-actions">
          <button className="primary-button" type="button" disabled={!phrase.length} onClick={speakPhrase}>
            <Volume2 size={18} /> Speak
          </button>
          <button className="secondary-button" type="button" disabled={!phrase.length} onClick={() => setPhrase((current) => current.slice(0, -1))}>
            <Delete size={18} /> Backspace
          </button>
          <button className="secondary-button" type="button" disabled={!phrase.length} onClick={() => setPhrase([])}>
            <Trash2 size={18} /> Clear
          </button>
        </div>
      </div>

      {!!board.phraseStarters.length && (
        <div className="speech-starters" aria-label="Phrase starters">
          {board.phraseStarters.map((starter) => (
            <button key={starter} type="button" onClick={() => addStarter(starter)}>
              <VisualAsset label={starter} className="speech-mini-image" fallback={false} />
              {starter}
            </button>
          ))}
        </div>
      )}

      <div className="speech-groups">
        {board.groups.map((group) => (
          <section className="speech-group" key={group.title}>
            <h2>{group.title}</h2>
            <div className="speech-card-grid">
              {group.cards.map((card) => (
                <button
                  key={card.label}
                  type="button"
                  className={lastSpoken === (card.speak || card.label) ? 'speech-card selected' : 'speech-card'}
                  onClick={() => addWord(card)}
                >
                  <VisualAsset label={card.label} imageKey={card.image} className="speech-card-image" />
                  <strong>{card.label}</strong>
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="speech-footer">
        <span>{soundOff ? 'Voice muted' : (lastSpoken ? `Heard: ${lastSpoken}` : `${cards.length} picture words`)}</span>
        <button className="primary-button" type="button" disabled={!lastSpoken} onClick={onComplete}>
          <Star size={18} /> Finish
        </button>
      </div>
    </section>
  );
}

function CommunicationBoard({ activity, profile, soundOff, onBack, onComplete }) {
  const language = useContext(LanguageContext);
  const t = useT();
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
    if (soundOff || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'es' ? 'es-US' : 'en-US';
    utterance.rate = 0.82;
    utterance.pitch = 1.08;
    window.speechSynthesis.speak(utterance);
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

      <div className="speech-footer">
        <span>{soundOff ? 'Voice muted' : (lastSpoken ? `Heard: ${lastSpoken}` : 'Ready to communicate')}</span>
        <button className="secondary-button" type="button" disabled={!lastSpoken} onClick={() => speakText(lastSpoken)}>
          <RotateCcw size={18} /> Repeat
        </button>
      </div>
    </section>
  );
}

function SocialStory({ activity, config, soundOff, onBack, onComplete, onNextStory }) {
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
    if (soundOff || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'es' ? 'es-ES' : 'en-US';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  }

  function completeStory() {
    if (!completed) {
      setCompleted(true);
      onComplete();
    }
  }

  function goNext() {
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

  return (
    <section className="game-page social-story-page">
      <div className="page-title social-story-title">
        <button className="icon-button" onClick={onBack} aria-label="Go back"><ArrowLeft /></button>
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
              <button className="primary-button" type="button" onClick={onNextStory}>
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
          <span><Hand size={24} /> Wave</span>
          <span><MessageSquare size={24} /> Hello</span>
          <span><ImageIcon size={24} /> AAC</span>
        </div>
      )}
      {selectedChoice && <span className="story-choice-bubble">{selectedChoice}</span>}
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

function GuidedActivity({ activity, config, soundOff, onBack, onComplete, onNextStory }) {
  const t = useT();
  const language = useContext(LanguageContext);
  const [mediaMode, setMediaMode] = useState('images');
  const [selected, setSelected] = useState(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [breaths, setBreaths] = useState(0);
  const [countIndex, setCountIndex] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(30);
  const [completed, setCompleted] = useState(false);
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
  const breathPhases = [
    { key: 'Breathe in', label: 'Big breath in' },
    { key: 'Breathe out', label: 'Slow breath out' },
    { key: 'Rest', label: 'Rest softly' }
  ];
  const currentBreathPhase = breathPhases[breathPhaseIndex % breathPhases.length];

  useEffect(() => {
    setSelected(null);
    setStepIndex(0);
    setBreaths(0);
    setCountIndex(0);
    setTimerStarted(false);
    setSecondsLeft(30);
    setCompleted(false);
  }, [activity.title]);

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

  const choicesDone = config.type === 'choices' && selected === config.correct;
  const stepsDone = ['steps', 'script', 'turns'].includes(config.type) && stepIndex >= (config.steps || config.lines || config.turns).length;
  const breathDone = config.type === 'breath' && breaths >= 3;
  const countDone = config.type === 'count' && countIndex >= (config.items || []).length;
  const timerDone = config.type === 'timer' && secondsLeft === 0;
  const done = choicesDone || stepsDone || breathDone || countDone || timerDone;
  const sequence = config.steps || config.lines || config.turns || [];
  const shouldShowListen = isSocialStory || (activity.category === 'daily' && mediaMode === 'audio') || activity.category === 'calm';
  const shouldSpeakActions = isSocialStory || config.speak || mediaMode === 'audio';

  function getSequenceLabel(item) {
    return typeof item === 'string' ? item : item.label;
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
    if (soundOff || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'es' ? 'es-ES' : 'en-US';
    utterance.rate = 0.9;
    utterance.volume = storyVolume;
    window.speechSynthesis.speak(utterance);
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
        <button className="icon-button" onClick={onBack} aria-label="Go back"><ArrowLeft /></button>
        <span className="round-icon"><Puzzle /></span>
        <div>
          <p className="eyebrow">{t('Activity')}</p>
          <h1>{t(activity.title)}</h1>
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
              <VisualAsset label={config.visual} className="target-image" />
            </div>
            <div className="game-choices">
              {config.choices.map((choice) => (
                <button
                  key={choice}
                  type="button"
                  className={selected === choice ? 'game-choice selected' : 'game-choice'}
                  onClick={() => {
                    setSelected(choice);
                    if (shouldSpeakActions) speakText(t(choice));
                  }}
                >
                  <VisualAsset label={choice} className="choice-image" fallback={false} />
                  {t(choice)}
                </button>
              ))}
            </div>
          </>
        )}

        {['steps', 'script', 'turns'].includes(config.type) && (
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
            <div className="breath-stage" aria-label={t('Breath guide')}>
              <div className="breath-ring" aria-hidden="true">
                <div className="breath-ring-inner" />
              </div>
              <div className="breath-phase">
                <span>{t(currentBreathPhase.key)}</span>
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
            <div className="count-row" aria-label="Counting cards">
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
            <strong>{Math.min(countIndex, (config.items || []).length)} of {(config.items || []).length}</strong>
          </div>
        )}

        {config.type === 'timer' && (
          <div className="timer-practice">
            <div className="timer large" aria-live="polite"><Clock /> 0:{String(secondsLeft).padStart(2, '0')}</div>
            <button className="primary-button" type="button" onClick={() => setTimerStarted(true)}>
              Start timer
            </button>
          </div>
        )}

        {(selected || done) && (
          <div className={done ? 'game-feedback success' : 'game-feedback'}>
            <strong>{t(done ? 'Nice work!' : 'Keep trying.')}</strong>
            <span>{t(done ? 'Activity complete.' : 'Try the matching answer or next step.')}</span>
          </div>
        )}

        {['play', 'social'].includes(activity.category) && completed && (
          <GameCompleteActions
            onRepeat={() => {
              setSelected(null);
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
            setStepIndex(0);
            setBreaths(0);
            setCountIndex(0);
            setTimerStarted(false);
            setSecondsLeft(30);
            setCompleted(false);
          }}>
            Reset
          </button>
        </div>
      </div>
    </section>
  );
}

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

function SensoryPlayActivity({ activity, soundOff, onBack, onComplete }) {
  const t = useT();
  const [mode, setMode] = useState('bubbles');
  const [bubbles, setBubbles] = useState(sensoryBubbleSeeds);
  const [waves, setWaves] = useState([]);
  const [waveSize, setWaveSize] = useState(190);
  const [waveDuration, setWaveDuration] = useState(1.2);
  const [waveAmount, setWaveAmount] = useState(1);
  const bubblePopAudioRef = useRef({ context: null, nodes: [] });
  const pendingWaveRef = useRef(null);
  const waveFrameRef = useRef(null);

  useEffect(() => () => {
    if (waveFrameRef.current) window.cancelAnimationFrame(waveFrameRef.current);
    stopBubblePopAudio();
  }, []);

  function resetBubbles() {
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
    playBubblePop();
    setBubbles((current) => current.filter((bubble) => bubble.id !== id));
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
    setWaves((current) => [...current.slice(-(22 - waveAmount)), ...newWaves]);
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
        <button className="icon-button" onClick={onBack} aria-label="Go back"><ArrowLeft /></button>
        <span className="round-icon"><Sparkles /></span>
        <div>
          <p className="eyebrow">{t('Calm activities')}</p>
          <h1>{t(activity.title)}</h1>
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
            <input type="range" min="0.65" max="2.2" step="0.05" value={waveDuration} onChange={(event) => setWaveDuration(Number(event.target.value))} />
          </label>
          <label>
            <span>{t('Wave amount')}</span>
            <input type="range" min="1" max="4" step="1" value={waveAmount} onChange={(event) => setWaveAmount(Number(event.target.value))} />
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

function MatchGame({ activity, soundOff, onBack, onComplete }) {
  const t = useT();
  const soundGameAudioRef = useRef({ context: null, nodes: [] });
  const soundHighlightTimerRef = useRef(null);
  const shapeDraggingRef = useRef(false);
  const isSoundMatch = activity.title === 'Sound Match';
  const isEmotionMatch = activity.title === 'Emotion Match';
  const isShapeSort = activity.title === 'Shape Sort';
  const isMatchPairs = activity.title === 'Match Pairs';
  const isSizeSort = activity.title === 'Sort by Size';
  const rounds = useMemo(() => getGameRounds(activity.title, activity.icon), [activity.title, activity.icon]);
  const [roundIndex, setRoundIndex] = useState(0);
  const game = rounds[roundIndex] || rounds[0];
  const [choiceOrder, setChoiceOrder] = useState(() => shuffleCards(game.choices));
  const [selected, setSelected] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [soundHighlighted, setSoundHighlighted] = useState(false);
  const [shapeDragging, setShapeDragging] = useState(false);
  const [dragOverChoice, setDragOverChoice] = useState(null);
  const [sizeSlots, setSizeSlots] = useState([null, null, null]);
  const [activeSizePieceId, setActiveSizePieceId] = useState(null);
  const [sizeSortChecked, setSizeSortChecked] = useState(false);
  const [sizeSortAttempts, setSizeSortAttempts] = useState(0);
  const [dragOverSizeSlot, setDragOverSizeSlot] = useState(null);
  const sizeSortFilled = sizeSlots.every(Boolean);
  const sizeSortIsCorrect = isSizeSort
    && sizeSortChecked
    && sizeSlots.every((piece, index) => piece?.value === game.target.order[index]);
  const isCorrect = isSizeSort ? sizeSortIsCorrect : selected?.value === game.target.value;
  const isLastRound = roundIndex >= rounds.length - 1;
  const successDetail = isMatchPairs ? (game.explanation || 'These two go together.') : 'You found the right answer.';
  const retryDetail = isMatchPairs
    ? 'Look at the big card and pick what goes with it.'
    : 'Look at the big card and pick the same one.';

  useEffect(() => () => {
    stopSoundGameAudio();
    window.clearTimeout(soundHighlightTimerRef.current);
  }, []);

  useEffect(() => {
    setSelected(null);
    setSoundHighlighted(false);
    shapeDraggingRef.current = false;
    setShapeDragging(false);
    setDragOverChoice(null);
    setSizeSlots([null, null, null]);
    setActiveSizePieceId(null);
    setSizeSortChecked(false);
    setSizeSortAttempts(0);
    setDragOverSizeSlot(null);
    window.clearTimeout(soundHighlightTimerRef.current);
    setChoiceOrder(shuffleCards(game.choices));
  }, [game]);

  function speakText(text) {
    if (soundOff || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    utterance.pitch = 1.05;
    window.speechSynthesis.speak(utterance);
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
      const startAt = context.currentTime + 0.04;
      playSoundGameTone(context, output, 520, startAt, 0.28);
      playSoundGameTone(context, output, 780, startAt + 0.18, 0.22);
    } else if (label === 'Toy') {
      [784, 1046.5, 1318.5].forEach((frequency, index) => {
        playSoundGameTone(context, output, frequency, context.currentTime + index * 0.14, 0.16);
      });
    } else if (label === 'Bed') {
      [392, 329.63, 261.63].forEach((frequency, index) => {
        playSoundGameTone(context, output, frequency, context.currentTime + index * 0.28, 0.34);
      });
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
    speakText(t(isSizeSort ? 'Great job!' : 'Great match!'));
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
    setSoundHighlighted(false);
    shapeDraggingRef.current = false;
    setShapeDragging(false);
    setDragOverChoice(null);
    setSizeSlots([null, null, null]);
    setActiveSizePieceId(null);
    setSizeSortChecked(false);
    setSizeSortAttempts(0);
    setDragOverSizeSlot(null);
    setChoiceOrder(shuffleCards(rounds[0].choices));
  }

  function chooseMatch(choice) {
    setSelected(choice);
    speakText(t(choice.label));
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

  const sizeSortPlacedIds = new Set(sizeSlots.filter(Boolean).map((piece) => piece.id));
  const sizeSortSourcePieces = choiceOrder.filter((piece) => !sizeSortPlacedIds.has(piece.id));

  return (
    <section className="game-page">
      <div className="page-title">
        <button className="icon-button" onClick={onBack} aria-label="Go back"><ArrowLeft /></button>
        <span className="round-icon"><Puzzle /></span>
        <div>
          <p className="eyebrow">{t('Activity')}</p>
          <h1>{t(activity.title)}</h1>
        </div>
      </div>
      <div className="game-panel">
        <div className="game-progress" aria-live="polite">
          <span>{t('Round')} {roundIndex + 1} {t('of')} {rounds.length}</span>
          <span>{t('Score')}: {score}</span>
        </div>
        <div className={isSoundMatch ? 'game-prompt sound-game-prompt' : isEmotionMatch ? 'game-prompt emotion-game-prompt' : isShapeSort ? 'game-prompt shape-sort-prompt' : isMatchPairs ? 'game-prompt pair-game-prompt' : isSizeSort ? 'game-prompt size-sort-prompt' : 'game-prompt'}>
          <p className="eyebrow">{t('Your turn')}</p>
          <h2>{t(isSoundMatch ? 'Listen, then pick what made the sound.' : isEmotionMatch ? 'What feeling is this?' : isShapeSort ? 'Where does this shape go?' : isMatchPairs ? 'What goes with this?' : isSizeSort ? 'Put them in order.' : game.prompt)}</h2>
          {isShapeSort && <p>{t('Pick the matching group.')}</p>}
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
        </div>
        {isSizeSort ? (
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
                  const shouldHint = !isCorrect && sizeSortChecked && sizeSortAttempts >= 2 && index === 0;
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
                      aria-label={`${t(slotLabel)}: ${piece ? `${t(game.target.object)} ${t(piece.label)}` : t('Empty spot')}`}
                      onClick={() => chooseSizeSlot(index)}
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
                      : 'target-card',
              isMatchPairs && isCorrect ? 'matched' : ''
            ].filter(Boolean).join(' ')}
            aria-label={activity.title === 'Color Match' ? `Color card: ${game.target.label}` : isEmotionMatch ? `${t('What feeling is this?')} ${t(game.target.label)}` : isShapeSort ? `${t('Shape to sort')}: ${t(game.target.label)}` : isMatchPairs ? `${t('What goes with this?')} ${t(game.target.label)}` : undefined}
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
            <GameTargetVisual activityTitle={activity.title} target={game.target} />
            {isMatchPairs && <strong className="pair-object-label">{t(game.target.label)}</strong>}
          </div>
        )}
        {!isSizeSort && (
        <div className={isSoundMatch ? 'game-choices sound-choice-grid' : isEmotionMatch ? 'game-choices emotion-choice-grid' : isShapeSort ? 'game-choices shape-sort-bin-grid' : isMatchPairs ? 'game-choices pair-choice-grid' : 'game-choices'}>
          {choiceOrder.map((choice) => {
            const isSelectedChoice = selected?.label === choice.label;
            const isCorrectChoice = isSoundMatch && isCorrect && choice.value === game.target.value;
            const isEmotionCorrectChoice = isEmotionMatch && isCorrect && choice.value === game.target.value;
            const isShapeCorrectChoice = isShapeSort && isCorrect && choice.value === game.target.value;
            const isPairCorrectChoice = isMatchPairs && isCorrect && choice.value === game.target.value;
            const choiceClassName = [
              'game-choice',
              isSoundMatch ? 'sound-choice-card' : '',
              isEmotionMatch ? 'emotion-choice-card' : '',
              isShapeSort ? 'shape-sort-bin' : '',
              isMatchPairs ? 'pair-choice-card' : '',
              isSelectedChoice ? 'selected' : '',
              (isCorrectChoice || isEmotionCorrectChoice || isShapeCorrectChoice || isPairCorrectChoice) ? 'correct' : '',
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
                {!isEmotionMatch && <GameChoiceVisual activityTitle={activity.title} choice={choice} />}
                {activity.title !== 'Letter Match' && <span>{t(choice.label)}</span>}
                {(isCorrectChoice || isEmotionCorrectChoice || isShapeCorrectChoice || isPairCorrectChoice) && <Check className="choice-state-icon" size={22} aria-label={t('Great job!')} />}
                {(isEmotionMatch || isShapeSort || isMatchPairs) && isSelectedChoice && !isCorrect && <span className="choice-state-icon selection-dot" aria-hidden="true" />}
              </button>
            );
          })}
        </div>
        )}
        {(selected || sizeSortChecked) && (
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
            <strong>{t(isSizeSort ? (isCorrect ? 'Great job!' : 'Almost! Try again.') : isMatchPairs ? (isCorrect ? 'Great match!' : 'Try again.') : isSoundMatch || isEmotionMatch || isShapeSort ? (isCorrect ? 'Great job!' : 'Try again.') : (isCorrect ? 'Great match!' : 'Try one more time.'))}</strong>
            <span>
              {isSizeSort
                ? t(isCorrect ? 'Small → Medium → Big' : getSizeSortHint())
                : isEmotionMatch
                ? (isCorrect ? `${t('That face is')} ${t(game.target.label).toLowerCase()}.` : t('Look at the face one more time.'))
                : isShapeSort
                  ? t(isCorrect ? `${game.target.label} goes with ${game.target.label}.` : 'Look at the shape.')
                  : isMatchPairs
                    ? t(isCorrect ? successDetail : (game.hint || retryDetail))
                    : t(isSoundMatch ? (isCorrect ? successDetail : 'Listen one more time and choose again.') : (isCorrect ? successDetail : retryDetail))}
            </span>
            {isEmotionMatch && !isCorrect && <small>{t('Look at the mouth and eyes.')}</small>}
            {isShapeSort && !isCorrect && <small>{t(getShapeHint(game.target.label))}</small>}
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

function MemoryGame({ activity, profile, onBack, onComplete }) {
  const t = useT();
  const startsWithImages = profile?.letters === 'Does not recognize letters';
  const [mode, setMode] = useState(startsWithImages ? 'images' : 'words');
  const [pairCount, setPairCount] = useState(2);
  const [deck, setDeck] = useState(() => shuffleCards(createMemoryDeck(2)));
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [completed, setCompleted] = useState(false);
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
    const nextFlipped = [...flipped, card.id];
    setFlipped(nextFlipped);
    if (nextFlipped.length === 2) {
      const pair = deck.filter((item) => nextFlipped.includes(item.id));
      if (pair[0].label === pair[1].label) {
        window.setTimeout(() => {
          setMatched((items) => [...items, pair[0].id, pair[1].id]);
          setFlipped([]);
        }, 450);
      } else {
        window.setTimeout(() => setFlipped([]), 800);
      }
    }
  }

  return (
    <section className="game-page">
      <div className="page-title">
        <button className="icon-button" onClick={onBack} aria-label="Go back"><ArrowLeft /></button>
        <span className="round-icon"><Puzzle /></span>
        <div>
          <p className="eyebrow">Activity</p>
          <h1>{activity.title}</h1>
        </div>
      </div>
      <div className="game-panel">
        <div className="game-prompt">
          <p className="eyebrow">{t('Find pairs')}</p>
          <h2>{t(mode === 'images' ? 'Turn over two cards. Match the same pictures.' : 'Turn over two cards. Match the same words.')}</h2>
        </div>
        <div className="mode-toggle" aria-label="Memory card mode">
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
            onClick={() => resetGame('words')}
          >
            {t('Words')}
          </button>
        </div>
        <div className="pair-stepper" aria-label="Number of pairs">
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
        <div className={complete ? 'game-feedback success' : 'game-feedback'}>
          <strong>{complete ? t('All pairs found!') : `${matchedPairs} ${t('of')} ${pairCount} ${t('Pairs')}`}</strong>
          <span>{t(complete ? 'Memory activity is complete.' : 'Keep looking for matching cards.')}</span>
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

function ShoeLesson({ onBack, onComplete }) {
  const [step, setStep] = useState(0);
  const [mediaMode, setMediaMode] = useState('images');
  const current = lessonSteps[step];

  function speakText(text) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.82;
    utterance.pitch = 1.03;
    window.speechSynthesis.speak(utterance);
  }

  function speakCurrentStep() {
    speakText(`Step ${step + 1}. ${current.title}. ${current.text}`);
  }

  function speakAllSteps() {
    speakText(`${shoeLessonIntro} ${lessonSteps.map((item, index) => `Step ${index + 1}. ${item.text}`).join(' ')}`);
  }

  return (
    <section className="lesson">
      <div className="page-title">
        <button className="icon-button" onClick={onBack} aria-label="Back to daily skills"><ArrowLeft /></button>
        <span className="round-icon"><HeartHandshake /></span>
        <h1>Tie Shoes</h1>
        <MediaToggle value={mediaMode} onChange={setMediaMode} />
      </div>

      <div className={`lesson-stage lesson-stage-${mediaMode}`}>
        {mediaMode === 'videos' ? (
          <div className="lesson-video-board">
            {lessonSteps.map((item, index) => (
              <button
                key={item.title}
                type="button"
                className={index === step ? 'video-step-card active' : 'video-step-card'}
                onClick={() => setStep(index)}
                aria-label={`Show step ${index + 1}: ${item.title}`}
              >
                <VisualAsset label={item.visual} className="video-step-image" />
                <span>{index + 1}</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="lesson-visual">
            <VisualAsset label={current.visual} className="lesson-image" />
          </div>
        )}

        <div className="lesson-copy">
          <p className="eyebrow">Step {step + 1} of {lessonSteps.length}</p>
          <h2>{current.title}</h2>
          <p>{current.text}</p>

          {mediaMode === 'images' && (
            <p className="lesson-helper">Look at the picture, then try the same movement with real laces.</p>
          )}

          {mediaMode === 'videos' && (
            <p className="lesson-helper">Tap any frame to jump to that part of the sequence.</p>
          )}

          {mediaMode === 'audio' && (
            <div className="lesson-audio-panel">
              <button className="primary-button" type="button" onClick={speakCurrentStep}>
                <Volume2 size={18} /> Hear this step
              </button>
              <button className="secondary-button" type="button" onClick={speakAllSteps}>
                <ListChecks size={18} /> Hear all steps
              </button>
            </div>
          )}

          {mediaMode === 'steps' && (
            <div className="lesson-step-list" aria-label="Tie shoes steps">
              {lessonSteps.map((item, index) => (
                <button
                  key={item.title}
                  type="button"
                  className={index === step ? 'lesson-step-item active' : (index < step ? 'lesson-step-item done' : 'lesson-step-item')}
                  onClick={() => setStep(index)}
                >
                  <span>{index + 1}</span>
                  <strong>{item.title}</strong>
                  <small>{item.text}</small>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="step-dots" aria-label="Lesson progress">
        {lessonSteps.map((item, index) => <span key={item.title} className={index <= step ? 'active' : ''} />)}
      </div>
      <div className="form-actions">
        <button className="secondary-button" onClick={() => setStep(Math.max(0, step - 1))}><ArrowLeft size={18} /> Back</button>
        {step < lessonSteps.length - 1 ? (
          <button className="primary-button" onClick={() => setStep(step + 1)}>Next <ChevronRight size={18} /></button>
        ) : (
          <button className="primary-button" onClick={onComplete}><Star size={18} /> Complete</button>
        )}
      </div>
    </section>
  );
}

function NavButton({ icon, label, active, onClick }) {
  const t = useT();
  return (
    <button className={active ? 'nav-button active' : 'nav-button'} onClick={onClick}>
      {icon}
      <span>{t(label)}</span>
    </button>
  );
}

createRoot(document.getElementById('root')).render(<App />);


