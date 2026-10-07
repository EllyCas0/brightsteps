import angryFaceImage from '../assets/images/angry-face.webp';
import appleImage from '../assets/images/apple.webp';
import backpackImage from '../assets/images/backpack.webp';
import bathroomImage from '../assets/images/bathroom.webp';
import bedImage from '../assets/images/bed.webp';
import birdImage from '../assets/images/bird.webp';
import bookImage from '../assets/images/book.webp';
import breakImage from '../assets/images/break.webp';
import breatheImage from '../assets/images/breathe.webp';
import brushStep1Image from '../assets/images/brush-step-1-toothpaste.webp';
import brushStep2Image from '../assets/images/brush-step-2-brush-top.webp';
import brushStep3Image from '../assets/images/brush-step-3-brush-bottom.webp';
import brushStep4Image from '../assets/images/brush-step-4-rinse.webp';
import brushStep5Image from '../assets/images/brush-step-5-smile.webp';
import brushTeethImage from '../assets/images/brush-teeth.webp';
import calmImage from '../assets/images/calm.webp';
import calmBreakImage from '../assets/images/calm-break.webp';
import catImage from '../assets/images/cat.webp';
import cloudImage from '../assets/images/cloud.webp';
import cupImage from '../assets/images/cup.webp';
import dailySkillsImage from '../assets/images/daily-skills.webp';
import dogImage from '../assets/images/dog.webp';
import doneImage from '../assets/images/done.webp';
import emotionMatchImage from '../assets/images/emotion-match.webp';
import eyeImage from '../assets/images/eye.webp';
import excitedFaceImage from '../assets/images/excited-face.webp';
import flowerImage from '../assets/images/flower.webp';
import heartImage from '../assets/images/heart.webp';
import happyFaceImage from '../assets/images/happy-face.webp';
import houseImage from '../assets/images/house.webp';
import lionImage from '../assets/images/lion.webp';
import needsBoardImage from '../assets/images/needs-board.webp';
import numbersAndLettersImage from '../assets/images/numbers-and-letters.webp';
import okayFaceImage from '../assets/images/okay-face.webp';
import loveAndSpaceImage from '../assets/images/love-and-space.webp';
import memoryMatchImage from '../assets/images/memory-match.webp';
import mouseImage from '../assets/images/mouse.webp';
import sadFaceImage from '../assets/images/sad-face.webp';
import sensoryImage from '../assets/images/sensory.webp';
import shapeSortImage from '../assets/images/shape-sort.webp';
import socialImage from '../assets/images/social.webp';
import sortBySizeImage from '../assets/images/sort-by-size.webp';
import soundMatchImage from '../assets/images/sound-match.webp';
import somethingHurtsImage from '../assets/images/something-hurts.webp';
import sunImage from '../assets/images/sun.webp';
import tieStep1Image from '../assets/images/tie-step-1.webp';
import tieStep2Image from '../assets/images/tie-step-2.webp';
import tieStep3Image from '../assets/images/tie-step-3.webp';
import tieStep4Image from '../assets/images/tie-step-4.webp';
import tieStep5Image from '../assets/images/tie-step-5.webp';
import tieShoesImage from '../assets/images/tie-shoes.webp';
import tigerImage from '../assets/images/tiger.webp';
import tiredFaceImage from '../assets/images/tired-face.webp';
import toysImage from '../assets/images/toys.webp';
import treeImage from '../assets/images/tree.webp';
import washHandsImage from '../assets/images/wash-hands.webp';
import waterImage from '../assets/images/water.webp';
import whatGoesTogetherImage from '../assets/images/what-goes-together.webp';
import worriedFaceImage from '../assets/images/worried-face.webp';
import yogaImage from '../assets/images/yoga.webp';
import avatarBoy2 from '../assets/avatars/avatar-boy-2.webp';
import avatarGirl1 from '../assets/avatars/avatar-girl-1.webp';
import avatarGirl2 from '../assets/avatars/avatar-girl-2.webp';
import boyAngryAvatar from '../assets/avatars/boy-angry.webp';
import boy2ExcitedAvatar from '../assets/avatars/boy-2-excited.webp';
import boy2MadAvatar from '../assets/avatars/boy-2-mad.webp';
import boy2OkayAvatar from '../assets/avatars/boy-2-okay.webp';
import boy2SadAvatar from '../assets/avatars/boy-2-sad.webp';
import boy2WorriedAvatar from '../assets/avatars/boy-2-worried.webp';
import boyExcitedAvatar from '../assets/avatars/boy-excited.webp';
import boyHappyAvatar from '../assets/avatars/boy-happy.webp';
import boyOkayAvatar from '../assets/avatars/boy-okay.webp';
import boySadAvatar from '../assets/avatars/boy-sad.webp';
import boyWorriedAvatar from '../assets/avatars/boy-worried.webp';
import boyWashingHandsAvatar from '../assets/avatars/boy-washing-hands.webp';
import girl1ExcitedAvatar from '../assets/avatars/girl-1-excited.webp';
import girl1MadAvatar from '../assets/avatars/girl-1-mad.webp';
import girl1OkayAvatar from '../assets/avatars/girl-1-okay.webp';
import girl1SadAvatar from '../assets/avatars/girl-1-sad.webp';
import girl1WorriedAvatar from '../assets/avatars/girl-1-worried.webp';
import girl2ExcitedAvatar from '../assets/avatars/girl-2-excited.webp';
import girl2MadAvatar from '../assets/avatars/girl-2-mad.webp';
import girl2OkayAvatar from '../assets/avatars/girl-2-okay.webp';
import girl2SadAvatar from '../assets/avatars/girl-2-sad.webp';
import girl2WorriedAvatar from '../assets/avatars/girl-2-worried.webp';
import carsBackground from '../assets/backgrounds-by-topic/cars.webp';
import dinosBackground from '../assets/backgrounds-by-topic/dinos.webp';
import dragonsBackground from '../assets/backgrounds-by-topic/dragons.webp';
import flowersBackground from '../assets/backgrounds-by-topic/flowers.webp';
import rocketsBackground from '../assets/backgrounds-by-topic/rockets.webp';
import unicornsBackground from '../assets/backgrounds-by-topic/unicorns.webp';
import { Bone, Car, Flame, Flower2, Rocket, Sparkles } from 'lucide-react';

