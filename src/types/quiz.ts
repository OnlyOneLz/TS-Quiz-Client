import updateProgress from '../components/quiz/updateProgressFetch';
import { anyProgress } from './common';

export type QuestionIds = string[];

export type UnparcedData = string | null;

export type UserAnswers = [number];

export interface SimulateProgressProps {
    preLevelProgress: anyProgress;
    progress: anyProgress;
    upLevel: boolean;
    prop: boolean;
    level: anyProgress;
}

export interface QuizData {
    questions: any[];
    answers: any[];
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

export type SimulateProgress = number

export type Points = string

export type OldProgress = string | null