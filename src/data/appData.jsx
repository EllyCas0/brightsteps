import angryFaceImage from '../assets/images/angry-face.png';
import backpackImage from '../assets/images/backpack.png';
import bathroomImage from '../assets/images/bathroom.png';
import bedImage from '../assets/images/bed.png';
import breakImage from '../assets/images/break.png';
import breatheImage from '../assets/images/breathe.png';
import brushStep1Image from '../assets/images/brush-step-1-toothpaste.png';
import brushStep2Image from '../assets/images/brush-step-2-brush-top.png';
import brushStep3Image from '../assets/images/brush-step-3-brush-bottom.png';
import brushStep4Image from '../assets/images/brush-step-4-rinse.png';
import brushStep5Image from '../assets/images/brush-step-5-smile.png';
import brushTeethImage from '../assets/images/brush-teeth.png';
import calmImage from '../assets/images/calm.jpeg';
import calmBreakImage from '../assets/images/calm-break.png';
import catImage from '../assets/images/cat.png';
import cupImage from '../assets/images/cup.png';
import doneImage from '../assets/images/done.png';
import eyeImage from '../assets/images/eye.png';
import excitedFaceImage from '../assets/images/excited-face.png';
import flowerImage from '../assets/images/flower.png';
import heartImage from '../assets/images/heart.png';
import happyFaceImage from '../assets/images/happy-face.png';
import needsBoardImage from '../assets/images/needs-board.png';
import okayFaceImage from '../assets/images/okay-face.png';
import loveAndSpaceImage from '../assets/images/love-and-space.jpeg';
import sadFaceImage from '../assets/images/sad-face.png';
import sensoryImage from '../assets/images/sensory.jpeg';
import shapeSortImage from '../assets/images/shape-sort.png';
import somethingHurtsImage from '../assets/images/something-hurts.jpeg';
import sunImage from '../assets/images/sun.png';
import tieStep1Image from '../assets/images/tie-step-1.png';
import tieStep2Image from '../assets/images/tie-step-2.png';
import tieStep3Image from '../assets/images/tie-step-3.png';
import tieStep4Image from '../assets/images/tie-step-4.png';
import tieStep5Image from '../assets/images/tie-step-5.png';
import tieShoesImage from '../assets/images/tie-shoes.png';
import tiredFaceImage from '../assets/images/tired-face.png';
import toysImage from '../assets/images/toys.png';
import washHandsImage from '../assets/images/wash-hands.png';
import waterImage from '../assets/images/water.png';
import worriedFaceImage from '../assets/images/worried-face.png';
import yogaImage from '../assets/images/yoga.png';
import avatarBoy2 from '../assets/avatars/avatar-boy-2.png';
import avatarGirl1 from '../assets/avatars/avatar-girl-1.png';
import avatarGirl2 from '../assets/avatars/avatar-girl-2.png';
import boyAngryAvatar from '../assets/avatars/boy-angry.png';
import boy2ExcitedAvatar from '../assets/avatars/boy-2-excited.png';
import boy2MadAvatar from '../assets/avatars/boy-2-mad.png';
import boy2OkayAvatar from '../assets/avatars/boy-2-okay.png';
import boy2SadAvatar from '../assets/avatars/boy-2-sad.png';
import boy2WorriedAvatar from '../assets/avatars/boy-2-worried.png';
import boyExcitedAvatar from '../assets/avatars/boy-excited.png';
import boyHappyAvatar from '../assets/avatars/boy-happy.png';
import boyOkayAvatar from '../assets/avatars/boy-okay.png';
import boySadAvatar from '../assets/avatars/boy-sad.png';
import boyWorriedAvatar from '../assets/avatars/boy-worried.png';
import boyWashingHandsAvatar from '../assets/avatars/boy-washing-hands.png';
import girl1ExcitedAvatar from '../assets/avatars/girl-1-excited.png';
import girl1MadAvatar from '../assets/avatars/girl-1-mad.png';
import girl1OkayAvatar from '../assets/avatars/girl-1-okay.png';
import girl1SadAvatar from '../assets/avatars/girl-1-sad.png';
import girl1WorriedAvatar from '../assets/avatars/girl-1-worried.png';
import girl2ExcitedAvatar from '../assets/avatars/girl-2-excited.png';
import girl2MadAvatar from '../assets/avatars/girl-2-mad.png';
import girl2OkayAvatar from '../assets/avatars/girl-2-okay.png';
import girl2SadAvatar from '../assets/avatars/girl-2-sad.png';
import girl2WorriedAvatar from '../assets/avatars/girl-2-worried.png';
import carsBackground from '../assets/backgrounds-by-topic/cars.png';
import dinosBackground from '../assets/backgrounds-by-topic/dinos.png';
import dragonsBackground from '../assets/backgrounds-by-topic/dragons.png';
import flowersBackground from '../assets/backgrounds-by-topic/flowers.png';
import rocketsBackground from '../assets/backgrounds-by-topic/rockets.png';
import unicornsBackground from '../assets/backgrounds-by-topic/unicorns.png';
import { Bone, Car, Flame, Flower2, Rocket, Sparkles } from 'lucide-react';
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

export const categoryLabels = {
  learn: 'Learn',
  daily: 'Daily',
  speech: 'Communication',
  social: 'Social',
  play: 'Games',
  calm: 'Calm'
};

export const backgroundTopics = [
  { id: 'cars', label: 'Cars', image: carsBackground, icon: Car },
  { id: 'dinos', label: 'Dinos', image: dinosBackground, icon: Bone },
  { id: 'dragons', label: 'Dragons', image: dragonsBackground, icon: Flame },
  { id: 'flowers', label: 'Flowers', image: flowersBackground, icon: Flower2 },
  { id: 'rockets', label: 'Rockets', image: rocketsBackground, icon: Rocket },
  { id: 'unicorns', label: 'Unicorns', image: unicornsBackground, icon: Sparkles }
];

export function getBackgroundTopic(topicId) {
  return backgroundTopics.find((topic) => topic.id === topicId) || null;
}

