import { asArray } from '../lib/collections.js';

export const quickCommunicationCards = [
  { label: 'Yes', image: 'Yes', sentence: 'Yes.' },
  { label: 'No', image: 'No', sentence: 'No.' },
  { label: 'Help', image: 'Help', sentence: 'I need help.' },
  { label: 'Stop', image: 'Stop', sentence: 'Stop please.' },
  { label: 'Break', image: 'Break', sentence: 'I need a break.', followUp: 'break' },
  { label: 'Bathroom', image: 'Bathroom', sentence: 'I need the bathroom.' },
  { label: 'All Done', image: 'All done', sentence: 'All done.' }
];

export const communicationCategories = [
  {
    id: 'want',
    label: 'I Want',
    description: 'food, drink, toys',
    image: 'Drink',
    cards: [
      { label: 'Water', image: 'Water', sentence: 'I want water.' },
      { label: 'Eat', image: 'Eat', sentence: 'I want to eat.' },
      { label: 'Toy', image: 'Toy', sentence: 'I want a toy.' },
      { label: 'Music', image: 'Sound + Picture', sentence: 'I want music.' },
      { label: 'Outside', image: 'Sun', sentence: 'I want to go outside.' },
      { label: 'Play', image: 'Play', sentence: 'I want to play.' },
      { label: 'Drink', image: 'Drink', sentence: 'I want a drink.' },
      { label: 'More', image: 'More please', sentence: 'I want more.' }
    ]
  },
  {
    id: 'need',
    label: 'I Need',
    description: 'help, bathroom, break',
    image: 'Bathroom',
    cards: [
      { label: 'Help', image: 'Help', sentence: 'I need help.' },
      { label: 'Break', image: 'Break', sentence: 'I need a break.', followUp: 'break' },
      { label: 'Bathroom', image: 'Bathroom', sentence: 'I need the bathroom.' },
      { label: 'Water', image: 'Water', sentence: 'I need water.' },
      { label: 'Food', image: 'Eat', sentence: 'I need food.' },
      { label: 'Quiet', image: 'Calm Break', sentence: 'I need quiet.' },
      { label: 'Rest', image: 'Sleep', sentence: 'I need rest.' },
      { label: 'Caregiver', image: 'Thank you', sentence: 'I need my caregiver.' }
    ]
  },
  {
    id: 'sensory',
    label: 'Sensory Needs',
    description: 'loud, bright, crowded',
    image: 'Sensory Needs',
    cards: [
      { label: 'Too loud', image: 'Sensory Needs', sentence: 'It is too loud.' },
      { label: 'Too bright', image: 'Sensory Needs', sentence: 'It is too bright.' },
      { label: 'Too crowded', image: 'Sensory Needs', sentence: 'It is too crowded.' },
      { label: 'Too close', image: 'Sensory Needs', sentence: 'Too close.' },
      { label: 'Uncomfortable', image: 'Sensory Needs', sentence: 'I am uncomfortable.' },
      { label: 'Headphones', image: 'Headphones', sentence: 'I need headphones.' },
      { label: 'Quiet', image: 'Calm Break', sentence: 'I need quiet.' },
      { label: 'Dim lights', image: 'Calm Break', sentence: 'I need dim lights.' }
    ]
  },
  {
    id: 'feel',
    label: 'I Feel',
    description: 'happy, sad, mad',
    image: 'Happy',
    cards: [
      { group: 'Feelings', label: 'Happy', image: 'Happy', sentence: 'I feel happy.' },
      { group: 'Feelings', label: 'Sad', image: 'Sad', sentence: 'I feel sad.' },
      { group: 'Feelings', label: 'Mad', image: 'Mad', sentence: 'I feel mad.' },
      { group: 'Feelings', label: 'Scared', image: 'Worried', sentence: 'I feel scared.' },
      { group: 'Feelings', label: 'Tired', image: 'Tired', sentence: 'I feel tired.' },
      { group: 'Feelings', label: 'Excited', image: 'Excited', sentence: 'I feel excited.' },
      { group: 'Feelings', label: 'Calm', image: 'Calm', sentence: 'I feel calm.' },
      { group: 'Feelings', label: 'Frustrated', image: 'Mad', sentence: 'I feel frustrated.' },
      { group: 'Feelings', label: 'Overwhelmed', image: 'Worried', sentence: 'I feel overwhelmed.' },
      { group: 'Feelings', label: 'Sick', image: 'Tired', sentence: 'I feel sick.' },
      { group: 'Affection', label: 'I love you', image: 'Heart', sentence: 'I love you.' },
      { group: 'Affection', label: 'Love mommy', image: 'Heart', sentence: 'I love mommy.' },
      { group: 'Affection', label: 'Love daddy', image: 'Heart', sentence: 'I love daddy.' },
      { group: 'Affection', label: 'I miss you', image: 'Sad', sentence: 'I miss you.' },
      { group: 'Affection', label: 'Hug you', image: 'Thank you', sentence: 'I want to hug you.' },
      { group: 'Affection', label: 'Hold hands', image: 'Take Turns', sentence: 'I want to hold your hand.' },
      { group: 'Affection', label: 'Stay with me', image: 'Thank you', sentence: 'Stay with me.' }
    ]
  },
  {
    id: 'like',
    label: "Like / Don't Like",
    description: 'favorite or no',
    image: 'Heart',
    cards: [
      { label: 'I Like', image: 'Thank you', sentence: 'I like this.' },
      { label: "I Don't Like", image: 'Stop', sentence: "I don't like this." },
      { label: 'Music', image: 'Sound + Picture', sentence: 'I like music.' },
      { label: 'Loud Sounds', image: 'Worried', sentence: "I don't like loud sounds." },
      { label: 'This', image: 'Choice Board', sentence: "I don't like this." },
      { label: 'Outside', image: 'Sun', sentence: 'I like outside.' },
      { label: 'Play', image: 'Play', sentence: 'I like playing.' },
      { label: 'Quiet', image: 'Calm', sentence: 'I like quiet.' }
    ]
  },
  {
    id: 'yes-no',
    label: 'Yes / No',
    description: 'answer clearly',
    image: 'Yes',
    large: true,
    cards: [
      { label: 'Yes', image: 'Yes', sentence: 'Yes.' },
      { label: 'No', image: 'No', sentence: 'No.' },
      { label: 'Maybe', image: 'Okay', sentence: 'Maybe. I am not sure.' }
    ]
  },
  {
    id: 'help',
    label: 'Help Me',
    description: 'open, show, come',
    image: 'Help',
    cards: [
      { label: 'Help me', image: 'Help', sentence: 'Help me.' },
      { label: 'Open it', image: 'Toy', sentence: 'Open it please.' },
      { label: 'Show me', image: 'Eye', sentence: 'Show me please.' },
      { label: 'Come with me', image: 'Thank you', sentence: 'Come with me.' },
      { label: "I can't do it", image: 'Worried', sentence: "I can't do it." },
      { label: 'Please help', image: 'Help', sentence: 'Please help me.' }
    ]
  },
  {
    id: 'more',
    label: 'More / All Done',
    description: 'again, wait, finished',
    image: 'All done',
    cards: [
      { label: 'More', image: 'More please', sentence: 'More please.' },
      { label: 'Again', image: 'Again', sentence: 'Again please.' },
      { label: 'All done', image: 'All done', sentence: 'All done.' },
      { label: 'Stop', image: 'Stop', sentence: 'Stop please.' },
      { label: 'Wait', image: 'Timer', sentence: 'Wait please.' }
    ]
  },
  {
    id: 'questions',
    label: 'Questions',
    description: 'what, where, who',
    image: 'Eye',
    cards: [
      { label: 'What?', image: 'Choice Board', sentence: 'What?' },
      { label: 'Where?', image: 'Eye', sentence: 'Where?' },
      { label: 'Who?', image: 'Thank you', sentence: 'Who?' },
      { label: 'When?', image: 'Timer', sentence: 'When?' },
      { label: 'Why?', image: 'Worried', sentence: 'Why?' },
      { label: 'Can I?', image: 'Help', sentence: 'Can I?' },
      { label: 'Where is Mom?', image: 'Heart', sentence: 'Where is Mom?' },
      { label: 'What is that?', image: 'Eye', sentence: 'What is that?' }
    ]
  },
  {
    id: 'play',
    label: 'Games',
    description: 'my turn, play with me',
    image: 'Toy',
    cards: [
      { label: "Let's play", image: 'Play', sentence: "Let's play." },
      { label: 'Play with me', image: 'Play', sentence: 'Play with me.' },
      { label: 'My turn', image: 'Take Turns', sentence: 'My turn.' },
      { label: 'Your turn', image: 'Take Turns', sentence: 'Your turn.' },
      { label: 'Together', image: 'Share Toys', sentence: "Let's do it together." },
      { label: 'Again', image: 'Again', sentence: 'Again please.' },
      { label: 'Share', image: 'Share Toys', sentence: 'Share please.' }
    ]
  },
  {
    id: 'love-space',
    label: 'Love & Space',
    description: 'hug, I love you, space',
    image: 'Love & Space',
    cards: [
      { group: 'Affection', label: 'Hug me', image: 'Thank you', sentence: 'I want a hug.' },
      { group: 'Affection', label: 'Hug you', image: 'Thank you', sentence: 'I want to hug you.' },
      { group: 'Affection', label: 'Kiss', image: 'Heart', sentence: 'I want a kiss.' },
      { group: 'Affection', label: 'I love you', image: 'Heart', sentence: 'I love you.' },
      { group: 'Affection', label: 'Hold my hand', image: 'Take Turns', sentence: 'Please hold my hand.' },
      { group: 'Affection', label: 'Hold your hand', image: 'Take Turns', sentence: 'I want to hold your hand.' },
      { group: 'Affection', label: 'Sit with me', image: 'Thank you', sentence: 'Sit with me.' },
      { group: 'Affection', label: 'Stay with me', image: 'Thank you', sentence: 'Stay with me.' },
      { group: 'Affection', label: 'I want mommy', image: 'Heart', sentence: 'I want mommy.' },
      { group: 'Affection', label: 'I want daddy', image: 'Heart', sentence: 'I want daddy.' },
      { group: 'Affection', label: 'I miss you', image: 'Sad', sentence: 'I miss you.' },
      { group: 'Affection', label: 'Cuddle', image: 'Heart', sentence: 'I want to cuddle.' },
      { group: 'Affection', label: 'High five', image: 'Take Turns', sentence: 'High five.' },
      { group: 'Personal Space', label: 'I need space', image: 'Calm', sentence: 'I need space.' },
      { group: 'Personal Space', label: 'No hug', image: 'Stop', sentence: 'No hug right now.' },
      { group: 'Personal Space', label: 'Not now', image: 'Timer', sentence: 'Not now.' },
      { group: 'Personal Space', label: "Don't touch me", image: 'Stop', sentence: "Don't touch me." },
      { group: 'Personal Space', label: 'Too close', image: 'Worried', sentence: 'Too close.' },
      { group: 'Personal Space', label: 'Stop', image: 'Stop', sentence: 'Stop please.' },
      { group: 'Personal Space', label: 'Wait', image: 'Timer', sentence: 'Wait please.' },
      { group: 'Personal Space', label: 'Gentle hands', image: 'Heart', sentence: 'Gentle hands please.' },
      { group: 'Personal Space', label: 'Alone', image: 'Calm', sentence: 'I want to be alone.' },
      { group: 'Personal Space', label: 'Break', image: 'Break', sentence: 'I need a break.', followUp: 'break' }
    ]
  },
  {
    id: 'break',
    label: 'I Need a Break',
    description: 'quiet, alone, breathe',
    image: 'Calm Break',
    cards: [
      { label: 'I need a break', image: 'Calm Break', sentence: 'I need a break.', followUp: 'break', prominent: true },
      { label: 'Quiet', image: 'Calm Break', sentence: 'I need a break. I want quiet.' },
      { label: 'Headphones', image: 'Headphones', sentence: 'I need a break. I want headphones.' },
      { label: 'Sit down', image: 'Bed', sentence: 'I need a break. I want to sit down.' },
      { label: 'Dim lights', image: 'Calm Break', sentence: 'I need a break. I want dim lights.' },
      { label: 'Alone time', image: 'Calm', sentence: 'I need a break. I want alone time.' },
      { label: 'Breathe', image: 'Breathe', sentence: 'I need a break. I want to breathe.' },
      { label: 'Favorite item', image: 'Toy', sentence: 'I need a break. I want my favorite item.' }
    ]
  },
  {
    id: 'hurt',
    label: 'Something Hurts',
    description: 'head, stomach, ear',
    image: 'Something Hurts',
    cards: [
      { label: 'Something hurts', image: 'Something Hurts', sentence: 'Something hurts.', followUp: 'hurt', prominent: true }
    ]
  },
  {
    id: 'choice',
    label: 'My Choice',
    description: 'choose right now',
    image: 'Choice Board',
    cards: [
      { label: 'I choose this', image: 'Choice Board', sentence: 'I choose this.' },
      { label: 'Blue one', image: 'Water', sentence: 'I choose the blue one.' },
      { label: 'Music', image: 'Sound + Picture', sentence: 'I choose music.' },
      { label: 'Outside', image: 'Sun', sentence: 'I choose outside.' },
      { label: 'Toy', image: 'Toy', sentence: 'I choose the toy.' },
      { label: 'Quiet', image: 'Calm Break', sentence: 'I choose quiet.' }
    ]
  }
];

