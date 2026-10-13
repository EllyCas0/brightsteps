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
