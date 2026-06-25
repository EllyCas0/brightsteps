import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowLeft,
  Baby,
  BookOpen,
  Brain,
  Check,
  ChevronRight,
  Clock,
  HeartHandshake,
  Home,
  Info,
  Leaf,
  Lock,
  Moon,
  Palette,
  Puzzle,
  RotateCcw,
  Shield,
  Smile,
  Sparkles,
  Star,
  Users,
  Volume2,
  VolumeX
} from 'lucide-react';
import './styles.css';

const STORAGE_KEY = 'brightsteps-child-profile';
const PROGRESS_KEY = 'brightsteps-progress';

function getTodayKey() {
  return new Date().toISOString().slice(0, 10);
}

function getRewardItems(stars) {
  return [
    { name: 'Rainbow Sticker', cost: 3 },
    { name: 'Helper Badge', cost: 6 },
    { name: 'Calm Star', cost: 10 },
    { name: 'Super Learner', cost: 15 }
  ].map((item) => ({ ...item, unlocked: stars >= item.cost }));
}

const choiceSets = {
  supportLevel: [
    'Level 1: Requires support',
    'Level 2: Requires substantial support',
    'Level 3: Requires very substantial support'
  ],
  communication: ['Verbal', 'Limited verbal', 'Non-verbal', 'Uses AAC or visual communication'],
  letters: [
    'Does not recognize letters',
    'Recognizes some letters',
    'Recognizes most letters',
    'Can read simple words'
  ],
  numbers: [
    'Does not recognize numbers',
    'Recognizes some numbers',
    'Recognizes numbers 1-10',
    'Recognizes numbers beyond 10'
  ],
  social: [
    'Avoids interaction',
    'Interacts with familiar people only',
    'Can play alongside others',
    'Can participate in simple social games'
  ],
  sensory: ['Sounds', 'Lights', 'Textures', 'Food', 'Touch', 'Crowds'],
  dailySkills: [
    'Dressing',
    'Brushing teeth',
    'Tying shoes',
    'Washing hands',
    'Eating independently',
    'Following routines'
  ],
  learningStyle: ['Images', 'Videos', 'Audio', 'Step-by-step instructions', 'Games'],
  interests: ['Animals', 'Cars', 'Music', 'Colors', 'Dinosaurs', 'Space', 'Other']
};

const defaultProgress = {
  completed: ['Color Match', 'Hello Story'],
  practiced: ['Washing hands', 'Taking turns', 'Letter matching'],
  counts: { learn: 3, daily: 2, social: 1, play: 4, calm: 2 },
  moodLog: [],
  breakRequests: 0,
  rewardStars: 2,
  todayDone: false,
  dailyGoal: 3,
  todayActivities: [],
  badges: [],
  streak: 0,
  lastActiveDate: getTodayKey()
};

const categoryLabels = {
  learn: 'Learn',
  daily: 'Daily',
  social: 'Social',
  play: 'Play',
  calm: 'Calm'
};

const activities = {
  learn: [
    { title: 'Letter Match', icon: 'A', level: 'basic', tags: ['letters', 'images'] },
    { title: 'Simple Words', icon: 'CAT', level: 'word', tags: ['reading'] },
    { title: 'Number Garden', icon: '1 2', level: 'basic', tags: ['numbers'] },
    { title: 'Shape Sort', icon: 'SH', level: 'basic', tags: ['shapes'] },
    { title: 'Memory Cards', icon: 'M', level: 'basic', tags: ['memory'] },
    { title: 'Color Match', icon: 'RED', level: 'basic', tags: ['colors'] }
  ],
  daily: [
    { title: 'Tie Shoes', icon: 'LACE', detail: 'Step-by-step shoe tying' },
    { title: 'Brush Teeth', icon: 'TOOTH', detail: 'Gentle routine practice' },
    { title: 'Wash Hands', icon: 'SOAP', detail: 'Clean hands sequence' },
    { title: 'Get Dressed', icon: 'SHIRT', detail: 'Clothes in order' },
    { title: 'Pack Backpack', icon: 'BAG', detail: 'School-ready checklist' },
    { title: 'Morning Routine', icon: 'AM', detail: 'First, next, then' }
  ],
  social: [
    { title: 'Say Hello', icon: 'HI', detail: 'Greeting familiar people' },
    { title: 'Take Turns', icon: 'TURN', detail: 'Wait, play, pass' },
    { title: 'Ask Help', icon: 'HELP', detail: 'Practice help choices' },
    { title: 'Share Toys', icon: 'SHARE', detail: 'Simple sharing story' },
    { title: 'Feelings', icon: 'FEEL', detail: 'Name emotions' },
    { title: 'Faces', icon: 'FACE', detail: 'Recognize expressions' }
  ],
  play: [
    { title: 'Match Pairs', icon: 'PAIR', detail: 'Find the same picture' },
    { title: 'Sort It', icon: 'SORT', detail: 'Put items in groups' },
    { title: 'Emotion Cards', icon: 'MOOD', detail: 'Pick how they feel' },
    { title: 'Sound + Picture', icon: 'SND', detail: 'Quiet mode available' },
    { title: 'Star Rewards', icon: 'STAR', detail: 'Tiny celebration game' }
  ],
  calm: [
    { title: 'Breathe', icon: 'AIR', detail: 'Slow visual breathing' },
    { title: 'Soft Visuals', icon: 'SOFT', detail: 'Low-motion patterns' },
    { title: 'Timer', icon: 'TIME', detail: 'Visual countdown' },
    { title: 'Feel Check', icon: 'CHECK', detail: 'Choose an emotion' },
    { title: 'Break', icon: 'REST', detail: 'I need a break' }
  ]
};

