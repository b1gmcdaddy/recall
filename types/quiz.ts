export interface Question {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number;
}

export interface Quiz {
    id: string;
    title: string;
    description: string;
    category: string;
    questions: Question[];
    createdAt: Date;
    timesPlayed: number;
    averageScore: number;
}

export interface QuizResult {
    quizId: string;
    score: number;
    totalQuestions: number;
    answers: {
        questionsId: string;
        selectedAnswer: number;
        correct: boolean;
    }[];
    completedAt: Date;
}