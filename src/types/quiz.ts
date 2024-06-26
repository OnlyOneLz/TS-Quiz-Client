import updateProgress from '../components/quiz/updateProgressFetch';
import { anyProgress } from './common';

export type QuestionIds = string[];

export type UnparcedData = string | null;

export type UserAnswers = number[];

export interface SimulateProgressProps {
    preLevelProgress: anyProgress;
    progress: anyProgress;
    progressNeeded: anyProgress;
    upLevel: boolean;
    prop: boolean;
    level: anyProgress;
}

export interface QuizData {
    questions: Question[];
    answers: Answer[];
}

export interface Question {
    id: number;
    question: string;
    explanation: string;
}

export interface Answer {
    id: number;
    answer: string;
    question_id: number;
    is_correct: boolean;
    points: string;
}

export interface updateProgressRes {
    progressNeeded: {
        progressNeeded: anyProgress;
    };
    previousProgressNeeded: {
        previousProgressNeeded: anyProgress;
    };
    level: {
        level: anyProgress;
    };
}

export interface QuestionCardProps {
    question: {
        question: string;
        explanation: string;
        id: number;
    };
    userAnswer: string;
    checkAnswer: boolean;
    correctAnswer: string;
}
