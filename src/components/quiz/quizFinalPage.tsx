import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HomeProgress from '../home/homeProgress';
import updateProgress from './updateProgressFetch';

interface Question {
    id: number;
    question: string;
}

interface Answer {
    id: number;
    answer: string;
    question_id: number;
    is_correct: boolean;
}

export default function QuizFinalPage() {
    const removeQuizInfo = () => {
        localStorage.removeItem('quiz_data_questions');
        localStorage.removeItem('quiz_data_answers');
        localStorage.removeItem('quiz_index');
        localStorage.removeItem('users_answers');
        localStorage.removeItem('points');
        localStorage.removeItem('category');
    };

    let [progressShowing, setProgressShowing] = useState<boolean>(false);
    let [pointsShowing, setPointsShowing] = useState<boolean>(false);
    let [progressPointsShowing, setProgressPointsShowing] = useState<boolean>(true);
    let [progressDone, setProgressDone] = useState<boolean>(false);

    const points: any = localStorage.getItem('points');
    const userId = localStorage.getItem('user_id');
    let progress: any = localStorage.getItem('progress');
    progress = parseInt(progress);

    useEffect(() => {
        const changePointsProgress = () => {
            setTimeout(() => {
                setPointsShowing(true);
                setTimeout(() => {
                    setProgressShowing(true);
                    setTimeout(() => {
                        setProgressPointsShowing(false);
                    }, 10000);
                }, 1200);
            }, 2000);
        };

        changePointsProgress();

        setTimeout(() => {
            setProgressDone(true);
        }, 11000);

        const fetchProgressData = async () => {
            const { progressNeeded, previousProgressNeeded, level }: any = await updateProgress(userId, points);
            localStorage.setItem('progress_needed', progressNeeded.progressNeeded);
            localStorage.setItem('previous_progress_needed', previousProgressNeeded.previousProgressNeeded);
            localStorage.setItem('progress', progress + parseInt(points));
            localStorage.setItem('level', level.level);
        };

        fetchProgressData(); // localStorage.setItem('progress', newProgress ? newProgress : progress);
    }, []);

    // Retrieve quiz questions from localStorage
    const questionsString: string | null = localStorage.getItem('quiz_data_questions');
    const questions: Question[] = questionsString ? JSON.parse(questionsString) : [];

    // Retrieve user's selected answers from localStorage
    const userAnswersString: string | null = localStorage.getItem('users_answers');
    const userAnswers: string[] = userAnswersString ? JSON.parse(userAnswersString) : [];

    // Retrieve all answers from localStorage and transform them into an object
    const answersString: string | null = localStorage.getItem('quiz_data_answers');
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
        <div className={`final-page ${progressDone ? 'fade-in-final' : ''}`}>
            {progressPointsShowing && (
                <div className={`final-page-progress-points-container ${progressDone ? 'fade-out' : ''}`}>
                    {!progressShowing ? (
                        <h2 className={`final-page-points ${pointsShowing ? 'fade-out' : ''}`}>You scored {points} points</h2>
                    ) : (
                        <div className={progressDone ? 'fade-out' : ''}>
                            <HomeProgress prop={true} />
                        </div>
                    )}
                </div>
            )}
            <h3 className="final-quiz-title">Your Quiz Results!</h3>
            <br />
            <div>
                {questions.map((question, index) => (
                    <div className="final-question-cards" key={question.id}>
                        <p>{question.question}</p>
                        <p>
                            <strong>Your Selected Answer:</strong> {answers[parseInt(userAnswers[index])].answer}
                        </p>
                        {answers[parseInt(userAnswers[index])].answer === correctAnswersMap[question.id] ? (
                            <p>This is the correct answer</p>
                        ) : (
                            <p>
                                <strong>Correct Answer:</strong> {correctAnswersMap[question.id]}
                            </p>
                        )}
                        <p>Explanation- </p>
                    </div>
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
