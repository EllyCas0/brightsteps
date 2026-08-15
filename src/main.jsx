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
import angryFaceImage from './assets/images/angry-face.png';
import backpackImage from './assets/images/backpack.png';
import bedImage from './assets/images/bed.png';
import breakImage from './assets/images/break.png';
import brushTeethImage from './assets/images/brush-teeth.png';
import catImage from './assets/images/cat.png';
import cupImage from './assets/images/cup.png';
import doneImage from './assets/images/done.png';
import eyeImage from './assets/images/eye.png';
import excitedFaceImage from './assets/images/excited-face.png';
import flowerImage from './assets/images/flower.png';
import heartImage from './assets/images/heart.png';
import happyFaceImage from './assets/images/happy-face.png';
import needsBoardImage from './assets/images/needs-board.png';
import okayFaceImage from './assets/images/okay-face.png';
import sadFaceImage from './assets/images/sad-face.png';
import sunImage from './assets/images/sun.png';
import tieShoesImage from './assets/images/tie-shoes.png';
import tiredFaceImage from './assets/images/tired-face.png';
import waterImage from './assets/images/water.png';
import worriedFaceImage from './assets/images/worried-face.png';
import boyAngryAvatar from './assets/avatars/boy-angry.png';
import boyHappyAvatar from './assets/avatars/boy-happy.png';
import boySadAvatar from './assets/avatars/boy-sad.png';
import boyWashingHandsAvatar from './assets/avatars/boy-washing-hands.png';
import './styles.css';

const STORAGE_KEY = 'brightsteps-child-profile';
const PROFILES_KEY = 'brightsteps-child-profiles';
const ACTIVE_PROFILE_KEY = 'brightsteps-active-child-profile';
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
  communication: ['Verbal', 'Limited verbal', 'Non-verbal', 'Uses AAC or visual communication', 'Uses picture cards'],
  age: ['2 years', '3 years', '4 years', '5 years', '6 years', '7 years', '8 years', '9 years', '10+ years'],
  grade: ['Not in school yet', 'Preschool', 'Pre-K', 'Kindergarten', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4+', 'Homeschool / therapy program'],
  letters: [
    'Does not recognize letters',
    'Recognizes some letters',
    'Recognizes most letters',
    'Can read simple words',
    'Can read fluently'
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
    'Motor imitation',
    'School readiness',
    'Reading and words',
    'Numbers and problem solving',
    'Sensory tolerance'
  ],
  learningStyle: ['Images', 'Videos', 'Audio', 'Step-by-step instructions', 'Games'],
  interests: ['Animals', 'Cars', 'Music', 'Colors', 'Dinosaurs', 'Space']
};