export const imageAssets = {
  'Avatar Boy 1': boyHappyAvatar,
  'Avatar Boy 2': avatarBoy2,
  'Avatar Girl 1': avatarGirl1,
  'Avatar Girl 2': avatarGirl2,
  'Boy Angry': boyAngryAvatar,
  'Boy 2 Excited': boy2ExcitedAvatar,
  'Boy 2 Happy': avatarBoy2,
  'Boy 2 Mad': boy2MadAvatar,
  'Boy 2 Okay': boy2OkayAvatar,
  'Boy 2 Sad': boy2SadAvatar,
  'Boy 2 Worried': boy2WorriedAvatar,
  'Boy Excited': boyExcitedAvatar,
  'Boy Happy': boyHappyAvatar,
  'Boy Okay': boyOkayAvatar,
  'Boy Sad': boySadAvatar,
  'Boy Worried': boyWorriedAvatar,
  'Boy Washing Hands': boyWashingHandsAvatar,
  'Girl 1 Excited': girl1ExcitedAvatar,
  'Girl 1 Happy': avatarGirl1,
  'Girl 1 Mad': girl1MadAvatar,
  'Girl 1 Okay': girl1OkayAvatar,
  'Girl 1 Sad': girl1SadAvatar,
  'Girl 1 Worried': girl1WorriedAvatar,
  'Girl 2 Excited': girl2ExcitedAvatar,
  'Girl 2 Happy': avatarGirl2,
  'Girl 2 Mad': girl2MadAvatar,
  'Girl 2 Okay': girl2OkayAvatar,
  'Girl 2 Sad': girl2SadAvatar,
  'Girl 2 Worried': girl2WorriedAvatar,
  Angry: angryFaceImage,
  A: happyFaceImage,
  Backpack: backpackImage,
  BAG: backpackImage,
  Bed: bedImage,
  bed: bedImage,
  BELL: doneImage,
  Blue: waterImage,
  'Brush Step 1': brushStep1Image,
  'Brush Step 2': brushStep2Image,
  'Brush Step 3': brushStep3Image,
  'Brush Step 4': brushStep4Image,
  'Brush Step 5': brushStep5Image,
  'Brush Teeth': brushTeethImage,
  Breathe: breatheImage,
  B: backpackImage,
  Bathroom: bathroomImage,
  'Bathroom Routine': bathroomImage,
  Calm: calmImage,
  'Calm Break': calmImage,
  'Color Match': flowerImage,
  COLOR: flowerImage,
  Cloud: flowerImage,
  CHECK: doneImage,
  Circle: flowerImage,
  TOOTH: brushTeethImage,
  CAT: catImage,
  Cat: catImage,
  cat: catImage,
  Cup: cupImage,
  cup: cupImage,
  'Drink Water Reminder': waterImage,
  Done: doneImage,
  Eye: eyeImage,
  Excited: excitedFaceImage,
  FEEL: happyFaceImage,
  FLOWER: flowerImage,
  Food: cupImage,
  'Fast food': cupImage,
  Flower: flowerImage,
  Green: flowerImage,
  HAPPY: happyFaceImage,
  Happy: happyFaceImage,
  Heart: heartImage,
  Help: needsBoardImage,
  HELP: needsBoardImage,
  HI: happyFaceImage,
  Mad: angryFaceImage,
  'Memory Cards': heartImage,
  More: needsBoardImage,
  'Morning Routine': sunImage,
  Moon: calmImage,
  M: heartImage,
  Needs: needsBoardImage,
  Okay: okayFaceImage,
  Rain: waterImage,
  Red: flowerImage,
  SAD: sadFaceImage,
  Sad: sadFaceImage,
  Square: backpackImage,
  Star: doneImage,
  Simple: catImage,
  Sleep: bedImage,
  Sleepy: tiredFaceImage,
  Surprised: excitedFaceImage,
  Sun: sunImage,
  sun: sunImage,
  S: sunImage,
  Thirsty: waterImage,
  TIRED: tiredFaceImage,
  'Tie Shoes': tieShoesImage,
  LACE: tieShoesImage,
  Leaf: flowerImage,
  Triangle: backpackImage,
  Tired: tiredFaceImage,
  TV: needsBoardImage,
  Water: waterImage,
  Worried: worriedFaceImage,
  Yellow: sunImage,
  'Emotion Match': happyFaceImage,
  'Feel Check': happyFaceImage,
  Feelings: happyFaceImage,
  Faces: sadFaceImage,
  'Match Pairs': sunImage,
  'Number Garden': flowerImage,
  'ABC 123 Sequence': flowerImage,
  PAIR: sunImage,
  RAIN: waterImage,
  RED: flowerImage,
  SHARE: heartImage,
  SHIRT: backpackImage,
  SOAP: washHandsImage,
  SOFT: calmImage,
  SORT: shapeSortImage,
  SND: waterImage,
  STAR: doneImage,
  'Simple Words': catImage,
  'Say Hello': happyFaceImage,
  'Speech Table': needsBoardImage,
  'Speech Board': needsBoardImage,
  'I Want Board': needsBoardImage,
  'I Need Help': needsBoardImage,
  'Yes or No': doneImage,
  'More or Done': doneImage,
  'Choice Board': needsBoardImage,
  'Feeling Words': happyFaceImage,
  'I want': needsBoardImage,
  'I need': needsBoardImage,
  'I feel': happyFaceImage,
  'Love & Space': loveAndSpaceImage,
  'More please': needsBoardImage,
  'All done': doneImage,
  'Something Hurts': somethingHurtsImage,
  Eat: cupImage,
  Drink: waterImage,
  Play: toysImage,
  Yes: doneImage,
  No: angryFaceImage,
  Break: breakImage,
  Toy: toysImage,
  Again: doneImage,
  Stop: angryFaceImage,
  First: sunImage,
  Then: doneImage,
  Please: heartImage,
  'Thank you': heartImage,
  'Shape Sort': shapeSortImage,
  'Sort by Size': shapeSortImage,
  'Soft Visuals': calmImage,
  'Bedtime Routine': bedImage,
  'Copy Movements': happyFaceImage,
  'Count Sheep': bedImage,
  'Pack Backpack': backpackImage,
  AAC: needsBoardImage,
  AIR: breatheImage,
  AM: sunImage,
  FACE: sadFaceImage,
  'Get Dressed': backpackImage,
  'Letter Match': happyFaceImage,
  'Share Toys': toysImage,
  Headphones: sensoryImage,
  'Sensory Needs': sensoryImage,
  'Sensory Play': sensoryImage,
  'Sound + Picture': waterImage,
  'Sound Match': waterImage,
  'Tie Step 1': tieStep1Image,
  'Tie Step 2': tieStep2Image,
  'Tie Step 3': tieStep3Image,
  'Tie Step 4': tieStep4Image,
  'Tie Step 5': tieStep5Image,
  'Take Turns': heartImage,
  TIME: doneImage,
  Timer: doneImage,
  TURN: heartImage,
  'Wash Hands': washHandsImage,
  'Today check-in': doneImage,
  'Yoga Calm': yogaImage,
  'Stretch Break': yogaImage
};