const resources = [
  'Build routines with the same words and visuals each day.',
  'Offer choices with pictures, gestures, or AAC-style buttons.',
  'Reduce sensory load before practicing a hard skill.',
  'Use short practice sessions and celebrate effort.',
  'During a meltdown, lower demands, reduce noise, and prioritize safety.'
];

const lessonSteps = [
  { title: 'Cross', visual: 'X', text: 'Cross the laces.' },
  { title: 'Tunnel', visual: 'UNDER', text: 'Put one lace under.' },
  { title: 'Pull', visual: 'PULL', text: 'Pull both laces snug.' },
  { title: 'Loop', visual: 'LOOP', text: 'Make one bunny ear.' },
  { title: 'Wrap', visual: 'WRAP', text: 'Wrap the other lace around.' },
  { title: 'Finish', visual: 'DONE', text: 'Pull the loop through.' }
];

const activityGames = {
  'Color Match': {
    prompt: 'Pick the color that matches the big card.',
    target: { label: 'Red', value: '#ef7464' },
    choices: [
      { label: 'Red', value: '#ef7464' },
      { label: 'Blue', value: '#4f8ecb' },
      { label: 'Green', value: '#78a85f' },
      { label: 'Yellow', value: '#f0b84b' }
    ]
  },
  'Letter Match': {
    prompt: 'Find the same letter.',
    target: { label: 'A', value: 'A' },
    choices: [
      { label: 'A', value: 'A' },
      { label: 'B', value: 'B' },
      { label: 'M', value: 'M' },
      { label: 'S', value: 'S' }
    ]
  },
  'Number Garden': {
    prompt: 'How many flowers are in the garden?',
    target: { label: '3', value: '3' },
    choices: [
      { label: '2', value: '2' },
      { label: '3', value: '3' },
      { label: '4', value: '4' },
      { label: '5', value: '5' }
    ]
  },
  'Shape Sort': {
    prompt: 'Put the circle with the circles.',
    target: { label: 'Circle', value: 'Circle' },
    choices: [
      { label: 'Circle', value: 'Circle' },
      { label: 'Square', value: 'Square' },
      { label: 'Star', value: 'Star' },
      { label: 'Triangle', value: 'Triangle' }
    ]
  },
  'Match Pairs': {
    prompt: 'Choose the picture that makes a pair.',
    target: { label: 'Sun', value: 'Sun' },
    choices: [
      { label: 'Moon', value: 'Moon' },
      { label: 'Sun', value: 'Sun' },
      { label: 'Rain', value: 'Rain' },
      { label: 'Cloud', value: 'Cloud' }
    ]
  }
};

const memoryCards = ['Moon', 'Star', 'Leaf', 'Heart', 'Moon', 'Star', 'Leaf', 'Heart']
  .map((label, index) => ({ id: `${label}-${index}`, label }));

const guidedActivities = {
  'Simple Words': {
    type: 'choices',
    prompt: 'Pick the word that matches the picture.',
    visual: 'CAT',
    correct: 'cat',
    choices: ['cat', 'sun', 'bed', 'cup']
  },
  'Wash Hands': {
    type: 'steps',
    prompt: 'Tap each step in order.',
    steps: ['Turn on water', 'Soap', 'Rub hands', 'Rinse', 'Dry']
  },
  'Brush Teeth': {
    type: 'steps',
    prompt: 'Tap each step in order.',
    steps: ['Toothpaste', 'Brush top', 'Brush bottom', 'Rinse', 'Smile']
  },
  'Morning Routine': {
    type: 'steps',
    prompt: 'Tap each step in order.',
    steps: ['Wake up', 'Get dressed', 'Eat breakfast', 'Pack bag']
  },
  'Say Hello': {
    type: 'script',
    prompt: 'Practice a short greeting.',
    lines: ['Look', 'Wave', 'Say hello', 'Wait']
  },
  'Take Turns': {
    type: 'turns',
    prompt: 'Practice taking turns.',
    turns: ['My turn', 'Your turn', 'Wait', 'Play again']
  },
  'Feelings': {
    type: 'choices',
    prompt: 'Choose the happy face.',
    visual: 'HAPPY',
    correct: 'Happy',
    choices: ['Happy', 'Sad', 'Mad', 'Tired']
  },
  'Emotion Cards': {
    type: 'choices',
    prompt: 'What feeling matches this card?',
    visual: 'SMILE',
    correct: 'Happy',
    choices: ['Happy', 'Worried', 'Sleepy', 'Angry']
  },
  Breathe: {
    type: 'breath',
    prompt: 'Take three slow breaths.',
    steps: ['Breathe in', 'Breathe out', 'Rest']
  },
  Timer: {
    type: 'timer',
    prompt: 'Start a short calm timer.'
  },
  Break: {
    type: 'script',
    prompt: 'Use a break card.',
    lines: ['I need a break', 'Quiet place', 'Timer', 'Come back']
  }
};

function loadJson(key, fallback) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

function saveJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage can be unavailable in private or restricted browser contexts.
  }
}

function normalizeProgress(saved) {
  const todayKey = getTodayKey();
  const lastActiveDate = saved?.lastActiveDate || todayKey;
  const isNewDay = lastActiveDate !== todayKey;
  const streak = isNewDay && saved?.todayDone ? (saved?.streak || 0) + 1 : (saved?.streak || 0);
  return {
    ...defaultProgress,
    ...saved,
    completed: Array.isArray(saved?.completed) ? saved.completed : defaultProgress.completed,
    practiced: Array.isArray(saved?.practiced) ? saved.practiced : defaultProgress.practiced,
    counts: { ...defaultProgress.counts, ...(saved?.counts || {}) },
    moodLog: Array.isArray(saved?.moodLog) ? saved.moodLog : defaultProgress.moodLog,
    breakRequests: Number.isFinite(saved?.breakRequests) ? saved.breakRequests : defaultProgress.breakRequests,
    rewardStars: Number.isFinite(saved?.rewardStars) ? saved.rewardStars : defaultProgress.rewardStars,
    todayDone: isNewDay ? false : Boolean(saved?.todayDone),
    dailyGoal: Number.isFinite(saved?.dailyGoal) ? saved.dailyGoal : defaultProgress.dailyGoal,
    todayActivities: isNewDay ? [] : (Array.isArray(saved?.todayActivities) ? saved.todayActivities : defaultProgress.todayActivities),
    badges: Array.isArray(saved?.badges) ? saved.badges : defaultProgress.badges,
    streak,
    lastActiveDate: todayKey
  };
}