const defaultProgress = {
  completed: [],
  practiced: [],
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

const defaultProfile = {
  id: '',
  name: '',
  avatar: 'Boy Happy',
  age: choiceSets.age[0],
  grade: choiceSets.grade[0],
  supportLevel: choiceSets.supportLevel[0],
  communication: choiceSets.communication[0],
  letters: choiceSets.letters[0],
  numbers: choiceSets.numbers[0],
  social: choiceSets.social[0],
  sensory: [],
  dailySkills: [],
  objectives: [],
  learningStyle: ['Images'],
  interests: [],
  diagnosisConfirmed: false
};

const categoryLabels = {
  learn: 'Learn',
  daily: 'Daily',
  social: 'Social',
  play: 'Play',
  calm: 'Calm'
};

const imageAssets = {
  'Boy Angry': boyAngryAvatar,
  'Boy Happy': boyHappyAvatar,
  'Boy Sad': boySadAvatar,
  'Boy Washing Hands': boyWashingHandsAvatar,
  Angry: angryFaceImage,
  Backpack: backpackImage,
  BAG: backpackImage,
  Bed: bedImage,
  bed: bedImage,
  Break: breakImage,
  BELL: doneImage,
  'Brush Teeth': brushTeethImage,
  'Brush Teeth Reminder': brushTeethImage,
  Breathe: flowerImage,
  'Color Match': flowerImage,
  COLOR: flowerImage,
  CHECK: doneImage,
  TOOTH: brushTeethImage,
  CAT: catImage,
  Cat: catImage,
  cat: catImage,
  Cup: cupImage,
  cup: cupImage,
  Drink: cupImage,
  'Drink Water Reminder': waterImage,
  Done: doneImage,
  Eye: eyeImage,
  Excited: excitedFaceImage,
  FEEL: happyFaceImage,
  FLOWER: flowerImage,
  Food: cupImage,
  'Fast food': cupImage,
  Flower: flowerImage,
  HAPPY: happyFaceImage,
  Happy: happyFaceImage,
  Heart: heartImage,
  HELP: needsBoardImage,
  HI: happyFaceImage,
  Mad: angryFaceImage,
  'Memory Cards': heartImage,
  More: needsBoardImage,
  'Morning Routine': sunImage,
  Needs: needsBoardImage,
  Okay: okayFaceImage,
  SAD: sadFaceImage,
  Sad: sadFaceImage,
  Simple: catImage,
  Sleep: bedImage,
  Sleepy: tiredFaceImage,
  Surprised: excitedFaceImage,
  Sun: sunImage,
  sun: sunImage,
  Thirsty: waterImage,
  TIRED: tiredFaceImage,
  'Tie Shoes': tieShoesImage,
  LACE: tieShoesImage,
  Tired: tiredFaceImage,
  TV: needsBoardImage,
  Water: waterImage,
  Worried: worriedFaceImage,
  'Emotion Cards': happyFaceImage,
  'Feel Check': happyFaceImage,
  Feelings: happyFaceImage,
  Faces: sadFaceImage,
  'Match Pairs': sunImage,
  'Number Garden': flowerImage,
  PAIR: sunImage,
  RAIN: waterImage,
  RED: flowerImage,
  SHARE: heartImage,
  SHIRT: backpackImage,
  SOAP: waterImage,
  SOFT: flowerImage,
  SORT: backpackImage,
  SND: waterImage,
  STAR: doneImage,
  'Simple Words': catImage,
  'Say Hello': happyFaceImage,
  'Shape Sort': backpackImage,
  'Soft Visuals': flowerImage,
  'Sort It': backpackImage,
  Bathroom: cupImage,
  'Bathroom Routine': cupImage,
  'Bedtime Routine': bedImage,
  'Break Card': breakImage,
  'Copy Movements': happyFaceImage,
  'Count Sheep': bedImage,
  'Emotion Picture Board': happyFaceImage,
  'Food Choices': cupImage,
  'Joint Attention': eyeImage,
  'Pack Backpack': backpackImage,
  'Picture Talk': needsBoardImage,
  AAC: needsBoardImage,
  AIR: flowerImage,
  AM: sunImage,
  FACE: sadFaceImage,
  'Get Dressed': backpackImage,
  'Letter Match': happyFaceImage,
  'Share Toys': heartImage,
  'Sensory Images': flowerImage,
  'Sound + Picture': waterImage,
  'Star Rewards': doneImage,
  'Take Turns': heartImage,
  TIME: doneImage,
  Timer: doneImage,
  TURN: heartImage,
  'Use Words or AAC': needsBoardImage,
  'Wash Hands': waterImage,
  'Wash Hands Reminder': waterImage,
  'Today check-in': doneImage,
  'Yoga Calm': flowerImage
};

const avatarOptions = [
  { key: 'Boy Happy', label: 'Happy' },
  { key: 'Boy Washing Hands', label: 'Wash Hands' },
  { key: 'Boy Angry', label: 'Mad' },
  { key: 'Boy Sad', label: 'Sad' }
];

const moodAvatarMap = {
  Angry: 'Boy Angry',
  Excited: 'Boy Happy',
  Happy: 'Boy Happy',
  Mad: 'Boy Angry',
  Okay: 'Okay',
  Sad: 'Boy Sad',
  Sleepy: 'Tired',
  Tired: 'Tired',
  Worried: 'Worried'
};

function getMoodAvatar(mood, fallback = defaultProfile.avatar) {
  return moodAvatarMap[mood] || fallback;
}

function getImageAsset(key) {
  return key ? imageAssets[key] : null;
}

function VisualAsset({ label, imageKey, className = 'visual-image', fallback = true }) {
  const src = getImageAsset(imageKey || label);
  if (!src) return fallback ? label : null;
  return <img className={className} src={src} alt="" aria-hidden="true" />;
}

function Avatar({ avatar = defaultProfile.avatar, name = 'Child', size = 'medium' }) {
  return (
    <span className={`avatar avatar-${size}`} aria-label={`${name} avatar`} role="img">
      <VisualAsset label={avatar} imageKey={avatar} className="avatar-image" fallback={false} />
    </span>
  );
}

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
    { title: 'Brush Teeth Reminder', icon: 'BELL', detail: 'Remember to brush your teeth' },
    { title: 'Wash Hands', icon: 'SOAP', detail: 'Clean hands sequence' },
    { title: 'Wash Hands Reminder', icon: 'BELL', detail: 'Remember to wash your hands' },
    { title: 'Bathroom Routine', icon: 'Bathroom', detail: 'Independent bathroom steps' },
    { title: 'Get Dressed', icon: 'SHIRT', detail: 'Clothes in order' },
    { title: 'Food Choices', icon: 'Food Choices', detail: 'Choose a food or drink picture' },
    { title: 'Pack Backpack', icon: 'BAG', detail: 'School-ready checklist' },
    { title: 'Drink Water Reminder', icon: 'Water', detail: 'Remember to drink water' },
    { title: 'Bedtime Routine', icon: 'Bedtime Routine', detail: 'Calm sequence before sleep' },
    { title: 'Morning Routine', icon: 'AM', detail: 'First, next, then' }
  ],
  social: [
    { title: 'Say Hello', icon: 'HI', detail: 'Greeting familiar people' },
    { title: 'Use Words or AAC', icon: 'AAC', detail: 'Choose words, gestures, or AAC to communicate' },
    { title: 'Picture Talk', icon: 'Picture Talk', detail: 'Express needs with image choices' },
    { title: 'Take Turns', icon: 'TURN', detail: 'Wait, play, pass' },
    { title: 'Joint Attention', icon: 'Joint Attention', detail: 'Look, point, and share an object' },
    { title: 'Ask Help', icon: 'HELP', detail: 'Practice help choices' },
    { title: 'Share Toys', icon: 'SHARE', detail: 'Simple sharing story' },
    { title: 'Copy Movements', icon: 'Copy Movements', detail: 'Imitate clap, wave, and use a toy' },
    { title: 'Feelings', icon: 'FEEL', detail: 'Name emotions' },
    { title: 'Faces', icon: 'FACE', detail: 'Recognize expressions' }
  ],
  play: [
    { title: 'Match Pairs', icon: 'PAIR', detail: 'Find the same picture' },
    { title: 'Sort It', icon: 'SORT', detail: 'Put items in groups' },
    { title: 'Emotion Cards', icon: 'MOOD', detail: 'Pick how they feel' },
    { title: 'Emotion Picture Board', icon: 'Emotion Picture Board', detail: 'Choose emotion faces with pictures' },
    { title: 'Sound + Picture', icon: 'SND', detail: 'Quiet mode available' },
    { title: 'Star Rewards', icon: 'STAR', detail: 'Tiny celebration game' }
  ],
  calm: [
    { title: 'Breathe', icon: 'AIR', detail: 'Slow visual breathing' },
    { title: 'Yoga Calm', icon: 'Yoga Calm', detail: 'Cartoon-style stretch and breathe' },
    { title: 'Count Sheep', icon: 'Count Sheep', detail: 'Bedtime counting for self-regulation' },
    { title: 'Soft Visuals', icon: 'SOFT', detail: 'Low-motion patterns' },
    { title: 'Sensory Images', icon: 'Sensory Images', detail: 'Pick a quiet image during crisis' },
    { title: 'Timer', icon: 'TIME', detail: 'Visual countdown' },
    { title: 'Feel Check', icon: 'CHECK', detail: 'Choose an emotion' },
    { title: 'Break', icon: 'Break', detail: 'I need a break' }
  ]
};