export const avatarOptions = [
  { key: 'Avatar Boy 1', label: 'Boy 1' },
  { key: 'Avatar Girl 1', label: 'Girl 1' },
  { key: 'Avatar Boy 2', label: 'Boy 2' },
  { key: 'Avatar Girl 2', label: 'Girl 2' }
];

export function normalizeAvatar(avatar) {
  if (avatarOptions.some((option) => option.key === avatar)) return avatar;
  return defaultProfile.avatar;
}

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

export function getImageAsset(key) {
  return key ? imageAssets[key] : null;
}

export const activities = {
  learn: [
    { title: 'Letter Match', icon: 'A', level: 'basic', detail: 'Match the same uppercase letter', tags: ['letters', 'images'] },
    { title: 'Simple Words', icon: 'CAT', level: 'word', detail: 'Pick the word that matches a picture', tags: ['reading'] },
    { title: 'Number Garden', icon: '1 2', level: 'basic', detail: 'Count pictures and choose the number', tags: ['numbers'] },
    { title: 'ABC 123 Sequence', icon: 'A 1', level: 'basic', detail: 'Put letters and numbers in order', tags: ['letters', 'numbers', 'sequence'] },
    { title: 'Shape Sort', icon: 'SH', level: 'basic', detail: 'Match shapes into the right group', tags: ['shapes'] },
    { title: 'Memory Cards', icon: 'M', level: 'basic', detail: 'Flip cards and find matching pairs', tags: ['memory'] },
    { title: 'Color Match', icon: 'RED', level: 'basic', detail: 'Choose the color that matches the card', tags: ['colors'] }
  ],
  daily: [
    { title: 'Tie Shoes', icon: 'LACE', detail: 'Step-by-step shoe tying' },
    { title: 'Brush Teeth', icon: 'TOOTH', detail: 'Gentle routine practice' },
    { title: 'Wash Hands', icon: 'SOAP', detail: 'Clean hands sequence' },
    { title: 'Bathroom Routine', icon: 'Bathroom', detail: 'Independent bathroom steps' },
    { title: 'Get Dressed', icon: 'SHIRT', detail: 'Clothes in order' },
    { title: 'Pack Backpack', icon: 'BAG', detail: 'School-ready checklist' },
    { title: 'Drink Water Reminder', icon: 'Water', detail: 'Remember to drink water' },
    { title: 'Bedtime Routine', icon: 'Bedtime Routine', detail: 'Calm sequence before sleep' },
    { title: 'Morning Routine', icon: 'AM', detail: 'First, next, then' }
  ],
  speech: [
    { title: 'My Voice', icon: 'Speech Board', detail: 'Tap picture words to speak a clear message' },
    { title: 'I Want Board', icon: 'I want', detail: 'Practice asking for a favorite item' },
    { title: 'I Need Help', icon: 'HELP', detail: 'Use help, break, bathroom, or water words' },
    { title: 'Yes or No', icon: 'Yes', detail: 'Choose yes, no, stop, or again' },
    { title: 'More or Done', icon: 'More', detail: 'Practice more, finished, please, and thank you' },
    { title: 'Feeling Words', icon: 'FEEL', detail: 'Say a feeling with a picture cue' }
  ],
  social: [
    { title: 'Say Hello', storyTitle: 'Mia Goes to the Playground', icon: 'HI', detail: 'Practice greeting someone.' },
    { title: 'Take Turns', storyTitle: 'Building a Tower Together', icon: 'TURN', detail: 'Practice waiting and taking turns.' },
    { title: 'Share Toys', storyTitle: 'Playing With Cars', icon: 'SHARE', detail: 'Practice offering a toy.' },
    { title: 'Copy Movements', storyTitle: 'Copy Leo!', icon: 'Copy Movements', detail: 'Practice copying safe movements.' },
    { title: 'Feelings', storyTitle: 'How Does Leo Feel?', icon: 'FEEL', detail: 'Practice naming a feeling.' },
    { title: 'Faces', storyTitle: 'Look at Their Face', icon: 'FACE', detail: 'Practice noticing facial expression.' }
  ],
  play: [
    { title: 'Memory Cards', icon: 'Memory Cards', detail: 'Flip cards and find matching pairs' },
    { title: 'Match Pairs', icon: 'PAIR', detail: 'Match things that go together' },
    { title: 'Shape Sort', icon: 'Shape Sort', detail: 'Sort 3 shapes into matching groups' },
    { title: 'Sort by Size', icon: 'Shape Sort', detail: 'Sort small, medium, and big' },
    { title: 'Emotion Match', icon: 'Emotion Match', detail: 'Match 3 feeling faces' },
    { title: 'Sound Match', icon: 'SND', detail: 'Listen and match 3 sounds' }
  ],
  calm: [
    { title: 'Breathe', icon: 'AIR', detail: 'Slow visual breathing' },
    { title: 'Yoga Calm', icon: 'Yoga Calm', detail: 'Cartoon-style stretch and breathe' },
    { title: 'Stretch Break', icon: 'Stretch Break', detail: 'Gentle stretches to calm the body' },
    { title: 'Calm Sounds', icon: 'SND', detail: 'Choose a gentle background sound' },
    { title: 'Sensory Play', icon: 'Sensory Play', detail: 'Pick a calm sensory activity' }
  ]
};