export const defaultMyVoiceSettings = {
  enabledQuick: quickCommunicationCards.map((card) => card.label),
  enabledCategories: communicationCategories.map((category) => category.id),
  customCards: []
};

export function normalizeMyVoiceSettings(settings) {
  const hasSettings = settings && typeof settings === 'object';
  const enabledQuick = asArray(settings?.enabledQuick, hasSettings ? [] : defaultMyVoiceSettings.enabledQuick)
    .filter((label) => quickCommunicationCards.some((card) => card.label === label));
  const enabledCategories = asArray(settings?.enabledCategories, hasSettings ? [] : defaultMyVoiceSettings.enabledCategories)
    .filter((id) => communicationCategories.some((category) => category.id === id));
  const customCards = asArray(settings?.customCards)
    .map((card, index) => ({
      id: card?.id || `custom-${Date.now()}-${index}`,
      label: String(card?.label || '').trim(),
      sentence: String(card?.sentence || card?.label || '').trim(),
      image: card?.image || 'Choice Board',
      custom: true
    }))
    .filter((card) => card.label && card.sentence)
    .slice(0, 12);

  return {
    enabledQuick,
    enabledCategories: enabledCategories.length ? enabledCategories : defaultMyVoiceSettings.enabledCategories,
    customCards
  };
}