export {
  avatarOptions,
  choiceSets,
  defaultProfile,
  defaultProgress,
  getCommunicationOptions,
  getMoodAvatar,
  moodAvatarMap,
  normalizeAvatar,
  normalizeSupportLevel,
  supportLevelDetails
} from './profileCore.js';

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
  Apple: appleImage,
  apple: appleImage,
  Bird: birdImage,
  bird: birdImage,
  Book: bookImage,
  book: bookImage,
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
  Cloud: cloudImage,
  cloud: cloudImage,
  CHECK: doneImage,
  Circle: flowerImage,
  TOOTH: brushTeethImage,
  CAT: catImage,
  Cat: catImage,
  cat: catImage,
  Cup: cupImage,
  cup: cupImage,
  'Daily Skills': dailySkillsImage,
  Dog: dogImage,
  dog: dogImage,
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
  House: houseImage,
  house: houseImage,
  Lion: lionImage,
  lion: lionImage,
  Mad: angryFaceImage,
  'Memory Cards': memoryMatchImage,
  More: needsBoardImage,
  'Morning Routine': sunImage,
  Moon: calmImage,
  M: heartImage,
  Mouse: mouseImage,
  mouse: mouseImage,
  Needs: needsBoardImage,
  'Numbers & Letters': numbersAndLettersImage,
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
  Tiger: tigerImage,
  tiger: tigerImage,
  TIRED: tiredFaceImage,
  'Tie Shoes': tieShoesImage,
  LACE: tieShoesImage,
  Leaf: flowerImage,
  Tree: treeImage,
  tree: treeImage,
  Triangle: backpackImage,
  Tired: tiredFaceImage,
  TV: needsBoardImage,
  Water: waterImage,
  Worried: worriedFaceImage,
  Yellow: sunImage,
  'Emotion Match': emotionMatchImage,
  'Feel Check': happyFaceImage,
  Feelings: happyFaceImage,
  Faces: sadFaceImage,
  'Match Pairs': whatGoesTogetherImage,
  'Number Garden': flowerImage,
  'ABC 123 Sequence': flowerImage,
  PAIR: whatGoesTogetherImage,
  RAIN: waterImage,
  RED: flowerImage,
  SHARE: heartImage,
  SHIRT: backpackImage,
  SOAP: washHandsImage,
  SOFT: calmImage,
  Social: socialImage,
  SORT: shapeSortImage,
  SND: soundMatchImage,
  STAR: doneImage,
  'Picture Words': catImage,
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
  'Sort by Size': sortBySizeImage,
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
  'Sound Match': soundMatchImage,
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

export function getImageAsset(key) {
  return key ? imageAssets[key] : null;
}