export const learnSections = [
  {
    id: 'daily',
    title: 'Daily Skills',
    icon: 'Tie Shoes',
    detail: 'Practice routines like shoes, teeth, hands, bathroom, dressing, water, and bedtime.'
  },
  {
    id: 'social',
    title: 'Social',
    icon: 'Take Turns',
    detail: 'Practice greetings, turns, sharing, attention, feelings, and asking for help.'
  },
  {
    id: 'numbers-letters',
    title: 'Numbers & Letters',
    icon: 'A',
    detail: 'Learn letters, numbers, words, shapes, colors, and memory matching.'
  }
];

export const learnedSkillActivityMap = {
  Dressing: ['Get Dressed'],
  'Brushing teeth': ['Brush Teeth'],
  'Tying shoes': ['Tie Shoes'],
  'Washing hands': ['Wash Hands'],
  'Using the bathroom': ['Bathroom Routine'],
  'Following routines': ['Morning Routine']
};

export const resources = [
  'Build routines with the same words and visuals each day.',
  'Offer choices with pictures, gestures, or AAC-style buttons.',
  'Reduce sensory load before practicing a hard skill.',
  'Use short practice sessions and celebrate effort.',
  'Practice joint attention with one shared object, one point, and one simple direction.',
  'Use imitation games such as clap, wave, tap, and toy actions before teaching harder skills.',
  'During a meltdown, lower demands, reduce noise, and prioritize safety.'
];

export const lessonSteps = [
  { title: 'Cross', visual: 'Tie Step 1', text: 'Cross the laces.' },
  { title: 'Tunnel', visual: 'Tie Step 2', text: 'Put one lace under the other.' },
  { title: 'Pull', visual: 'Tie Step 3', text: 'Pull both laces snug.' },
  { title: 'Loop', visual: 'Tie Step 4', text: 'Make one bunny ear.' },
  { title: 'Wrap', visual: 'Tie Step 5', text: 'Wrap the other lace around.' },
  { title: 'Finish', visual: 'Tie Shoes', text: 'Pull the loop through.' }
];

export const shoeLessonIntro = 'Practice slowly. One step at a time.';