const learnedSkillActivityMap = {
  Dressing: ['Get Dressed'],
  'Brushing teeth': ['Brush Teeth', 'Brush Teeth Reminder'],
  'Tying shoes': ['Tie Shoes'],
  'Washing hands': ['Wash Hands', 'Wash Hands Reminder'],
  'Using the bathroom': ['Bathroom Routine'],
  'Eating independently': ['Food Choices'],
  'Following routines': ['Morning Routine']
};

const resources = [
  'Build routines with the same words and visuals each day.',
  'Offer choices with pictures, gestures, or AAC-style buttons.',
  'Reduce sensory load before practicing a hard skill.',
  'Use short practice sessions and celebrate effort.',
  'Practice joint attention with one shared object, one point, and one simple direction.',
  'Use imitation games such as clap, wave, tap, and toy actions before teaching harder skills.',
  'During a meltdown, lower demands, reduce noise, and prioritize safety.'
];

const lessonSteps = [
  { title: 'Cross', visual: 'X', text: 'Cross the laces.' },
  { title: 'Tunnel', visual: 'UNDER', text: 'Put one lace under the other.' },
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

function shuffleCards(cards) {
  const deck = [...cards];
  for (let index = deck.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [deck[index], deck[swapIndex]] = [deck[swapIndex], deck[index]];
  }
  return deck;
}

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
  'Brush Teeth Reminder': {
    type: 'script',
    prompt: 'Practice a helpful reminder.',
    lines: ['Reminder', 'Brush teeth', 'Rinse', 'All done']
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
  'Wash Hands Reminder': {
    type: 'script',
    prompt: 'Practice a helpful reminder.',
    lines: ['Reminder', 'Wash hands', 'Dry hands', 'All done']
  },
  'Bathroom Routine': {
    type: 'steps',
    prompt: 'Tap each bathroom step in order.',
    steps: ['Go bathroom', 'Pants down', 'Use toilet', 'Wipe', 'Flush', 'Wash hands']
  },
  'Food Choices': {
    type: 'choices',
    prompt: 'Choose the picture for food.',
    visual: 'Food Choices',
    correct: 'Food',
    choices: ['Food', 'Water', 'Fast food', 'Bathroom']
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
    type: 'script',
    prompt: 'Practice a short greeting.',
    lines: ['Look', 'Wave', 'Say hello', 'Wait']
  },
  'Use Words or AAC': {
    type: 'choices',
    prompt: 'Choose a picture to say what you need.',
    visual: 'Needs',
    correct: 'Break',
    choices: ['Break', 'More', 'Water', 'Bathroom']
  },
  'Picture Talk': {
    type: 'choices',
    prompt: 'Choose the picture that says what you need.',
    visual: 'Picture Talk',
    correct: 'Bathroom',
    choices: ['Bathroom', 'Food', 'Water', 'Sleep', 'TV', 'Tired']
  },
  'Ask Help': {
    type: 'choices',
    prompt: 'Choose a clear way to ask for help.',
    visual: 'HELP',
    correct: 'Help please',
    choices: ['Help please', 'No', 'Run', 'Later']
  },
  'Take Turns': {
    type: 'turns',
    prompt: 'Practice taking turns.',
    turns: ['My turn', 'Your turn', 'Wait', 'Play again']
  },
  'Joint Attention': {
    type: 'script',
    prompt: 'Practice shared attention with one object.',
    lines: ['Look', 'Point', 'Show me', 'Your turn', 'Good looking']
  },
  'Share Toys': {
    type: 'turns',
    prompt: 'Practice sharing with a short turn routine.',
    turns: ['My turn', 'Your turn', 'Wait', 'Thank you']
  },
  'Copy Movements': {
    type: 'script',
    prompt: 'Copy each simple movement.',
    lines: ['Clap hands', 'Wave hello', 'Tap table', 'Touch head', 'Use toy']
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
  'Emotion Picture Board': {
    type: 'choices',
    prompt: 'Choose the tired face.',
    visual: 'TIRED',
    correct: 'Tired',
    choices: ['Happy', 'Sad', 'Tired', 'Angry']
  },
  Faces: {
    type: 'choices',
    prompt: 'Choose the face that looks sad.',
    visual: 'SAD',
    correct: 'Sad',
    choices: ['Happy', 'Sad', 'Sleepy', 'Surprised']
  },
  'Sort It': {
    type: 'choices',
    prompt: 'Which item belongs with colors?',
    visual: 'COLOR',
    correct: 'Red',
    choices: ['Red', 'Cup', 'Shoe', 'Bed']
  },
  'Sound + Picture': {
    type: 'choices',
    prompt: 'Match the quiet sound card to the picture.',
    visual: 'RAIN',
    correct: 'Rain',
    choices: ['Rain', 'Car', 'Bell', 'Clap']
  },
  'Star Rewards': {
    type: 'script',
    prompt: 'Practice a small celebration.',
    lines: ['Try', 'Finish', 'Star', 'All done']
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
  'Count Sheep': {
    type: 'count',
    prompt: 'Count five bedtime pictures slowly.',
    items: ['1', '2', '3', '4', '5']
  },
  'Sensory Images': {
    type: 'choices',
    prompt: 'Choose a calm sensory picture.',
    visual: 'FLOWER',
    correct: 'Flower',
    choices: ['Flower', 'Sun', 'Bed', 'Cup']
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

function saveText(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Storage can be unavailable in private or restricted browser contexts.
  }
}

function loadText(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function resetLocalStateFromUrl() {
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get('reset') !== '1') return;

    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('brightsteps-')) {
        localStorage.removeItem(key);
      }
    });
    window.history.replaceState({}, '', window.location.pathname || '/');
  } catch {
    // Keep the app usable if storage or history APIs are unavailable.
  }
}

