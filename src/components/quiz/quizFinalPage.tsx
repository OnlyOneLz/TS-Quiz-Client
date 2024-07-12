import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HomeProgress from '../home/homeProgress';
import updateProgress from './updateProgressFetch';
import QuizFinalPageQuestionCards from './quizFinalPageQuestionCards';
import { Question, Answer, anyProgress, updateProgressRes, UserID, UnparcedData, UserAnswers } from '../../types';

export default function QuizFinalPage() {
    const removeQuizInfo = () => {
        localStorage.removeItem('quiz_data_questions');
        localStorage.removeItem('quiz_data_answers');
        localStorage.removeItem('quiz_index');
        localStorage.removeItem('users_answers');
        localStorage.removeItem('points');
        localStorage.removeItem('category');
        localStorage.removeItem('alreadyLoaded');
    };

    let [progressShowing, setProgressShowing] = useState<boolean>(false);
    let [pointsShowing, setPointsShowing] = useState<boolean>(false);
    let [progressPointsShowing, setProgressPointsShowing] = useState<boolean>(true);
    let [progressDone, setProgressDone] = useState<boolean>(false);
    let [preLevelProgress, setPreLevelProgress] = useState<number>(0);
    let [upLevel, setUpLevel] = useState<boolean>(false);

    const points: anyProgress = parseInt(localStorage.getItem('points') || '0');
    const userId: UserID = localStorage.getItem('user_id');
    const preLevel: anyProgress = parseInt(localStorage.getItem('level') || '0');
    let progress: anyProgress = parseInt(localStorage.getItem('progress') || '0');
    let alreadyLoaded: string | boolean = localStorage.getItem('alreadyLoaded') || false;

    useEffect(() => {
        const changePointsProgress = () => {
            setTimeout(() => {
                setPointsShowing(true);
                setTimeout(() => {
                    setProgressShowing(true);
                }, 1200);
            }, 2000);
        };

        changePointsProgress();

        const fetchProgressData = async () => {
            const updateProgressResult: updateProgressRes | undefined = await updateProgress(userId, points);
            if (updateProgressResult) {
                const { progressNeeded, previousProgressNeeded, level } = updateProgressResult;
                localStorage.setItem('pre_level_progress', String(progress));
                setPreLevelProgress(parseInt(localStorage.getItem('pre_level_progress') || '0'));
                localStorage.setItem('progress_needed', String(progressNeeded.progressNeeded));
                localStorage.setItem('previous_progress_needed', String(previousProgressNeeded.previousProgressNeeded));
                const pPlusP = (progress || 0) + points;
                localStorage.setItem('progress', String(pPlusP));

                if (preLevel !== level.level) {
                    localStorage.setItem('level', String(level.level));
                    setUpLevel(true);
                } else {
                    setUpLevel(false);
                }
            }
        };

        fetchProgressData();
    }, []);

    const questionsString: UnparcedData = localStorage.getItem('quiz_data_questions');
    const questions: Question[] = questionsString ? JSON.parse(questionsString) : [];

    // Retrieve user's selected answers from localStorage
    const userAnswersString: UnparcedData = localStorage.getItem('users_answers');
    const userAnswers: UserAnswers = userAnswersString ? JSON.parse(userAnswersString) : [];

    // Retrieve all answers from localStorage and transform them into an object
    const answersString: UnparcedData = localStorage.getItem('quiz_data_answers');
    const answersArray: Answer[] = answersString ? JSON.parse(answersString) : [];

    // Convert the answers array into an object where answer IDs are the keys
    const answers: Record<number, Answer> = {};
    answersArray.forEach(answer => {
        answers[answer.id] = answer;
    });

    // Create an object to map question IDs to their respective correct answers
    const correctAnswersMap: Record<number, string> = {};
    answersArray.forEach(answer => {
        if (answer.is_correct) {
            correctAnswersMap[answer.question_id] = answer.answer;
        }
    });

    return (
        <div className={`final-page`}>
            {!alreadyLoaded &&
                (progressPointsShowing && !progressShowing ? (
                    <div className={`final-page-progress-points-container `}>
                        <h2 className={`final-page-points ${pointsShowing ? 'fade-out' : ''}`}>You scored {points} points</h2>
                    </div>
                ) : (
                    <HomeProgress prop={true} preLevelProgressNum={preLevelProgress} upLevel={upLevel} />
                ))}
            <h3 className="final-quiz-title">Your Quiz Results!</h3>
            <br />
            <div>
                {questions.map((question, index) => (
                    <QuizFinalPageQuestionCards
                        question={question}
                        userAnswer={answers[userAnswers[index]].answer}
                        checkAnswer={answers[userAnswers[index]].answer === correctAnswersMap[question.id]}
                        correctAnswer={correctAnswersMap[question.id]}
                    />
                ))}
            </div>

            <Link to={'/'}>
                <button className="logout-btn" onClick={removeQuizInfo}>
                    Finish Quiz Review
                </button>
            </Link>
            <br />
        </div>
    );
}