export const activities = {
  learn: [
    { title: 'Picture Words', icon: 'CAT', level: 'basic', detail: 'Match a picture to its word', tags: ['letters', 'reading'] },
    { title: 'Simple Words', icon: 'CAT', level: 'word', detail: 'Pick the word that matches a picture', tags: ['reading'] },
    { title: 'Number Garden', icon: '1 2', level: 'basic', detail: 'Count pictures and choose the number', tags: ['numbers'] },
    { title: 'Color Match', displayTitle: 'Colors', icon: 'RED', level: 'basic', detail: 'Choose the color that matches the card', tags: ['colors'] }
  ],
  daily: [
    { title: 'Tie Shoes', icon: 'LACE', detail: 'Step-by-step shoe tying' },
    { title: 'Brush Teeth', icon: 'TOOTH', detail: 'Gentle routine practice' },
    { title: 'Wash Hands', icon: 'SOAP', detail: 'Clean hands sequence' },
    { title: 'Pack Backpack', icon: 'BAG', detail: 'School-ready checklist' },
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
    { title: 'Memory Cards', displayTitle: 'Memory Match', icon: 'Memory Cards', detail: 'Flip cards and find matching pairs' },
    { title: 'Shape Sort', icon: 'Shape Sort', detail: 'Sort 3 shapes into matching groups' },
    { title: 'Sort by Size', displayTitle: 'Size Sort', icon: 'Sort by Size', detail: 'Sort small, medium, and big' },
    { title: 'Match Pairs', displayTitle: 'Go Together', icon: 'PAIR', detail: 'Match things that go together' },
    { title: 'Emotion Match', displayTitle: 'Feeling Faces', icon: 'Emotion Match', detail: 'Match 3 feeling faces' },
    { title: 'Sound Match', displayTitle: 'Listen & Match', icon: 'SND', detail: 'Listen and match 3 sounds' }
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
    icon: 'Daily Skills',
    detail: 'Practice routines like shoes, teeth, hands, bathroom, dressing, water, and bedtime.'
  },
  {
    id: 'social',
    title: 'Social',
    icon: 'Social',
    detail: 'Practice greetings, turns, sharing, attention, feelings, and asking for help.'
  },
  {
    id: 'numbers-letters',
    title: 'Numbers & Letters',
    icon: 'Numbers & Letters',
    detail: 'Learn letters, numbers, words, shapes, colors, and memory matching.'
  }
];

export const learnedSkillActivityMap = {
  'Brushing teeth': ['Brush Teeth'],
  'Tying shoes': ['Tie Shoes'],
  'Washing hands': ['Wash Hands']
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
  'Picture Words': {
    rounds: [
      {
        prompt: 'Choose the word for the picture.',
        target: { label: 'Cat', value: 'cat' },
        choices: [
          { label: 'Cat', value: 'cat' },
          { label: 'Cup', value: 'cup' },
          { label: 'Bed', value: 'bed' },
          { label: 'Sun', value: 'sun' }
        ]
      },
      {
        prompt: 'Choose the word for the picture.',
        target: { label: 'Sun', value: 'sun' },
        choices: [
          { label: 'Bed', value: 'bed' },
          { label: 'Sun', value: 'sun' },
          { label: 'Flower', value: 'flower' },
          { label: 'Cat', value: 'cat' }
        ]
      },
      {
        prompt: 'Choose the word for the picture.',
        target: { label: 'Cup', value: 'cup' },
        choices: [
          { label: 'Flower', value: 'flower' },
          { label: 'Cat', value: 'cat' },
          { label: 'Cup', value: 'cup' },
          { label: 'Bed', value: 'bed' }
        ]
      },
      {
        prompt: 'Choose the word for the picture.',
        target: { label: 'Flower', value: 'flower' },
        choices: [
          { label: 'Sun', value: 'sun' },
          { label: 'Flower', value: 'flower' },
          { label: 'Cup', value: 'cup' },
          { label: 'Cat', value: 'cat' }
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

export const memoryPairLabels = ['Apple', 'Bird', 'Book', 'Cat', 'Dog', 'Flower', 'House', 'Lion', 'Mouse', 'Tiger'];

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
    rounds: [
      {
        visual: 'cat',
        correct: 'cat',
        choices: ['cat', 'sun', 'bed', 'cup']
      },
      {
        visual: 'sun',
        correct: 'sun',
        choices: ['bed', 'sun', 'cup', 'cat']
      },
      {
        visual: 'bed',
        correct: 'bed',
        choices: ['cup', 'cat', 'bed', 'sun']
      },
      {
        visual: 'cup',
        correct: 'cup',
        choices: ['sun', 'cup', 'cat', 'bed']
      }
    ]
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

export const speechBoards = {
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
