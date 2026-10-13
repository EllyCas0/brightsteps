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