function getPersonalization(profile) {
  if (!profile) return [];
  const notes = [];
  if (profile.letters === 'Does not recognize letters') notes.push('Start with visual letter matching.');
  if (profile.letters !== 'Does not recognize letters') notes.push('Include simple word play.');
  if (profile.communication === 'Non-verbal' || profile.communication.includes('AAC')) {
    notes.push('Show visual choices and AAC-style buttons.');
  }
  if (profile.sensory.includes('Sounds')) notes.push('Sound starts off and can stay muted.');
  if (profile.learningStyle.includes('Images')) notes.push('Prioritize picture-first steps.');
  if (profile.supportLevel.startsWith('Level 3')) notes.push('Use shorter activities with fewer choices.');
  return notes;
}

function App() {
  const [profile, setProfile] = useState(() => loadJson(STORAGE_KEY, null));
  const [progress, setProgress] = useState(() => normalizeProgress(loadJson(PROGRESS_KEY, defaultProgress)));
  const [screen, setScreen] = useState(profile ? 'home' : 'onboarding');
  const [parentUnlocked, setParentUnlocked] = useState(false);
  const [soundOff, setSoundOff] = useState(() => profile?.sensory?.includes('Sounds') ?? false);
  const [activeActivity, setActiveActivity] = useState(null);
  const [celebration, setCelebration] = useState(null);

  const personalization = useMemo(() => getPersonalization(profile), [profile]);

  function completeActivity(name, category) {
    const nextTodayActivities = Array.from(new Set([...progress.todayActivities, name]));
    const earnedBadges = [...progress.badges];
    if (nextTodayActivities.length >= progress.dailyGoal && !earnedBadges.includes('Daily Goal')) {
      earnedBadges.push('Daily Goal');
    }
    if (category === 'calm' && !earnedBadges.includes('Calm Helper')) {
      earnedBadges.push('Calm Helper');
    }
    if (nextTodayActivities.length === 1 && !earnedBadges.includes('First Step')) {
      earnedBadges.push('First Step');
    }
    if (progress.rewardStars + 2 >= 10 && !earnedBadges.includes('Star Collector')) {
      earnedBadges.push('Star Collector');
    }
    const next = {
      ...progress,
      completed: Array.from(new Set([...progress.completed, name])),
      practiced: Array.from(new Set([...progress.practiced, name])),
      counts: { ...progress.counts, [category]: (progress.counts[category] || 0) + 1 },
      rewardStars: progress.rewardStars + 2,
      todayActivities: nextTodayActivities,
      todayDone: nextTodayActivities.length >= progress.dailyGoal,
      badges: earnedBadges,
      lastActiveDate: getTodayKey()
    };
    setProgress(next);
    saveJson(PROGRESS_KEY, next);
    setCelebration({
      title: 'Great job!',
      message: `${name} is complete.`,
      stars: 2,
      badge: earnedBadges.length > progress.badges.length ? earnedBadges[earnedBadges.length - 1] : null,
      completeCount: nextTodayActivities.length,
      goal: progress.dailyGoal
    });
    setScreen('celebration');
  }

  function handleQuickChoice(choice) {
    const now = new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    const updates = {
      happy: {
        moodLog: [{ mood: 'Happy', time: now }, ...progress.moodLog].slice(0, 5),
        rewardStars: progress.rewardStars + 1,
        lastActiveDate: getTodayKey()
      },
      break: {
        breakRequests: progress.breakRequests + 1,
        counts: { ...progress.counts, calm: (progress.counts.calm || 0) + 1 },
        lastActiveDate: getTodayKey()
      },
      done: {
        todayDone: true,
        rewardStars: progress.rewardStars + 3,
        completed: Array.from(new Set([...progress.completed, 'Today check-in'])),
        practiced: Array.from(new Set([...progress.practiced, 'Today check-in'])),
        todayActivities: Array.from(new Set([...progress.todayActivities, 'Today check-in'])),
        badges: progress.badges.includes('Check-in Champ') ? progress.badges : [...progress.badges, 'Check-in Champ'],
        lastActiveDate: getTodayKey()
      }
    };
    const next = { ...progress, ...updates[choice] };
    setProgress(next);
    saveJson(PROGRESS_KEY, next);
  }

  function handleProfile(nextProfile) {
    setProfile(nextProfile);
    setSoundOff(nextProfile.sensory.includes('Sounds'));
    saveJson(STORAGE_KEY, nextProfile);
    setScreen('home');
  }

  if (screen === 'onboarding') {
    return <Onboarding onComplete={handleProfile} initialProfile={profile} />;
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <button className="brand" onClick={() => setScreen('home')} aria-label="Go home">
          <span className="brand-mark"><Sparkles size={24} /></span>
          <span>
            <strong>BrightSteps</strong>
            <small>{profile?.name ? `For ${profile.name}` : 'Learning companion'}</small>
          </span>
        </button>
        <button
          className="icon-button"
          onClick={() => setSoundOff((value) => !value)}
          aria-label={soundOff ? 'Enable sound' : 'Disable sound'}
          title={soundOff ? 'Enable sound' : 'Disable sound'}
        >
          {soundOff ? <VolumeX /> : <Volume2 />}
        </button>
      </header>

      <main className="main-content">
        {screen === 'home' && (
          <ChildHome
            profile={profile}
            personalization={personalization}
            progress={progress}
            soundOff={soundOff}
            setScreen={setScreen}
            onQuickChoice={handleQuickChoice}
          />
        )}
        {['learn', 'daily', 'social', 'play', 'calm'].includes(screen) && (
          <CategoryPage
            category={screen}
            profile={profile}
            progress={progress}
            soundOff={soundOff}
            onBack={() => setScreen('home')}
            onLesson={() => setScreen('shoeLesson')}
            onStart={(activity) => {
              setActiveActivity({ ...activity, category: screen });
              setScreen('activity');
            }}
          />
        )}
        {screen === 'activity' && activeActivity && (
          <ActivityPlayer
            activity={activeActivity}
            onBack={() => setScreen(activeActivity.category)}
            onComplete={() => {
              completeActivity(activeActivity.title, activeActivity.category);
            }}
          />
        )}
        {screen === 'celebration' && celebration && (
          <Celebration
            celebration={celebration}
            rewardStars={progress.rewardStars}
            onContinue={() => setScreen(activeActivity?.category || 'home')}
            onHome={() => setScreen('home')}
          />
        )}
        {screen === 'shoeLesson' && (
          <ShoeLesson
            onBack={() => setScreen('daily')}
            onComplete={() => {
              completeActivity('Tie Shoes', 'daily');
            }}
          />
        )}
        {screen === 'parents' && (
          parentUnlocked ? (
            <ParentDashboard
              profile={profile}
            progress={progress}
              personalization={personalization}
              onEdit={() => setScreen('onboarding')}
              onReset={() => {
                localStorage.removeItem(STORAGE_KEY);
                localStorage.removeItem(PROGRESS_KEY);
                setProfile(null);
                setProgress(normalizeProgress(defaultProgress));
                setParentUnlocked(false);
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
        <NavButton icon={<BookOpen />} label="Learn" active={screen === 'learn'} onClick={() => setScreen('learn')} />
        <NavButton icon={<Moon />} label="Calm" active={screen === 'calm'} onClick={() => setScreen('calm')} />
        <NavButton icon={<Lock />} label="Parents" active={screen === 'parents'} onClick={() => setScreen('parents')} />
      </nav>
    </div>
  );
}

function Onboarding({ onComplete, initialProfile }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(
    initialProfile || {
      name: '',
      age: '',
      grade: '',
      supportLevel: choiceSets.supportLevel[0],
      communication: choiceSets.communication[0],
      letters: choiceSets.letters[0],
      numbers: choiceSets.numbers[0],
      social: choiceSets.social[0],
      sensory: [],
      dailySkills: [],
      learningStyle: ['Images'],
      interests: []
    }
  );

  const steps = [
    {
      title: 'Child profile',
      content: (
        <div className="form-grid">
          <label>Name or nickname<input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Sam" /></label>
          <label>Age<input type="number" min="1" value={form.age} onChange={(event) => setForm({ ...form, age: event.target.value })} placeholder="6" /></label>
          <label>School grade or level<input value={form.grade} onChange={(event) => setForm({ ...form, grade: event.target.value })} placeholder="Kindergarten" /></label>
        </div>
      )
    },
    { title: 'Support and communication', content: <><ChoiceGroup label="DSM-5 support level" value={form.supportLevel} options={choiceSets.supportLevel} onChange={(value) => setForm({ ...form, supportLevel: value })} /><ChoiceGroup label="Communication ability" value={form.communication} options={choiceSets.communication} onChange={(value) => setForm({ ...form, communication: value })} /></> },
    { title: 'Learning levels', content: <><ChoiceGroup label="Letter recognition" value={form.letters} options={choiceSets.letters} onChange={(value) => setForm({ ...form, letters: value })} /><ChoiceGroup label="Number recognition" value={form.numbers} options={choiceSets.numbers} onChange={(value) => setForm({ ...form, numbers: value })} /></> },
    { title: 'Social and sensory', content: <><ChoiceGroup label="Social skills" value={form.social} options={choiceSets.social} onChange={(value) => setForm({ ...form, social: value })} /><MultiChoice label="Sensory sensitivities" values={form.sensory} options={choiceSets.sensory} onChange={(values) => setForm({ ...form, sensory: values })} /></> },
    { title: 'Daily skills', content: <MultiChoice label="Skills to practice" values={form.dailySkills} options={choiceSets.dailySkills} onChange={(values) => setForm({ ...form, dailySkills: values })} /> },
    { title: 'Learning style and interests', content: <><MultiChoice label="Preferred learning style" values={form.learningStyle} options={choiceSets.learningStyle} onChange={(values) => setForm({ ...form, learningStyle: values })} /><MultiChoice label="Favorite topics" values={form.interests} options={choiceSets.interests} onChange={(values) => setForm({ ...form, interests: values })} /></> }
  ];

  const canContinue = step !== 0 || (form.name.trim() && form.age);

  return (
    <main className="onboarding">
      <section className="onboarding-panel">
        <div className="panel-heading">
          <span className="round-icon"><Baby /></span>
          <div>
            <p className="eyebrow">Parent setup</p>
            <h1>Create a child profile</h1>
            <p>Answers personalize activity length, choices, sound, and visual support.</p>
          </div>
        </div>
        <div className="progress-track" aria-label={`Step ${step + 1} of ${steps.length}`}>
          <span style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
        </div>
        <h2>{steps[step].title}</h2>
        {steps[step].content}
        <div className="form-actions">
          <button className="secondary-button" disabled={step === 0} onClick={() => setStep(step - 1)}><ArrowLeft size={18} /> Back</button>
          {step < steps.length - 1 ? (
            <button className="primary-button" disabled={!canContinue} onClick={() => setStep(step + 1)}>Next <ChevronRight size={18} /></button>
          ) : (
            <button className="primary-button" onClick={() => onComplete({ ...form, name: form.name.trim() || 'My child' })}><Check size={18} /> Save profile</button>
          )}
        </div>
      </section>
    </main>
  );
}

function ChoiceGroup({ label, value, options, onChange }) {
  return (
    <fieldset className="choice-group">
      <legend>{label}</legend>
      <div className="choice-list">
        {options.map((option) => (
          <button key={option} type="button" className={value === option ? 'choice selected' : 'choice'} onClick={() => onChange(option)}>
            {option}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

function MultiChoice({ label, values, options, onChange }) {
  function toggle(option) {
    onChange(values.includes(option) ? values.filter((item) => item !== option) : [...values, option]);
  }
  return (
    <fieldset className="choice-group">
      <legend>{label}</legend>
      <div className="choice-list">
        {options.map((option) => (
          <button key={option} type="button" className={values.includes(option) ? 'choice selected' : 'choice'} onClick={() => toggle(option)}>
            {values.includes(option) && <Check size={16} />} {option}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

function ChildHome({ profile, personalization, progress, soundOff, setScreen, onQuickChoice }) {
  const [quickStatus, setQuickStatus] = useState(null);
  const rewardItems = getRewardItems(progress.rewardStars);
  const cards = [
    { id: 'learn', label: 'Learn', icon: <BookOpen />, tone: 'mint' },
    { id: 'daily', label: 'Daily Skills', icon: <HeartHandshake />, tone: 'sun' },
    { id: 'social', label: 'Social', icon: <Users />, tone: 'rose' },
    { id: 'play', label: 'Play', icon: <Puzzle />, tone: 'sky' },
    { id: 'calm', label: 'Calm Zone', icon: <Leaf />, tone: 'lavender' }
  ];
  const quickChoices = {
    happy: {
      icon: <Smile />,
      label: 'Happy',
      title: 'Mood saved',
      message: `${profile?.name || 'Friend'} feels happy. One reward star added.`
    },
    break: {
      icon: <Moon />,
      label: 'Break',
      title: 'Break card ready',
      message: 'Quiet choice selected. A short calm break was added to progress.'
    },
    done: {
      icon: <Star />,
      label: 'Done',
      title: 'Check-in complete',
      message: 'Today check-in is marked done. Three reward stars added.'
    }
  };

  function selectQuickChoice(choice) {
    onQuickChoice(choice);
    setQuickStatus(quickChoices[choice]);
    if (!soundOff && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(new SpeechSynthesisUtterance(quickChoices[choice].label));
    }
  }

  return (
    <>
      <section className="welcome-band">
        <div>
          <p className="eyebrow">Hello {profile?.name || 'friend'}</p>
          <h1>Choose a bright step</h1>
        </div>
        <div className="aac-row" aria-label="Quick visual choices">
          {Object.entries(quickChoices).map(([choice, item]) => (
            <button key={choice} type="button" onClick={() => selectQuickChoice(choice)}>
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>
      </section>
      <section className="daily-progress" aria-label="Daily reward progress">
        <div>
          <p className="eyebrow">Daily goal</p>
          <h2>{Math.min(progress.todayActivities.length, progress.dailyGoal)} of {progress.dailyGoal} activities</h2>
          <div className="goal-track">
            <span style={{ width: `${Math.min(100, (progress.todayActivities.length / progress.dailyGoal) * 100)}%` }} />
          </div>
        </div>
        <div className="badge-row">
          {progress.badges.length ? progress.badges.slice(-3).map((badge) => <span key={badge}><Star size={15} /> {badge}</span>) : <span><Star size={15} /> First badge waiting</span>}
        </div>
      </section>
      <section className="reward-shelf" aria-label="Reward shelf">
        <div className="streak-card">
          <Sparkles />
          <strong>{progress.streak}</strong>
          <span>day streak</span>
        </div>
        <div className="reward-list">
          {rewardItems.map((item) => (
            <div key={item.name} className={item.unlocked ? 'reward-item unlocked' : 'reward-item'}>
              <Star size={18} />
              <strong>{item.name}</strong>
              <span>{item.unlocked ? 'Unlocked' : `${item.cost} stars`}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="quick-status" aria-live="polite">
        <div>
          <p className="eyebrow">Quick check</p>
          <h2>{quickStatus?.title || 'Ready when you are'}</h2>
          <p>{quickStatus?.message || 'Tap Happy, Break, or Done to log a small moment.'}</p>
        </div>
        <div className="reward-meter" aria-label={`${progress.rewardStars} reward stars`}>
          <Star />
          <strong>{progress.rewardStars}</strong>
          <span>stars</span>
        </div>
        {quickStatus?.label === 'Break' && (
          <button className="secondary-button" type="button" onClick={() => setScreen('calm')}>
            Open Calm Zone
          </button>
        )}
      </section>
      <section className="child-grid" aria-label="Activity sections">
        {cards.map((card) => (
          <button key={card.id} className={`big-card ${card.tone}`} onClick={() => setScreen(card.id)}>
            {card.icon}
            <span>{card.label}</span>
          </button>
        ))}
      </section>
      <section className="suggestion-strip">
        <Brain />
        <div>
          <strong>Today starts here</strong>
          <span>{personalization[0] || 'Try a short picture activity.'}</span>
        </div>
      </section>
    </>
  );
}

function Celebration({ celebration, rewardStars, onContinue, onHome }) {
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
        <p className="eyebrow">Reward earned</p>
        <h1>{celebration.title}</h1>
        <p>{celebration.message}</p>
        <div className="reward-summary">
          <div><strong>+{celebration.stars}</strong><span>stars</span></div>
          <div><strong>{rewardStars}</strong><span>total</span></div>
          <div><strong>{celebration.completeCount}/{celebration.goal}</strong><span>today</span></div>
        </div>
        {celebration.badge && <div className="new-badge"><Sparkles /> New badge: {celebration.badge}</div>}
        <div className="form-actions">
          <button className="secondary-button" type="button" onClick={onHome}>Home</button>
          <button className="primary-button" type="button" onClick={onContinue}>Keep practicing</button>
        </div>
      </div>
    </section>
  );
}

function CategoryPage({ category, profile, progress, soundOff, onBack, onLesson, onStart }) {
  const titles = {
    learn: ['Learn', <BookOpen key="i" />],
    daily: ['Daily Skills', <HeartHandshake key="i" />],
    social: ['Social Skills', <Users key="i" />],
    play: ['Play', <Puzzle key="i" />],
    calm: ['Calm Zone', <Leaf key="i" />]
  };
  const list = filterActivities(category, profile);
  const completedSet = new Set(progress.completed);

  return (
    <section>
      <div className="page-title">
        <button className="icon-button" onClick={onBack} aria-label="Go back"><ArrowLeft /></button>
        <span className="round-icon">{titles[category][1]}</span>
        <div>
          <p className="eyebrow">{categoryLabels[category]} activities</p>
          <h1>{titles[category][0]}</h1>
        </div>
      </div>
      {category === 'calm' && <CalmTools />}
      <div className="activity-grid">
        {list.map((activity) => {
          const completed = completedSet.has(activity.title);
          return (
            <article className={completed ? 'activity-card completed' : 'activity-card'} key={activity.title}>
              <div className="activity-visual" aria-hidden="true">{activity.icon}</div>
              <div>
                <div className="activity-heading">
                  <h2>{activity.title}</h2>
                  {completed && <span className="done-badge"><Check size={15} /> Done</span>}
                </div>
                <p>{activity.detail || activity.tags?.join(' / ')}</p>
                {activity.title === 'Sound + Picture' && soundOff && <span className="pill">Quiet mode</span>}
              </div>
              <button className="primary-button" onClick={activity.title === 'Tie Shoes' ? onLesson : () => onStart(activity)}>
                {completed ? 'Practice again' : 'Start'}
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function ActivityPlayer({ activity, onBack, onComplete }) {
  if (activity.title === 'Memory Cards') {
    return <MemoryGame activity={activity} onBack={onBack} onComplete={onComplete} />;
  }
  if (guidedActivities[activity.title]) {
    return <GuidedActivity activity={activity} config={guidedActivities[activity.title]} onBack={onBack} onComplete={onComplete} />;
  }
  return <MatchGame activity={activity} onBack={onBack} onComplete={onComplete} />;
}

function GuidedActivity({ activity, config, onBack, onComplete }) {
  const [selected, setSelected] = useState(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [breaths, setBreaths] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(30);

  useEffect(() => {
    if (!timerStarted || secondsLeft === 0) return undefined;
    const timerId = window.setInterval(() => setSecondsLeft((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearInterval(timerId);
  }, [timerStarted, secondsLeft]);

  const choicesDone = config.type === 'choices' && selected === config.correct;
  const stepsDone = ['steps', 'script', 'turns'].includes(config.type) && stepIndex >= (config.steps || config.lines || config.turns).length;
  const breathDone = config.type === 'breath' && breaths >= 3;
  const timerDone = config.type === 'timer' && secondsLeft === 0;
  const done = choicesDone || stepsDone || breathDone || timerDone;
  const sequence = config.steps || config.lines || config.turns || [];

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
          <p className="eyebrow">Easy practice</p>
          <h2>{config.prompt}</h2>
        </div>

        {config.type === 'choices' && (
          <>
            <div className="target-card">{config.visual}</div>
            <div className="game-choices">
              {config.choices.map((choice) => (
                <button
                  key={choice}
                  type="button"
                  className={selected === choice ? 'game-choice selected' : 'game-choice'}
                  onClick={() => setSelected(choice)}
                >
                  {choice}
                </button>
              ))}
            </div>
          </>
        )}

        {['steps', 'script', 'turns'].includes(config.type) && (
          <div className="sequence-board">
            {sequence.map((item, index) => (
              <button
                key={item}
                type="button"
                className={index < stepIndex ? 'sequence-step done' : 'sequence-step'}
                disabled={index !== stepIndex}
                onClick={() => setStepIndex((value) => value + 1)}
              >
                <span>{index + 1}</span>
                {item}
              </button>
            ))}
          </div>
        )}

        {config.type === 'breath' && (
          <div className="breath-practice">
            <div className="breathing-orb" aria-hidden="true" />
            <strong>{breaths} of 3 breaths</strong>
            <button className="primary-button" type="button" onClick={() => setBreaths((value) => Math.min(3, value + 1))}>
              I breathed
            </button>
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
            <strong>{done ? 'Nice work!' : 'Keep trying.'}</strong>
            <span>{done ? 'This activity is ready to finish.' : 'Try the matching answer or next step.'}</span>
          </div>
        )}

        <div className="form-actions">
          <button className="secondary-button" type="button" onClick={() => {
            setSelected(null);
            setStepIndex(0);
            setBreaths(0);
            setTimerStarted(false);
            setSecondsLeft(30);
          }}>
            Reset
          </button>
          <button className="primary-button" type="button" disabled={!done} onClick={onComplete}>
            <Star size={18} /> Finish
          </button>
        </div>
      </div>
    </section>
  );
}

function MatchGame({ activity, onBack, onComplete }) {
  const game = activityGames[activity.title] || {
    prompt: 'Choose the best match.',
    target: { label: activity.icon, value: activity.title },
    choices: [
      { label: activity.title, value: activity.title },
      { label: 'Try later', value: 'later' },
      { label: 'Break', value: 'break' },
      { label: 'Help', value: 'help' }
    ]
  };
  const [selected, setSelected] = useState(null);
  const isCorrect = selected?.value === game.target.value;

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
          <p className="eyebrow">Your turn</p>
          <h2>{game.prompt}</h2>
        </div>
        <div
          className={activity.title === 'Color Match' ? 'target-card color-target' : 'target-card'}
          style={activity.title === 'Color Match' ? { '--target-color': game.target.value } : undefined}
        >
          {activity.title === 'Number Garden' ? 'FLOWER FLOWER FLOWER' : game.target.label}
        </div>
        <div className="game-choices">
          {game.choices.map((choice) => (
            <button
              key={choice.label}
              type="button"
              className={selected?.label === choice.label ? 'game-choice selected' : 'game-choice'}
              onClick={() => setSelected(choice)}
            >
              {activity.title === 'Color Match' && <span className="color-swatch" style={{ background: choice.value }} />}
              {choice.label}
            </button>
          ))}
        </div>
        {selected && (
          <div className={isCorrect ? 'game-feedback success' : 'game-feedback'}>
            <strong>{isCorrect ? 'Great match!' : 'Try one more time.'}</strong>
            <span>{isCorrect ? 'You found the right answer.' : 'Look at the big card and pick the same one.'}</span>
          </div>
        )}
        <div className="form-actions">
          <button className="secondary-button" type="button" onClick={() => setSelected(null)}>Reset</button>
          <button className="primary-button" type="button" disabled={!isCorrect} onClick={onComplete}>
            <Star size={18} /> Finish
          </button>
        </div>
      </div>
    </section>
  );
}

function MemoryGame({ activity, onBack, onComplete }) {
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const complete = matched.length === memoryCards.length;

  function chooseCard(card) {
    if (flipped.includes(card.id) || matched.includes(card.id) || flipped.length === 2) return;
    const nextFlipped = [...flipped, card.id];
    setFlipped(nextFlipped);
    if (nextFlipped.length === 2) {
      const pair = memoryCards.filter((item) => nextFlipped.includes(item.id));
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
          <p className="eyebrow">Find pairs</p>
          <h2>Turn over two cards. Match the same pictures.</h2>
        </div>
        <div className="memory-grid">
          {memoryCards.map((card) => {
            const visible = flipped.includes(card.id) || matched.includes(card.id);
            return (
              <button
                key={card.id}
                type="button"
                className={visible ? 'memory-card visible' : 'memory-card'}
                onClick={() => chooseCard(card)}
                aria-label={visible ? card.label : 'Hidden card'}
              >
                {visible ? card.label : '?'}
              </button>
            );
          })}
        </div>
        <div className={complete ? 'game-feedback success' : 'game-feedback'}>
          <strong>{complete ? 'All pairs found!' : `${matched.length / 2} of 4 pairs`}</strong>
          <span>{complete ? 'Memory activity is complete.' : 'Keep looking for matching cards.'}</span>
        </div>
        <div className="form-actions">
          <button className="secondary-button" type="button" onClick={() => {
            setFlipped([]);
            setMatched([]);
          }}>
            Reset
          </button>
          <button className="primary-button" type="button" disabled={!complete} onClick={onComplete}>
            <Star size={18} /> Finish
          </button>
        </div>
      </div>
    </section>
  );
}

function filterActivities(category, profile) {
  if (category !== 'learn') return activities[category];
  return activities.learn.filter((activity) => {
    if (profile?.letters === 'Does not recognize letters' && activity.level === 'word') return false;
    return true;
  });
}

function ShoeLesson({ onBack, onComplete }) {
  const [step, setStep] = useState(0);
  const current = lessonSteps[step];
  return (
    <section className="lesson">
      <div className="page-title">
        <button className="icon-button" onClick={onBack} aria-label="Back to daily skills"><ArrowLeft /></button>
        <span className="round-icon"><HeartHandshake /></span>
        <h1>Tie Shoes</h1>
      </div>
      <div className="lesson-stage">
        <div className="lesson-visual">{current.visual}</div>
        <div>
          <p className="eyebrow">Step {step + 1} of {lessonSteps.length}</p>
          <h2>{current.title}</h2>
          <p>{current.text}</p>
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
          <button className="primary-button" onClick={onComplete}><Star size={18} /> Done</button>
        )}
      </div>
    </section>
  );
}

function CalmTools() {
  const [secondsLeft, setSecondsLeft] = useState(120);
  const [running, setRunning] = useState(false);
  const [breakRequested, setBreakRequested] = useState(false);

  useEffect(() => {
    if (!running || secondsLeft === 0) return undefined;
    const timerId = window.setInterval(() => setSecondsLeft((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearInterval(timerId);
  }, [running, secondsLeft]);

  useEffect(() => {
    if (secondsLeft === 0) setRunning(false);
  }, [secondsLeft]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = String(secondsLeft % 60).padStart(2, '0');

  return (
    <div className="calm-panel">
      <div className="breathing-orb" aria-hidden="true" />
      <div>
        <h2>Breathe slowly</h2>
        <p>{breakRequested ? 'Break card ready. Fewer words, quiet space.' : 'In, out, rest.'}</p>
      </div>
      <button className="break-button" type="button" aria-pressed={breakRequested} onClick={() => setBreakRequested((value) => !value)}>
        I need a break
      </button>
      <div className="timer" aria-live="polite"><Clock /> {minutes}:{seconds}</div>
      <div className="calm-actions">
        <button className="secondary-button" type="button" onClick={() => setRunning((value) => !value)}>
          {running ? 'Pause' : 'Start'}
        </button>
        <button className="secondary-button" type="button" onClick={() => {
          setRunning(false);
          setSecondsLeft(120);
        }}>
          Reset
        </button>
      </div>
    </div>
  );
}

function ParentGate({ onUnlock, onBack }) {
  const [confirmed, setConfirmed] = useState(false);
  return (
    <section className="parent-gate">
      <Lock size={42} />
      <h1>Adult Area</h1>
      <p>For grown-ups. Please confirm to continue.</p>
      <label className="confirm-row">
        <input type="checkbox" checked={confirmed} onChange={(event) => setConfirmed(event.target.checked)} />
        I am a parent, caregiver, or educator.
      </label>
      <div className="form-actions">
        <button className="secondary-button" onClick={onBack}>Back</button>
        <button className="primary-button" disabled={!confirmed} onClick={onUnlock}>Enter</button>
      </div>
    </section>
  );
}

function ParentDashboard({ profile, progress, personalization, onEdit, onReset }) {
  const nextActivities = [
    profile?.dailySkills?.[0] || 'Washing hands',
    profile?.communication === 'Non-verbal' ? 'AAC help choices' : 'Ask for help story',
    profile?.letters === 'Does not recognize letters' ? 'Letter Match' : 'Simple Words'
  ];
  return (
    <section className="parent-dashboard">
      <div className="parent-hero">
        <div>
          <p className="eyebrow">Parent dashboard</p>
          <h1>{profile?.name}'s profile and progress</h1>
        </div>
        <div className="parent-actions">
          <button className="secondary-button" onClick={onEdit}><RotateCcw size={18} /> Edit profile</button>
          <button className="danger-button" onClick={onReset}>Reset</button>
        </div>
      </div>
      <div className="dashboard-grid">
        <DashboardPanel title="Child Profile" icon={<Baby />}>
          <InfoRow label="Age" value={profile?.age} />
          <InfoRow label="Grade / level" value={profile?.grade || 'Not set'} />
          <InfoRow label="Support" value={profile?.supportLevel} />
          <InfoRow label="Communication" value={profile?.communication} />
        </DashboardPanel>
        <DashboardPanel title="Progress" icon={<Palette />}>
          <div className="stats-grid">
            {Object.entries(progress.counts).map(([key, value]) => <div key={key}><strong>{value}</strong><span>{key}</span></div>)}
          </div>
        </DashboardPanel>
        <DashboardPanel title="Quick Check-ins" icon={<Smile />}>
          <InfoRow label="Reward stars" value={progress.rewardStars} />
          <InfoRow label="Break requests" value={progress.breakRequests} />
          <InfoRow label="Today done" value={progress.todayDone ? 'Yes' : 'Not yet'} />
        </DashboardPanel>
        <DashboardPanel title="Daily Rewards" icon={<Star />}>
          <InfoRow label="Daily goal" value={`${progress.todayActivities.length}/${progress.dailyGoal}`} />
          <InfoRow label="Badges" value={progress.badges.length || 'None yet'} />
          <InfoRow label="Day streak" value={progress.streak} />
          <TagList items={progress.todayActivities.length ? progress.todayActivities : ['No activities today']} />
        </DashboardPanel>
        <DashboardPanel title="Reward Shelf" icon={<Sparkles />}>
          <TagList items={getRewardItems(progress.rewardStars).map((item) => item.unlocked ? `${item.name} unlocked` : `${item.name}: ${item.cost} stars`)} />
        </DashboardPanel>
        <DashboardPanel title="Mood Log" icon={<Moon />}>
          <TagList items={progress.moodLog.length ? progress.moodLog.map((item) => `${item.mood} at ${item.time}`) : ['No mood check yet']} />
        </DashboardPanel>
        <DashboardPanel title="Completed Activities" icon={<Check />}>
          <TagList items={progress.completed} />
        </DashboardPanel>
        <DashboardPanel title="Skills Being Practiced" icon={<Sparkles />}>
          <TagList items={progress.practiced} />
        </DashboardPanel>
        <DashboardPanel title="Suggested Next Activities" icon={<ChevronRight />}>
          <TagList items={nextActivities} />
        </DashboardPanel>
        <DashboardPanel title="Personalization" icon={<Brain />}>
          <TagList items={personalization} />
        </DashboardPanel>
        <DashboardPanel title="Parent Resources" icon={<Info />}>
          <ul className="resource-list">{resources.map((item) => <li key={item}>{item}</li>)}</ul>
        </DashboardPanel>
        <DashboardPanel title="Emergency / Meltdown Support" icon={<Shield />}>
          <p>Keep the child safe, use fewer words, lower lights and sound where possible, offer a break, and wait before teaching or correcting.</p>
        </DashboardPanel>
      </div>
      <aside className="disclaimer">
        This app is educational and supportive. It does not diagnose autism, provide medical advice, or replace therapy, clinical care, or guidance from qualified professionals.
      </aside>
    </section>
  );
}

function DashboardPanel({ title, icon, children }) {
  return (
    <article className="dashboard-panel">
      <h2>{icon}{title}</h2>
      {children}
    </article>
  );
}

function InfoRow({ label, value }) {
  return <p className="info-row"><span>{label}</span><strong>{value}</strong></p>;
}

function TagList({ items }) {
  return <div className="tag-list">{items.map((item) => <span key={item}>{item}</span>)}</div>;
}

function NavButton({ icon, label, active, onClick }) {
  return (
    <button className={active ? 'nav-button active' : 'nav-button'} onClick={onClick}>
      {icon}
      <span>{label}</span>
    </button>
  );
}

createRoot(document.getElementById('root')).render(<App />);
