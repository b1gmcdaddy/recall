import { Quiz } from '@/types/quiz';

// test data
export const sampleQuizzes: Quiz[] = [
  {
    id: '1',
    title: 'Space Exploration',
    description: 'Test your knowledge about the cosmos and space missions',
    category: 'Science',
    timesPlayed: 127,
    averageScore: 78,
    createdAt: new Date(),
    questions: [
      {
        id: 'q1',
        question: 'What is the largest planet in our solar system?',
        options: ['Mars', 'Jupiter', 'Saturn', 'Neptune'],
        correctAnswer: 1,
      },
      {
        id: 'q2',
        question: 'Which year did humans first land on the Moon?',
        options: ['1965', '1967', '1969', '1971'],
        correctAnswer: 2,
      },
      {
        id: 'q3',
        question: 'What is the closest star to Earth?',
        options: ['Alpha Centauri', 'Proxima Centauri', 'The Sun', 'Sirius'],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: '2',
    title: 'World Geography',
    description: 'How well do you know our planet?',
    category: 'Geography',
    timesPlayed: 89,
    averageScore: 65,
    createdAt: new Date(),
    questions: [
      {
        id: 'q1',
        question: 'What is the capital of Australia?',
        options: ['Sydney', 'Melbourne', 'Canberra', 'Brisbane'],
        correctAnswer: 2,
      },
      {
        id: 'q2',
        question: 'Which river is the longest in the world?',
        options: ['Amazon', 'Nile', 'Yangtze', 'Mississippi'],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: '3',
    title: 'Technology Trivia',
    description: 'Test your tech knowledge',
    category: 'Technology',
    timesPlayed: 203,
    averageScore: 82,
    createdAt: new Date(),
    questions: [
      {
        id: 'q1',
        question: 'Who is the founder of Apple Inc.?',
        options: [
          'Bill Gates',
          'Steve Jobs',
          'Elon Musk',
          'Mark Zuckerberg',
        ],
        correctAnswer: 1,
      },
      {
        id: 'q2',
        question: 'What does HTML stand for?',
        options: [
          'Hyper Text Markup Language',
          'High Tech Modern Language',
          'Home Tool Markup Language',
          'Hyperlinks and Text Markup Language',
        ],
        correctAnswer: 0,
      },
    ],
  },
];