export const activityGames = {
  'Color Match': {
    rounds: [
      {
        prompt: 'Pick the color that matches the big card.',
        target: { label: 'Red', value: '#ef7464' },
        choices: [
          { label: 'Red', value: '#ef7464' },
          { label: 'Blue', value: '#4f8ecb' },
          { label: 'Green', value: '#78a85f' },
          { label: 'Yellow', value: '#f0b84b' }
        ]
      },
      {
        prompt: 'Pick the color that matches the big card.',
        target: { label: 'Blue', value: '#4f8ecb' },
        choices: [
          { label: 'Yellow', value: '#f0b84b' },
          { label: 'Green', value: '#78a85f' },
          { label: 'Blue', value: '#4f8ecb' },
          { label: 'Red', value: '#ef7464' }
        ]
      },
      {
        prompt: 'Pick the color that matches the big card.',
        target: { label: 'Green', value: '#78a85f' },
        choices: [
          { label: 'Green', value: '#78a85f' },
          { label: 'Red', value: '#ef7464' },
          { label: 'Yellow', value: '#f0b84b' },
          { label: 'Blue', value: '#4f8ecb' }
        ]
      }
    ]
  },
  'Letter Match': {
    rounds: [
      {
        prompt: 'Find the same letter.',
        target: { label: 'A', value: 'A' },
        choices: [
          { label: 'A', value: 'A' },
          { label: 'B', value: 'B' },
          { label: 'M', value: 'M' },
          { label: 'S', value: 'S' }
        ]
      },
      {
        prompt: 'Find the same letter.',
        target: { label: 'M', value: 'M' },
        choices: [
          { label: 'S', value: 'S' },
          { label: 'A', value: 'A' },
          { label: 'M', value: 'M' },
          { label: 'B', value: 'B' }
        ]
      },
      {
        prompt: 'Find the same letter.',
        target: { label: 'S', value: 'S' },
        choices: [
          { label: 'B', value: 'B' },
          { label: 'S', value: 'S' },
          { label: 'A', value: 'A' },
          { label: 'M', value: 'M' }
        ]
      }
    ]
  },
  'Number Garden': {
    rounds: [
      {
        prompt: 'How many flowers are in the garden?',
        target: { label: '2', value: '2', count: 2, item: 'Flower' },
        choices: [
          { label: '1', value: '1' },
          { label: '2', value: '2' },
          { label: '3', value: '3' },
          { label: '4', value: '4' }
        ]
      },
      {
        prompt: 'How many stars are in the garden?',
        target: { label: '3', value: '3', count: 3, item: 'Star' },
        choices: [
          { label: '2', value: '2' },
          { label: '3', value: '3' },
          { label: '4', value: '4' },
          { label: '5', value: '5' }
        ]
      },
      {
        prompt: 'How many cats are in the garden?',
        target: { label: '4', value: '4', count: 4, item: 'Cat' },
        choices: [
          { label: '3', value: '3' },
          { label: '5', value: '5' },
          { label: '4', value: '4' },
          { label: '2', value: '2' }
        ]
      },
      {
        prompt: 'How many toys are in the garden?',
        target: { label: '5', value: '5', count: 5, item: 'Toy' },
        choices: [
          { label: '4', value: '4' },
          { label: '5', value: '5' },
          { label: '6', value: '6' },
          { label: '3', value: '3' }
        ]
      },
      {
        prompt: 'How many cups are in the garden?',
        target: { label: '6', value: '6', count: 6, item: 'Cup' },
        choices: [
          { label: '5', value: '5' },
          { label: '7', value: '7' },
          { label: '6', value: '6' },
          { label: '4', value: '4' }
        ]
      }
    ]
  },
  'Shape Sort': {
    rounds: [
      {
        prompt: 'Put the shape with the matching group.',
        target: { label: 'Circle', value: 'Circle' },
        choices: [
          { label: 'Circle', value: 'Circle' },
          { label: 'Square', value: 'Square' },
          { label: 'Star', value: 'Star' },
          { label: 'Triangle', value: 'Triangle' }
        ]
      },
      {
        prompt: 'Put the shape with the matching group.',
        target: { label: 'Triangle', value: 'Triangle' },
        choices: [
          { label: 'Square', value: 'Square' },
          { label: 'Triangle', value: 'Triangle' },
          { label: 'Circle', value: 'Circle' },
          { label: 'Star', value: 'Star' }
        ]
      },
      {
        prompt: 'Put the shape with the matching group.',
        target: { label: 'Star', value: 'Star' },
        choices: [
          { label: 'Star', value: 'Star' },
          { label: 'Circle', value: 'Circle' },
          { label: 'Triangle', value: 'Triangle' },
          { label: 'Square', value: 'Square' }
        ]
      }
    ]
  },
  'Sort by Size': {
    rounds: [
      {
        prompt: 'Put them in order.',
        target: { label: 'Small → Medium → Big', value: 'ordered', order: ['small', 'medium', 'big'], object: 'Ball' },
        choices: [
          { id: 'ball-small', label: 'Small', value: 'small', size: 'small', object: 'Ball', level: 1 },
          { id: 'ball-medium', label: 'Medium', value: 'medium', size: 'medium', object: 'Ball', level: 1 },
          { id: 'ball-big', label: 'Big', value: 'big', size: 'big', object: 'Ball', level: 1 }
        ]
      },
      {
        prompt: 'Put them in order.',
        target: { label: 'Small → Medium → Big', value: 'ordered', order: ['small', 'medium', 'big'], object: 'Cup' },
        choices: [
          { id: 'cup-small', label: 'Small', value: 'small', size: 'small', object: 'Cup', level: 1 },
          { id: 'cup-medium', label: 'Medium', value: 'medium', size: 'medium', object: 'Cup', level: 1 },
          { id: 'cup-big', label: 'Big', value: 'big', size: 'big', object: 'Cup', level: 1 }
        ]
      },
      {
        prompt: 'Put them in order.',
        target: { label: 'Small → Medium → Big', value: 'ordered', order: ['small', 'medium', 'big'], object: 'Flower' },
        choices: [
          { id: 'flower-small', label: 'Small', value: 'small', size: 'small', object: 'Flower', level: 1 },
          { id: 'flower-medium', label: 'Medium', value: 'medium', size: 'medium', object: 'Flower', level: 1 },
          { id: 'flower-big', label: 'Big', value: 'big', size: 'big', object: 'Flower', level: 1 }
        ]
      }
    ]
  },
  'Match Pairs': {
    rounds: [
      {
        prompt: 'What goes with this?',
        target: { id: 'cup', label: 'Cup', value: 'Water', icon: 'cup' },
        correctMatch: { id: 'water', label: 'Water', value: 'Water', icon: 'water' },
        distractors: [
          { id: 'cat', label: 'Cat', value: 'Cat', icon: 'cat' },
          { id: 'bed', label: 'Bed', value: 'Bed', icon: 'bed' },
          { id: 'banana', label: 'Banana', value: 'Banana', icon: 'banana' }
        ],
        choices: [
          { id: 'water', label: 'Water', value: 'Water', icon: 'water' },
          { id: 'cat', label: 'Cat', value: 'Cat', icon: 'cat' },
          { id: 'bed', label: 'Bed', value: 'Bed', icon: 'bed' },
          { id: 'banana', label: 'Banana', value: 'Banana', icon: 'banana' }
        ],
        hint: 'What do we put in a cup?',
        explanation: 'Cup and water go together.'
      },
      {
        prompt: 'What goes with this?',
        target: { id: 'pencil', label: 'Pencil', value: 'Paper', icon: 'pencil' },
        correctMatch: { id: 'paper', label: 'Paper', value: 'Paper', icon: 'paper' },
        distractors: [
          { id: 'cup', label: 'Cup', value: 'Cup', icon: 'cup' },
          { id: 'umbrella', label: 'Umbrella', value: 'Umbrella', icon: 'umbrella' },
          { id: 'bed', label: 'Bed', value: 'Bed', icon: 'bed' }
        ],
        choices: [
          { id: 'cup', label: 'Cup', value: 'Cup', icon: 'cup' },
          { id: 'paper', label: 'Paper', value: 'Paper', icon: 'paper' },
          { id: 'umbrella', label: 'Umbrella', value: 'Umbrella', icon: 'umbrella' },
          { id: 'bed', label: 'Bed', value: 'Bed', icon: 'bed' }
        ],
        hint: 'What do we draw on?',
        explanation: 'Pencil and paper go together.'
      },
      {
        prompt: 'What goes with this?',
        target: { id: 'key', label: 'Key', value: 'Lock', icon: 'key' },
        correctMatch: { id: 'lock', label: 'Lock', value: 'Lock', icon: 'lock' },
        distractors: [
          { id: 'water', label: 'Water', value: 'Water', icon: 'water' },
          { id: 'cat', label: 'Cat', value: 'Cat', icon: 'cat' },
          { id: 'banana', label: 'Banana', value: 'Banana', icon: 'banana' }
        ],
        choices: [
          { id: 'water', label: 'Water', value: 'Water', icon: 'water' },
          { id: 'lock', label: 'Lock', value: 'Lock', icon: 'lock' },
          { id: 'cat', label: 'Cat', value: 'Cat', icon: 'cat' },
          { id: 'banana', label: 'Banana', value: 'Banana', icon: 'banana' }
        ],
        hint: 'What opens a lock?',
        explanation: 'Key and lock go together.'
      },
      {
        prompt: 'What goes with this?',
        target: { id: 'rain', label: 'Rain', value: 'Umbrella', icon: 'rain' },
        correctMatch: { id: 'umbrella', label: 'Umbrella', value: 'Umbrella', icon: 'umbrella' },
        distractors: [
          { id: 'pencil', label: 'Pencil', value: 'Pencil', icon: 'pencil' },
          { id: 'bed', label: 'Bed', value: 'Bed', icon: 'bed' },
          { id: 'cup', label: 'Cup', value: 'Cup', icon: 'cup' }
        ],
        choices: [
          { id: 'pencil', label: 'Pencil', value: 'Pencil', icon: 'pencil' },
          { id: 'bed', label: 'Bed', value: 'Bed', icon: 'bed' },
          { id: 'umbrella', label: 'Umbrella', value: 'Umbrella', icon: 'umbrella' },
          { id: 'cup', label: 'Cup', value: 'Cup', icon: 'cup' }
        ],
        hint: 'What helps when it rains?',
        explanation: 'Rain and umbrella go together.'
      }
    ]
  },
  'Emotion Match': {
    rounds: [
      {
        prompt: 'Choose the face that shows the feeling.',
        target: { label: 'Happy', value: 'Happy' },
        choices: [
          { label: 'Happy', value: 'Happy' },
          { label: 'Sad', value: 'Sad' },
          { label: 'Worried', value: 'Worried' },
          { label: 'Tired', value: 'Tired' }
        ]
      },
      {
        prompt: 'Choose the face that shows the feeling.',
        target: { label: 'Sad', value: 'Sad' },
        choices: [
          { label: 'Okay', value: 'Okay' },
          { label: 'Happy', value: 'Happy' },
          { label: 'Sad', value: 'Sad' },
          { label: 'Excited', value: 'Excited' }
        ]
      },
      {
        prompt: 'Choose the face that shows the feeling.',
        target: { label: 'Worried', value: 'Worried' },
        choices: [
          { label: 'Mad', value: 'Mad' },
          { label: 'Worried', value: 'Worried' },
          { label: 'Okay', value: 'Okay' },
          { label: 'Tired', value: 'Tired' }
        ]
      }
    ]
  },
  'Sound Match': {
    rounds: [
      {
        prompt: 'Listen to the sound, then pick what made it.',
        target: { label: 'Rain', value: 'Rain' },
        choices: [
          { label: 'Rain', value: 'Rain' },
          { label: 'Cat', value: 'Cat' },
          { label: 'Toy', value: 'Toy' },
          { label: 'Bed', value: 'Bed' }
        ]
      },
      {
        prompt: 'Listen to the sound, then pick what made it.',
        target: { label: 'Cat', value: 'Cat' },
        choices: [
          { label: 'Toy', value: 'Toy' },
          { label: 'Rain', value: 'Rain' },
          { label: 'Cat', value: 'Cat' },
          { label: 'Bed', value: 'Bed' }
        ]
      },
      {
        prompt: 'Listen to the sound, then pick what made it.',
        target: { label: 'Bed', value: 'Bed' },
        choices: [
          { label: 'Bed', value: 'Bed' },
          { label: 'Cat', value: 'Cat' },
          { label: 'Rain', value: 'Rain' },
          { label: 'Toy', value: 'Toy' }
        ]
      }
    ]
  }
};

