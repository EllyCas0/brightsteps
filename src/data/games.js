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