resetLocalStateFromUrl();

function asArray(value, fallback = []) {
  return Array.isArray(value) ? value : fallback;
}

function createProfileId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `child-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function normalizeProfile(saved) {
  if (!saved || typeof saved !== 'object') return null;
  return {
    ...defaultProfile,
    ...saved,
    id: saved.id || createProfileId(),
    avatar: saved.avatar || defaultProfile.avatar,
    sensory: asArray(saved.sensory),
    dailySkills: asArray(saved.dailySkills),
    objectives: asArray(saved.objectives),
    learningStyle: asArray(saved.learningStyle, defaultProfile.learningStyle),
    interests: asArray(saved.interests),
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
  const isNewDay = lastActiveDate !== todayKey;
  const streak = isNewDay && saved?.todayDone ? (saved?.streak || 0) + 1 : (saved?.streak || 0);
  return {
    ...defaultProgress,
    ...saved,
    completed: asArray(saved?.completed, defaultProgress.completed),
    practiced: asArray(saved?.practiced, defaultProgress.practiced),
    counts: { ...defaultProgress.counts, ...(saved?.counts || {}) },
    moodLog: asArray(saved?.moodLog, defaultProgress.moodLog),
    breakRequests: Number.isFinite(saved?.breakRequests) ? saved.breakRequests : defaultProgress.breakRequests,
    rewardStars: Number.isFinite(saved?.rewardStars) ? saved.rewardStars : defaultProgress.rewardStars,
    todayDone: isNewDay ? false : Boolean(saved?.todayDone),
    dailyGoal: Number.isFinite(saved?.dailyGoal) && saved.dailyGoal > 0 ? saved.dailyGoal : defaultProgress.dailyGoal,
    todayActivities: isNewDay ? [] : asArray(saved?.todayActivities, defaultProgress.todayActivities),
    badges: asArray(saved?.badges, defaultProgress.badges),
    streak,
    lastActiveDate: todayKey
  };
}

function getPersonalization(profile) {
  if (!profile) return [];
  const notes = [];
  if (profile.letters === 'Does not recognize letters') notes.push('Start with visual letter matching.');
  if (profile.letters !== 'Does not recognize letters') notes.push('Include simple word play.');
  if (profile.letters === 'Can read fluently') notes.push('Offer short reading choices with clear visuals.');
  if (profile.communication === 'Non-verbal' || profile.communication?.includes('AAC') || profile.communication?.includes('picture')) {
    notes.push('Show visual choices and AAC-style buttons.');
  }
  if (asArray(profile.objectives).includes('Attention and following directions')) notes.push('Try joint attention and one-step directions.');
  if (asArray(profile.objectives).includes('Motor imitation')) notes.push('Begin with clap, wave, and toy imitation.');
  if (asArray(profile.objectives).includes('Self-care routines')) notes.push('Practice hands, teeth, dressing, bathroom, and bedtime.');
  if (asArray(profile.sensory).includes('Sounds')) notes.push('Sound starts off and can stay muted.');
  if (asArray(profile.learningStyle).includes('Images')) notes.push('Prioritize picture-first steps.');
  if (profile.supportLevel?.startsWith('Level 3')) notes.push('Use shorter activities with fewer choices.');
  return notes;
}

function App() {
  const [{ profiles, profile }, setProfileState] = useState(getInitialProfileState);
  const [progress, setProgress] = useState(() => normalizeProgress(loadJson(getProgressStorageKey(profile?.id), loadJson(PROGRESS_KEY, defaultProgress))));
  const [screen, setScreen] = useState(profile ? 'home' : 'onboarding');
  const [parentUnlocked, setParentUnlocked] = useState(false);
  const [soundOff, setSoundOff] = useState(() => profile?.sensory?.includes('Sounds') ?? false);
  const [activeActivity, setActiveActivity] = useState(null);
  const [celebration, setCelebration] = useState(null);
  const [profileDraft, setProfileDraft] = useState(undefined);

  const personalization = useMemo(() => getPersonalization(profile), [profile]);
  const activeAvatar = getMoodAvatar(progress.moodLog[0]?.mood, profile?.avatar);

  function persistActiveProfile(nextProfile, nextProfiles) {
    setProfileState({ profiles: nextProfiles, profile: nextProfile });
    setSoundOff(nextProfile.sensory.includes('Sounds'));
    saveJson(PROFILES_KEY, nextProfiles);
    saveJson(STORAGE_KEY, nextProfile);
    saveText(ACTIVE_PROFILE_KEY, nextProfile.id);
  }

  function saveProgress(next) {
    saveJson(getProgressStorageKey(profile?.id), next);
  }

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
    saveProgress(next);
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
    saveProgress(next);
  }

  function handleMoodChoice(mood) {
    const now = new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    const next = {
      ...progress,
      moodLog: [{ mood, time: now }, ...progress.moodLog].slice(0, 5),
      rewardStars: progress.rewardStars + 1,
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

  if (screen === 'onboarding') {
    return <Onboarding onComplete={handleProfile} initialProfile={profileDraft === undefined ? profile : profileDraft} />;
  }

  if (screen === 'avatar' && profile) {
    return <ChildAvatarSetup profile={profile} onChoose={(avatar) => {
      updateProfile({ avatar });
      setScreen('home');
    }} />;
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <button className="brand" onClick={() => setScreen('home')} aria-label="Go home">
          <Avatar avatar={activeAvatar} name={profile?.name || 'Child'} size="small" />
          <span>
            <strong>BrightSteps</strong>
            <small>{profile?.name ? `For ${profile.name}` : 'Learning companion'}</small>
          </span>
        </button>
        <div className="topbar-actions">
          <button className="calm-header-button" type="button" onClick={() => setScreen('calm')} aria-label="Open Calm Zone">
            <Moon size={18} /> <span>Calm Zone</span>
          </button>
          <button
            className="icon-button"
            onClick={() => setSoundOff((value) => !value)}
            aria-label={soundOff ? 'Enable sound' : 'Disable sound'}
            title={soundOff ? 'Enable sound' : 'Disable sound'}
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
            personalization={personalization}
            progress={progress}
            soundOff={soundOff}
            setScreen={setScreen}
            onQuickChoice={handleQuickChoice}
            onMoodChoice={handleMoodChoice}
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
    {
      ...defaultProfile,
      ...initialProfile
    }
  );

  const steps = [
    {
      title: 'Child profile',
      content: (
        <>
          <div className="form-grid">
            <label>Name or nickname<input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Child name" /></label>
            <SelectField label="Age" value={form.age} options={choiceSets.age} onChange={(value) => setForm({ ...form, age: value })} />
          </div>
        </>
      )
    },
    { title: 'School level', content: <ChoiceGroup label="School grade or level" hideLabel value={form.grade} options={choiceSets.grade} onChange={(value) => setForm({ ...form, grade: value })} /> },
    { title: 'Support and communication', content: <><ChoiceGroup label="Support level" value={form.supportLevel} options={choiceSets.supportLevel} onChange={(value) => setForm({ ...form, supportLevel: value })} /><ChoiceGroup label="Communication style" value={form.communication} options={choiceSets.communication} onChange={(value) => setForm({ ...form, communication: value })} /></> },
    { title: 'Learning levels', content: <><ChoiceGroup label="Letter recognition" value={form.letters} options={choiceSets.letters} onChange={(value) => setForm({ ...form, letters: value })} /><ChoiceGroup label="Number recognition" value={form.numbers} options={choiceSets.numbers} onChange={(value) => setForm({ ...form, numbers: value })} /></> },
    { title: 'Social skills', content: <ChoiceGroup label="Social skill level" hideLabel value={form.social} options={choiceSets.social} onChange={(value) => setForm({ ...form, social: value })} /> },
    {
      title: 'Sensory profile',
      helper: 'Sensitive to:',
      content: <MultiChoice label="Sensory sensitivities" hideLabel values={form.sensory} options={choiceSets.sensory} onChange={(values) => setForm({ ...form, sensory: values })} />
    },
    { title: 'Daily skills already learned', content: <MultiChoice label="Skills they already have" hideLabel values={form.dailySkills} options={choiceSets.dailySkills} onChange={(values) => setForm({ ...form, dailySkills: values })} /> },
    { title: 'Parent objectives', content: <MultiChoice label="Objectives you want to achieve" hideLabel values={form.objectives || []} options={choiceSets.objectives} onChange={(values) => setForm({ ...form, objectives: values })} /> },
    {
      title: 'Learning style',
      content: <MultiChoice label="Preferred learning style" hideLabel values={form.learningStyle} options={choiceSets.learningStyle} onChange={(values) => setForm({ ...form, learningStyle: values })} />
    },
    {
      title: 'Favorite topics',
      content: (
        <>
          <MultiChoice label="Favorite topics" hideLabel values={form.interests} options={choiceSets.interests} onChange={(values) => setForm({ ...form, interests: values })} />
          <label className="confirm-row setup-confirm">
            <input type="checkbox" checked={form.diagnosisConfirmed} onChange={(event) => setForm({ ...form, diagnosisConfirmed: event.target.checked })} />
            This app is for a child who already has a diagnosis and will be used under parent or caregiver responsibility.
          </label>
        </>
      )
    }
  ];

  const isLastStep = step === steps.length - 1;
  const canContinue = step !== 0 || (form.name.trim() && form.age);
  const canSave = form.diagnosisConfirmed;

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
        {steps[step].helper && <p className="step-helper">{steps[step].helper}</p>}
        {steps[step].content}
        <div className="form-actions">
          <button className="secondary-button" disabled={step === 0} onClick={() => setStep(step - 1)}><ArrowLeft size={18} /> Back</button>
          {step < steps.length - 1 ? (
            <button className="primary-button" disabled={!canContinue} onClick={() => setStep(step + 1)}>Next <ChevronRight size={18} /></button>
          ) : (
            <button className="primary-button" disabled={isLastStep && !canSave} onClick={() => onComplete({ ...form, name: form.name.trim() || 'My child' })}><Check size={18} /> Save profile</button>
          )}
        </div>
      </section>
    </main>
  );
}

function ChoiceGroup({ label, value, options, onChange, compact = false, hideLabel = false }) {
  return (
    <fieldset className={compact ? 'choice-group compact-choice-group' : 'choice-group'}>
      <legend className={hideLabel ? 'sr-only' : undefined}>{label}</legend>
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

function SelectField({ label, value, options, onChange }) {
  return (
    <label>
      {label}
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </label>
  );
}

function MultiChoice({ label, values, options, onChange, hideLabel = false }) {
  function toggle(option) {
    onChange(values.includes(option) ? values.filter((item) => item !== option) : [...values, option]);
  }
  return (
    <fieldset className="choice-group">
      <legend className={hideLabel ? 'sr-only' : undefined}>{label}</legend>
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

function AvatarPicker({ value, onChange }) {
  return (
    <fieldset className="avatar-picker">
      <legend>Avatar</legend>
      <div className="avatar-choice-list">
        {avatarOptions.map((option) => (
          <button
            key={option.key}
            type="button"
            className={value === option.key ? 'avatar-choice selected' : 'avatar-choice'}
            aria-pressed={value === option.key}
            onClick={() => onChange(option.key)}
          >
            <Avatar avatar={option.key} name={option.label} size="large" />
            <strong>{option.label}</strong>
          </button>
        ))}
      </div>
    </fieldset>
  );
}

function ChildAvatarSetup({ profile, onChoose }) {
  const [selected, setSelected] = useState(profile.avatar || defaultProfile.avatar);

  return (
    <main className="onboarding child-avatar-screen">
      <section className="onboarding-panel child-avatar-panel">
        <div className="panel-heading">
          <Avatar avatar={selected} name={profile.name || 'Child'} size="hero" />
          <div>
            <p className="eyebrow">Child choice</p>
            <h1>Choose your buddy</h1>
            <p>{profile.name || 'Your child'} can pick the picture they want to use in BrightSteps.</p>
          </div>
        </div>
        <AvatarPicker value={selected} onChange={setSelected} />
        <div className="form-actions avatar-actions">
          <span />
          <button className="primary-button" type="button" onClick={() => onChoose(selected)}>
            <Check size={18} /> Start BrightSteps
          </button>
        </div>
      </section>
    </main>
  );
}

function ChildHome({ profile, activeAvatar, personalization, progress, soundOff, setScreen, onQuickChoice, onMoodChoice }) {
  const [quickStatus, setQuickStatus] = useState(null);
  const [moodPickerOpen, setMoodPickerOpen] = useState(false);
  const goalTotal = Math.max(1, progress.dailyGoal);
  const goalComplete = Math.min(progress.todayActivities.length, goalTotal);
  const rewardItems = getRewardItems(progress.rewardStars);
  const cards = [
    { id: 'learn', label: 'Learn', icon: <BookOpen />, tone: 'mint' },
    { id: 'daily', label: 'Daily Skills', icon: <HeartHandshake />, tone: 'sun' },
    { id: 'social', label: 'Social', icon: <Users />, tone: 'rose' },
    { id: 'play', label: 'Play', icon: <Puzzle />, tone: 'sky' },
    { id: 'calm', label: 'Calm Zone', icon: <Leaf />, tone: 'lavender' }
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
    },
    break: {
      icon: <VisualAsset label="Break" imageKey="Break" className="quick-choice-image" fallback={false} />,
      label: 'Break',
      title: 'Break card ready',
      message: 'Quiet choice selected. A short calm break was added to progress.'
    },
    done: {
      icon: <VisualAsset label="Done" imageKey="Done" className="quick-choice-image" fallback={false} />,
      label: 'Done',
      title: 'Check-in complete',
      message: 'Today check-in is marked done. Three reward stars added.'
    }
  };

  function selectQuickChoice(choice) {
    if (choice === 'happy') {
      setMoodPickerOpen((value) => !value);
      setQuickStatus(quickChoices.happy);
      return;
    }
    onQuickChoice(choice);
    setMoodPickerOpen(false);
    setQuickStatus(quickChoices[choice]);
    if (!soundOff && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(quickChoices[choice].label);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  }

  function selectMood(mood) {
    onMoodChoice(mood.label);
    setMoodPickerOpen(false);
    setQuickStatus({
      title: `${mood.label} saved`,
      message: `${profile?.name || 'Friend'} feels ${mood.label.toLowerCase()}. One reward star added.`,
      label: mood.label
    });
    if (!soundOff && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(mood.label);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  }

  return (
    <>
      <section className="welcome-band">
        <div className="welcome-copy">
          <p className="eyebrow">Hello {profile?.name || 'friend'}</p>
          <h1>Choose a bright step</h1>
        </div>
        <div className="home-avatar-card" aria-label={`${profile?.name || 'Child'} profile avatar`}>
          <Avatar avatar={activeAvatar} name={profile?.name || 'Child'} size="hero" />
          <strong>{progress.moodLog[0]?.mood || profile?.name || 'My avatar'}</strong>
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
              <strong>{mood.label}</strong>
            </button>
          ))}
        </section>
      )}
      <section className="daily-progress" aria-label="Daily reward progress">
        <div>
          <p className="eyebrow">Daily goal</p>
          <h2>{goalComplete} of {goalTotal} activities</h2>
          <div className="goal-track">
            <span style={{ width: `${Math.min(100, (progress.todayActivities.length / goalTotal) * 100)}%` }} />
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
              <div className="activity-visual" aria-hidden="true">
                <VisualAsset label={activity.icon} imageKey={activity.title} />
              </div>
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
  const [countIndex, setCountIndex] = useState(0);
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
  const countDone = config.type === 'count' && countIndex >= (config.items || []).length;
  const timerDone = config.type === 'timer' && secondsLeft === 0;
  const done = choicesDone || stepsDone || breathDone || countDone || timerDone;
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
            <div className="target-card">
              <VisualAsset label={config.visual} className="target-image" />
            </div>
            <div className="game-choices">
              {config.choices.map((choice) => (
                <button
                  key={choice}
                  type="button"
                  className={selected === choice ? 'game-choice selected' : 'game-choice'}
                  onClick={() => setSelected(choice)}
                >
                  <VisualAsset label={choice} className="choice-image" fallback={false} />
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
            <strong>{done ? 'Nice work!' : 'Keep trying.'}</strong>
            <span>{done ? 'This activity is ready to finish.' : 'Try the matching answer or next step.'}</span>
          </div>
        )}

        <div className="form-actions">
          <button className="secondary-button" type="button" onClick={() => {
            setSelected(null);
            setStepIndex(0);
            setBreaths(0);
            setCountIndex(0);
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
          aria-label={activity.title === 'Color Match' ? `Color card: ${game.target.label}` : undefined}
          style={activity.title === 'Color Match' ? { '--target-color': game.target.value } : undefined}
        >
          {activity.title === 'Color Match' ? (
            <span className="sr-only">{game.target.label}</span>
          ) : (
            activity.title === 'Number Garden' ? (
              <div className="flower-count" aria-hidden="true">
                <VisualAsset label="Flower" className="count-image" />
                <VisualAsset label="Flower" className="count-image" />
                <VisualAsset label="Flower" className="count-image" />
              </div>
            ) : (
              <VisualAsset label={game.target.label} className="target-image" />
            )
          )}
        </div>
        <div className="game-choices">
          {game.choices.map((choice) => (
            <button
              key={choice.label}
              type="button"
              className={selected?.label === choice.label ? 'game-choice selected' : 'game-choice'}
              onClick={() => setSelected(choice)}
            >
              <VisualAsset label={choice.label} className="choice-image" fallback={false} />
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
  const [deck, setDeck] = useState(() => shuffleCards(memoryCards));
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const complete = matched.length === memoryCards.length;

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
          <p className="eyebrow">Find pairs</p>
          <h2>Turn over two cards. Match the same pictures.</h2>
        </div>
        <div className="memory-grid">
          {deck.map((card) => {
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
            setDeck(shuffleCards(memoryCards));
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
  if (category === 'daily') {
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

function ParentDashboard({ profile, profiles, progress, personalization, onProfileChange, onSwitchProfile, onAddChild, onEdit, onReset }) {
  const objectives = profile?.objectives?.length ? profile.objectives : ['No objectives selected yet'];
  const selectedObjectives = asArray(profile?.objectives);
  const nextActivities = [
    selectedObjectives.includes('Daily independence') ? 'Daily reminder practice' : 'Short daily routine',
    profile?.communication === 'Non-verbal' ? 'AAC help choices' : 'Ask for help story',
    profile?.letters === 'Can read fluently' ? 'Reading choices' : (profile?.letters === 'Does not recognize letters' ? 'Letter Match' : 'Simple Words')
  ];

  function toggleObjective(objective) {
    const nextObjectives = selectedObjectives.includes(objective)
      ? selectedObjectives.filter((item) => item !== objective)
      : [...selectedObjectives, objective];
    onProfileChange({ objectives: nextObjectives });
  }

  return (
    <section className="parent-dashboard">
      <div className="parent-hero">
        <div>
          <p className="eyebrow">Parent dashboard</p>
          <h1>{profile?.name}'s profile and progress</h1>
        </div>
        <div className="parent-actions">
          <button className="secondary-button" onClick={onAddChild}><Baby size={18} /> Add child</button>
          <button className="secondary-button" onClick={onEdit}><RotateCcw size={18} /> Edit profile</button>
          <button className="danger-button" onClick={onReset}>Reset</button>
        </div>
      </div>
      <div className="profile-switcher" aria-label="Child profiles">
        {profiles.map((item) => (
          <button
            key={item.id}
            type="button"
            className={item.id === profile?.id ? 'profile-tab active' : 'profile-tab'}
            aria-pressed={item.id === profile?.id}
            onClick={() => onSwitchProfile(item.id)}
          >
            <Baby size={16} />
            {item.name || 'My child'}
          </button>
        ))}
      </div>
      <div className="dashboard-grid">
        <DashboardPanel title="Child Profile" icon={<Baby />}>
          <div className="profile-avatar-row">
            <Avatar avatar={profile?.avatar} name={profile?.name || 'Child'} size="medium" />
            <strong>{avatarOptions.find((option) => option.key === profile?.avatar)?.label || 'Avatar'}</strong>
          </div>
          <InfoRow label="Age" value={profile?.age} />
          <InfoRow label="Grade / level" value={profile?.grade || 'Not set'} />
          <InfoRow label="Support" value={profile?.supportLevel} />
          <InfoRow label="Communication" value={profile?.communication} />
          <InfoRow label="Reading" value={profile?.letters} />
        </DashboardPanel>
        <DashboardPanel title="Parent Objectives" icon={<Star />}>
          <div className="objective-picker" aria-label="Select parent objectives">
            {choiceSets.objectives.map((objective) => (
              <button
                key={objective}
                type="button"
                className={selectedObjectives.includes(objective) ? 'objective-option selected' : 'objective-option'}
                aria-pressed={selectedObjectives.includes(objective)}
                onClick={() => toggleObjective(objective)}
              >
                {selectedObjectives.includes(objective) && <Check size={16} />}
                {objective}
              </button>
            ))}
          </div>
          <TagList items={objectives} />
        </DashboardPanel>
        <DashboardPanel title="Daily Skills Already Learned" icon={<HeartHandshake />}>
          <TagList items={profile?.dailySkills?.length ? profile.dailySkills : ['None selected yet']} />
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
        <DashboardPanel title="Activities Practiced" icon={<Sparkles />}>
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
        This app is educational and supportive for children who already have a diagnosis and is used under parent or caregiver responsibility. It does not diagnose autism, provide medical advice, or replace therapy, clinical care, or guidance from qualified professionals.
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
