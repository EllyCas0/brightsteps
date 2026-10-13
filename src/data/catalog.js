export const categoryLabels = {
  learn: 'Learn',
  daily: 'Daily',
  speech: 'Communication',
  social: 'Social',
  play: 'Games',
  calm: 'Calm'
};

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

