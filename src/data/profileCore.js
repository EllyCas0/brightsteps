import { getTodayKey } from '../lib/storage.js';

export const supportLevelDetails = [
  {
    value: 'Level 1: Requires Support',
    title: 'Level 1',
    subtitle: 'Requires Support',
    description: 'Some support may be helpful with communication, routines, or social situations.'
  },
  {
    value: 'Level 2: Requires Substantial Support',
    title: 'Level 2',
    subtitle: 'Requires Substantial Support',
    description: 'More consistent support may be needed across daily activities.'
  },
  {
    value: 'Level 3: Requires Very Substantial Support',
    title: 'Level 3',
    subtitle: 'Requires Very Substantial Support',
    description: 'Significant and ongoing support may be needed across daily activities.'
  }
];

export const choiceSets = {
  supportLevel: supportLevelDetails.map((level) => level.value),
  communicationByLevel: {
    'Level 1: Requires Support': [
      'Back-and-forth conversation support',
      'Initiates or responds with reminders',
      'Shares interests or emotions with prompts',
      'Needs help adjusting to social settings'
    ],
    'Level 2: Requires Substantial Support': [
      'Limited back-and-forth communication',
      'Reduced initiation of social interaction',
      'Reduced response to social interaction',
      'Needs verbal and nonverbal support',
      'Uses AAC or visual communication'
    ],
    'Level 3: Requires Very Substantial Support': [
      'Very limited initiation of interaction',
      'Minimal response to social interaction',
      'Very limited verbal communication',
      'Needs picture cards or AAC',
      'Needs facial expression or gesture support'
    ]
  },
  age: ['2 years', '3 years', '4 years', '5 years', '6 years', '7 years', '8 years', '9 years', '10+ years'],
  letters: [
    'Does not recognize letters',
    'Recognizes some letters',
    'Can read simple words',
    'Can read fluently'
  ],
  numbers: [
    'Does not recognize numbers',
    'Recognizes numbers 1-10',
    'Recognizes numbers beyond 10'
  ],
  sensory: ['Sounds', 'Lights', 'Textures', 'Food', 'Touch', 'Crowds'],
  dailySkills: [
    'Dressing',
    'Brushing teeth',
    'Tying shoes',
    'Washing hands',
    'Using the bathroom',
    'Eating independently',
    'Following routines'
  ],
  objectives: [
    'Communication',
    'Social interaction',
    'Emotional regulation',
    'Daily independence',
    'Self-care routines',
    'Attention and following directions',
    'Reading and words',
    'Numbers and logic'
  ],
  interests: ['Animals', 'Cars', 'Music', 'Colors', 'Dinosaurs', 'Space']
};

export const defaultProgress = {
  completed: [],
  practiced: [],
  counts: { learn: 3, daily: 2, speech: 0, social: 1, play: 4, calm: 2 },
  moodLog: [],
  rewardStars: 2,
  todayDone: false,
  dailyGoal: 3,
  todayActivities: [],
  badges: [],
  streak: 0,
  hasSeenHome: false,
  lastActiveDate: getTodayKey()
};

export const defaultProfile = {
  id: '',
  name: '',
  avatar: 'Avatar Boy 1',
  age: choiceSets.age[0],
  supportLevel: '',
  communication: [],
  letters: choiceSets.letters[0],
  numbers: choiceSets.numbers[0],
  sensory: [],
  dailySkills: [],
  objectives: [],
  learningStyle: ['Images'],
  interests: [],
  diagnosisConfirmed: false
};

export const avatarOptions = [
  { key: 'Avatar Boy 1', label: 'Boy 1' },
  { key: 'Avatar Girl 1', label: 'Girl 1' },
  { key: 'Avatar Boy 2', label: 'Boy 2' },
  { key: 'Avatar Girl 2', label: 'Girl 2' }
];

export const moodAvatarMap = {
  'Avatar Boy 1': {
    Angry: 'Boy Angry',
    Excited: 'Boy Excited',
    Happy: 'Boy Happy',
    Mad: 'Boy Angry',
    Okay: 'Boy Okay',
    Sad: 'Boy Sad',
    Sleepy: 'Tired',
    Tired: 'Tired',
    Worried: 'Boy Worried'
  },
  'Avatar Boy 2': {
    Angry: 'Boy 2 Mad',
    Excited: 'Boy 2 Excited',
    Happy: 'Boy 2 Happy',
    Mad: 'Boy 2 Mad',
    Okay: 'Boy 2 Okay',
    Sad: 'Boy 2 Sad',
    Sleepy: 'Tired',
    Tired: 'Tired',
    Worried: 'Boy 2 Worried'
  },
  'Avatar Girl 1': {
    Angry: 'Girl 1 Mad',
    Excited: 'Girl 1 Excited',
    Happy: 'Girl 1 Happy',
    Mad: 'Girl 1 Mad',
    Okay: 'Girl 1 Okay',
    Sad: 'Girl 1 Sad',
    Sleepy: 'Tired',
    Tired: 'Tired',
    Worried: 'Girl 1 Worried'
  },
  'Avatar Girl 2': {
    Angry: 'Girl 2 Mad',
    Excited: 'Girl 2 Excited',
    Happy: 'Girl 2 Happy',
    Mad: 'Girl 2 Mad',
    Okay: 'Girl 2 Okay',
    Sad: 'Girl 2 Sad',
    Sleepy: 'Tired',
    Tired: 'Tired',
    Worried: 'Girl 2 Worried'
  }
};

export function normalizeAvatar(avatar) {
  if (avatarOptions.some((option) => option.key === avatar)) return avatar;
  return defaultProfile.avatar;
}

export function getMoodAvatar(mood, avatar = defaultProfile.avatar) {
  const avatarMoods = moodAvatarMap[avatar] || moodAvatarMap[defaultProfile.avatar];
  return avatarMoods?.[mood] || avatar;
}

export function getCommunicationOptions(supportLevel) {
  const normalizedLevel = supportLevelDetails.find((level) => supportLevel?.startsWith(level.title))?.value;
  return choiceSets.communicationByLevel[normalizedLevel] || [];
}

export function normalizeSupportLevel(supportLevel) {
  return supportLevelDetails.find((level) => supportLevel?.startsWith(level.title))?.value || supportLevel || '';
}