export const memoryPairLabels = ['Moon', 'Star', 'Leaf', 'Heart', 'Sun', 'Water', 'Cat', 'Bed', 'Cup', 'Toy'];

export function createMemoryDeck(pairCount) {
  return memoryPairLabels
    .slice(0, pairCount)
    .flatMap((label) => [label, label])
    .map((label, index) => ({ id: `${label}-${index}`, label }));
}

export function shuffleCards(cards) {
  const deck = [...cards];
  for (let index = deck.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [deck[index], deck[swapIndex]] = [deck[swapIndex], deck[index]];
  }
  return deck;
}

export const guidedActivities = {
  'Simple Words': {
    type: 'choices',
    prompt: 'Pick the word that matches the picture.',
    visual: 'CAT',
    correct: 'cat',
    choices: ['cat', 'sun', 'bed', 'cup']
  },
  'ABC 123 Sequence': {
    type: 'steps',
    prompt: 'Tap the sequence in order.',
    steps: [
      { label: 'A', story: 'Start with A.' },
      { label: 'B', story: 'Then B.' },
      { label: 'C', story: 'Then C.' },
      { label: '1', story: 'Now start numbers with 1.' },
      { label: '2', story: 'Then 2.' },
      { label: '3', story: 'Then 3.' }
    ]
  },
  'Wash Hands': {
    type: 'steps',
    prompt: 'Tap each step in order.',
    steps: ['Turn on water', 'Soap', 'Rub hands', 'Rinse', 'Dry']
  },
  'Brush Teeth': {
    type: 'steps',
    prompt: 'Tap each step in order.',
    steps: [
      { label: 'Toothpaste', image: 'Brush Step 1' },
      { label: 'Brush top', image: 'Brush Step 2' },
      { label: 'Brush bottom', image: 'Brush Step 3' },
      { label: 'Rinse', image: 'Brush Step 4' },
      { label: 'Smile', image: 'Brush Step 5' }
    ]
  },
  'Get Dressed': {
    type: 'steps',
    prompt: 'Tap each clothing step in order.',
    steps: ['Underwear', 'Shirt', 'Pants', 'Socks', 'Shoes']
  },
  'Pack Backpack': {
    type: 'steps',
    prompt: 'Pack the school bag checklist.',
    steps: ['Folder', 'Lunch', 'Water', 'Coat', 'Zip bag']
  },
  'Bathroom Routine': {
    type: 'steps',
    prompt: 'Tap each bathroom step in order.',
    steps: ['Go bathroom', 'Pants down', 'Use toilet', 'Wipe', 'Flush', 'Wash hands']
  },
  'Drink Water Reminder': {
    type: 'script',
    prompt: 'Practice a helpful reminder.',
    lines: ['Reminder', 'Drink water', 'Take a sip', 'All done']
  },
  'Bedtime Routine': {
    type: 'steps',
    prompt: 'Tap the bedtime routine.',
    steps: ['Pajamas', 'Brush teeth', 'Bathroom', 'Story', 'Lights low', 'Sleep']
  },
  'Morning Routine': {
    type: 'steps',
    prompt: 'Tap each step in order.',
    steps: ['Wake up', 'Get dressed', 'Eat breakfast', 'Pack bag']
  },
  'Say Hello': {
    type: 'social-story',
    storyTitle: 'Mia Goes to the Playground',
    skill: 'Saying hello',
    prompt: 'Mia Goes to the Playground',
    caregiverTip: 'Give the child time to respond. A wave, spoken greeting, gesture, or AAC response can all count.',
    scenes: [
      { type: 'story', mood: 'playground', text: 'Mia goes to the playground.', action: 'Next' },
      { type: 'story', mood: 'playground', leo: true, text: 'Mia sees Leo.', supportingText: 'Leo is playing nearby.', action: 'Show me' },
      { type: 'model', mood: 'wave', leo: true, text: 'Mia can look toward Leo and wave.', supportingText: 'Like this.', action: 'My turn' },
      { type: 'practice', practice: 'hello', mood: 'wave', leo: true, text: 'Say hello your way.', supportingText: 'Wave, say hello, or use AAC.', listenText: 'Hello!', action: 'I did it' },
      { type: 'response', mood: 'wave', leo: true, text: 'Leo waves back.', supportingText: 'Hello, Mia!', action: 'Next' },
      { type: 'ending', mood: 'play', leo: true, text: 'Mia and Leo are ready to play.', practicedText: 'You practiced saying hello.' }
    ]
  },
  'Speech Table': {
    type: 'choices',
    prompt: 'Tap a picture word to speak it.',
    visual: 'Speech Board',
    correct: 'I want',
    choices: ['I want', 'I need', 'Help', 'Break', 'More please', 'All done'],
    speak: true
  },
  'I Want Board': {
    type: 'choices',
    prompt: 'Choose a phrase to ask for something.',
    visual: 'I want',
    correct: 'I want',
    choices: ['I want', 'Water', 'Food', 'Toy'],
    speak: true
  },
  'I Need Help': {
    type: 'choices',
    prompt: 'Choose what help you need.',
    visual: 'HELP',
    correct: 'Help',
    choices: ['Help', 'Bathroom', 'Water', 'Break'],
    speak: true
  },
  'Yes or No': {
    type: 'choices',
    prompt: 'Choose a clear answer.',
    visual: 'Yes',
    correct: 'Yes',
    choices: ['Yes', 'No', 'Stop', 'Again'],
    speak: true
  },
  'More or Done': {
    type: 'choices',
    prompt: 'Choose what comes next.',
    visual: 'More',
    correct: 'More please',
    choices: ['More please', 'All done', 'Please', 'Thank you'],
    speak: true
  },
  'Feeling Words': {
    type: 'choices',
    prompt: 'Choose a feeling word to say.',
    visual: 'FEEL',
    correct: 'Happy',
    choices: ['Happy', 'Sad', 'Mad', 'Tired'],
    speak: true
  },
  'Take Turns': {
    type: 'social-story',
    storyTitle: 'Building a Tower Together',
    skill: 'Taking turns',
    prompt: 'Building a Tower Together',
    caregiverTip: 'Pause at each turn. Help the child notice whose turn it is without rushing.',
    scenes: [
      { type: 'story', mood: 'blocks', leo: true, text: 'Mia and Leo have blocks.', supportingText: 'They want to build a tower.', action: 'Next' },
      { type: 'model', mood: 'blocks', leo: true, tower: 1, text: 'Leo puts on one block.', supportingText: 'Leo’s turn.', action: 'My turn' },
      { type: 'practice', practice: 'block', mood: 'blocks', leo: true, tower: 1, text: 'Now it is Mia’s turn.', supportingText: 'Tap the block to add it.', action: 'I did it' },
      { type: 'response', mood: 'blocks', leo: true, tower: 2, text: 'Now we wait.', supportingText: 'Leo adds another block.', action: 'Next' },
      { type: 'model', mood: 'blocks', leo: true, tower: 3, text: 'My turn. Your turn.', supportingText: 'Leo → Mia → Leo → Mia', action: 'Next' },
      { type: 'ending', mood: 'blocks', leo: true, tower: 4, text: 'They built it together!', practicedText: 'You practiced taking turns.' }
    ]
  },
  'Share Toys': {
    type: 'social-story',
    storyTitle: 'Playing With Cars',
    skill: 'Sharing toys',
    prompt: 'Playing With Cars',
    caregiverTip: 'Sharing can be a gesture, handing an item, offering a choice, or using AAC.',
    scenes: [
      { type: 'story', mood: 'cars', text: 'Mia has two toy cars.', action: 'Next' },
      { type: 'story', mood: 'cars', leo: true, text: 'Leo comes to play.', supportingText: 'Leo wants a car too.', action: 'Show me' },
      { type: 'model', mood: 'cars', leo: true, text: 'Mia can share one car.', supportingText: 'One for Mia. One for Leo.', action: 'My turn' },
      { type: 'practice', practice: 'share-car', mood: 'cars', leo: true, text: 'Give Leo a car.', supportingText: 'Tap a car to share it.', action: 'I did it' },
      { type: 'response', mood: 'cars', leo: true, text: 'Leo says, “Thanks, Mia!”', supportingText: 'Now Leo has a car.', action: 'Next' },
      { type: 'ending', mood: 'cars', leo: true, text: 'Now they can play together.', practicedText: 'You practiced sharing.' }
    ]
  },
  'Copy Movements': {
    type: 'social-story',
    storyTitle: 'Copy Leo!',
    skill: 'Copying movements',
    prompt: 'Copy Leo!',
    caregiverTip: 'Accept an attempt, a partial movement, or a communication response that shows participation.',
    scenes: [
      { type: 'story', mood: 'movement', leo: true, text: 'Leo wants to play a copy game.', action: 'Next' },
      { type: 'model', mood: 'raise-hand', leo: true, text: 'Watch Leo.', supportingText: 'Leo raises one hand.', action: 'My turn' },
      { type: 'practice', practice: 'confirm', mood: 'raise-hand', leo: true, text: 'Your turn!', supportingText: 'Raise your hand your way.', action: 'I did it' },
      { type: 'model', mood: 'clap', leo: true, text: 'Watch Leo clap.', supportingText: 'Clap softly.', action: 'My turn' },
      { type: 'practice', practice: 'confirm', mood: 'clap', leo: true, text: 'Your turn!', supportingText: 'Clap or tap softly.', action: 'I did it' },
      { type: 'ending', mood: 'play', leo: true, text: 'Mia copied Leo.', practicedText: 'You practiced copying movements.' }
    ]
  },
  'Feelings': {
    type: 'social-story',
    storyTitle: 'How Does Leo Feel?',
    skill: 'Naming feelings',
    prompt: 'How Does Leo Feel?',
    caregiverTip: 'Point to the situation first, then the face. Give time before offering choices.',
    scenes: [
      { type: 'story', mood: 'blocks', leo: true, tower: 3, text: 'Leo builds a tower.', action: 'Next' },
      { type: 'story', mood: 'sad', leo: true, text: 'The tower falls.', supportingText: 'Leo looks down.', action: 'Show me' },
      { type: 'practice', practice: 'choice', mood: 'sad', leo: true, text: 'How does Leo feel?', supportingText: 'Choose a feeling.', correct: 'Sad', choices: ['Happy', 'Sad', 'Mad', 'Tired'], action: 'Next' },
      { type: 'response', mood: 'sad', leo: true, text: 'Leo feels sad because the tower fell.', supportingText: 'Mia can help Leo try again.', action: 'Next' },
      { type: 'ending', mood: 'blocks', leo: true, tower: 2, text: 'They build again together.', practicedText: 'You practiced naming a feeling.' }
    ]
  },
  Faces: {
    type: 'social-story',
    storyTitle: 'Look at Their Face',
    skill: 'Noticing expressions',
    prompt: 'Look at Their Face',
    caregiverTip: 'Use “notice the face” or “look toward them.” Do not require eye contact.',
    scenes: [
      { type: 'story', mood: 'snack', leo: true, text: 'Mia and Leo sit at snack time.', action: 'Next' },
      { type: 'story', mood: 'happy', leo: true, text: 'Leo smiles at his snack.', supportingText: 'Notice Leo’s face.', action: 'Show me' },
      { type: 'practice', practice: 'choice', mood: 'happy', leo: true, text: 'What face do you see?', supportingText: 'Choose the expression.', correct: 'Happy', choices: ['Happy', 'Sad', 'Mad', 'Tired'], action: 'Next' },
      { type: 'response', mood: 'happy', leo: true, text: 'Leo looks happy.', supportingText: 'He likes snack time.', action: 'Next' },
      { type: 'ending', mood: 'snack', leo: true, text: 'Mia notices Leo’s smile.', practicedText: 'You practiced noticing a face.' }
    ]
  },
  'Soft Visuals': {
    type: 'breath',
    prompt: 'Watch the soft visual and count three breaths.',
    steps: ['Breathe in', 'Breathe out', 'Rest']
  },
  'Yoga Calm': {
    type: 'script',
    prompt: 'Copy the calm yoga cartoon steps.',
    lines: ['Reach up', 'Fold down', 'Hands heart', 'Breathe in', 'Breathe out']
  },
  'Stretch Break': {
    type: 'script',
    prompt: 'Move slowly through gentle stretches.',
    lines: ['Shoulders down', 'Reach arms', 'Side stretch', 'Touch toes', 'Shake hands', 'Rest body']
  },
  'Count Sheep': {
    type: 'count',
    prompt: 'Count five bedtime pictures slowly.',
    items: ['1', '2', '3', '4', '5']
  },
  'Feel Check': {
    type: 'choices',
    prompt: 'Choose how this card feels.',
    visual: 'OKAY',
    correct: 'Okay',
    choices: ['Happy', 'Okay', 'Mad', 'Tired']
  },
  Breathe: {
    type: 'breath',
    prompt: 'Take three slow breaths.',
    steps: ['Breathe in', 'Breathe out', 'Rest']
  },
  Timer: {
    type: 'timer',
    prompt: 'Start a short calm timer.'
  }
};