export function createCustomCommunicationCategory(customCards) {
  return {
    id: 'custom',
    label: 'Custom messages',
    description: 'parent choices',
    image: 'Choice Board',
    cards: customCards
  };
}

export const breakSupportCards = [
  { label: 'Quiet', image: 'Calm Break', sentence: 'I need a break. I want quiet.' },
  { label: 'Headphones', image: 'Headphones', sentence: 'I need a break. I want headphones.' },
  { label: 'Sit down', image: 'Bed', sentence: 'I need a break. I want to sit down.' },
  { label: 'Dim lights', image: 'Moon', sentence: 'I need a break. I want dim lights.' },
  { label: 'Alone time', image: 'Calm Break', sentence: 'I need a break. I want alone time.' },
  { label: 'Breathe', image: 'Yoga Calm', sentence: 'I need a break. I want to breathe.' },
  { label: 'Favorite item', image: 'Toy', sentence: 'I need a break. I want my favorite item.' }
];

export const hurtBodyCards = ['Head', 'Eyes', 'Ears', 'Mouth', 'Throat', 'Stomach', 'Arm', 'Hand', 'Leg', 'Foot', "I don't know"].map((part) => ({
  label: part,
  image: part === 'Eyes' ? 'Eye' : part === "I don't know" ? 'Worried' : 'Worried',
  sentence: part === "I don't know" ? "Something hurts. I don't know where." : `My ${part.toLowerCase()} hurts.`,
  followUp: 'hurt-intensity'
}));

export const hurtIntensityCards = [
  { label: 'A little', image: 'Okay', sentence: 'It hurts a little.' },
  { label: 'A lot', image: 'Worried', sentence: 'It hurts a lot.' }
];