const speechBoards = {
  'Speech Table': {
    type: 'communication-board'
  },
  'My Voice': {
    type: 'communication-board'
  },
  'I Want Board': {
    phraseStarters: ['I want', 'More please'],
    groups: [
      {
        title: 'I want',
        cards: [
          { label: 'Water', image: 'Water', speak: 'water' },
          { label: 'Food', image: 'Food', speak: 'food' },
          { label: 'Toy', image: 'Toy', speak: 'toy' },
          { label: 'Play', image: 'Play', speak: 'play' },
          { label: 'Again', image: 'Again', speak: 'again' },
          { label: 'All done', image: 'All done', speak: 'all done' }
        ]
      }
    ]
  },
  'I Need Help': {
    phraseStarters: ['I need'],
    groups: [
      {
        title: 'Help',
        cards: [
          { label: 'Help', image: 'Help', speak: 'help' },
          { label: 'Break', image: 'Break', speak: 'break' },
          { label: 'Bathroom', image: 'Bathroom', speak: 'bathroom' },
          { label: 'Water', image: 'Water', speak: 'water' },
          { label: 'Sleep', image: 'Sleep', speak: 'sleep' },
          { label: 'Stop', image: 'Stop', speak: 'stop' }
        ]
      }
    ]
  },
  'Yes or No': {
    phraseStarters: [],
    groups: [
      {
        title: 'Answers',
        cards: [
          { label: 'Yes', image: 'Yes', speak: 'yes' },
          { label: 'No', image: 'No', speak: 'no' },
          { label: 'Stop', image: 'Stop', speak: 'stop' },
          { label: 'Again', image: 'Again', speak: 'again' }
        ]
      }
    ]
  },
  'More or Done': {
    phraseStarters: [],
    groups: [
      {
        title: 'More or done',
        cards: [
          { label: 'More please', image: 'More please', speak: 'more please' },
          { label: 'All done', image: 'All done', speak: 'all done' },
          { label: 'Please', image: 'Please', speak: 'please' },
          { label: 'Thank you', image: 'Thank you', speak: 'thank you' }
        ]
      }
    ]
  },
  'Feeling Words': {
    phraseStarters: ['I feel'],
    groups: [
      {
        title: 'Feelings',
        cards: [
          { label: 'Happy', image: 'Happy', speak: 'happy' },
          { label: 'Excited', image: 'Excited', speak: 'excited' },
          { label: 'Okay', image: 'Okay', speak: 'okay' },
          { label: 'Sad', image: 'Sad', speak: 'sad' },
          { label: 'Worried', image: 'Worried', speak: 'worried' },
          { label: 'Mad', image: 'Mad', speak: 'mad' },
          { label: 'Tired', image: 'Tired', speak: 'tired' }
        ]
      }
    ]
  }
};
