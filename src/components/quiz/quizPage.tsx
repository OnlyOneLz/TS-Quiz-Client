import React, { useEffect, useState } from 'react';
import getQuiz from './quizFetch';
import checkToken from '../../utilities/auth';
import updateScoreboard from './quizUpdateScoreboard';
import { UserID, QuizData, Answer, Question, UnparcedData, anyProgress, UserAnswers } from '../../types';

const QuizPage2 = () => {
    const [quizData, setQuizData] = useState<QuizData>({ questions: [], answers: [] });
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [points, setPoints] = useState<number>(0);
    const [currentQuestion, setCurrentQuestion] = useState<string>('');
    const [currentAnswers, setCurrentAnswers] = useState<Answer[]>([]);
    const [correctAnswerId, setCorrectAnswerId] = useState<number>();
    const [falseAnswerId, setFalseAnswerId] = useState<number>();
    const [clickedAnswer, setClickedAnswer] = useState<number>();
    const userId: UserID = localStorage.getItem('user_id') as UserID;

    useEffect(() => {
        const storedQuizDataQuestionsString: UnparcedData = localStorage.getItem('quiz_data_questions');
        const storedQuizDataAnswersString: UnparcedData = localStorage.getItem('quiz_data_answers');

        const storedQuizDataQuestions: Question[] = JSON.parse(storedQuizDataQuestionsString || '');
        const storedQuizDataAnswers: Answer[] = JSON.parse(storedQuizDataAnswersString || '');

        const storedQuizIndex: anyProgress = parseInt(localStorage.getItem('quiz_index') || '0');

        checkToken();

        if (!storedQuizDataQuestions) {
            const getQuizData = async () => {
                const data = await getQuiz();
                if (data !== null) {
                    setQuizData(data);
                    if (data.questions.length > 0) {
                        setCurrentQuestion(data.questions[0].question);
                        setCurrentAnswers(data.answers.filter(aws => aws.question_id === data.questions[0].id));
                        setCurrentAnswers(currentAnswers => currentAnswers.sort(() => Math.random() - 0.5));
                        localStorage.setItem('quiz_data_questions', JSON.stringify(data.questions));
                        localStorage.setItem('quiz_data_answers', JSON.stringify(data.answers));
                        localStorage.setItem('quiz_index', String(currentIndex));
                    }
                }
            };
            getQuizData();
        } else {
            setQuizData({ questions: storedQuizDataQuestions, answers: storedQuizDataAnswers });
            if (storedQuizDataQuestions.length > 0) {
                setCurrentIndex(storedQuizIndex);
                setCurrentQuestion(storedQuizDataQuestions[currentIndex].question);
                setCurrentAnswers(storedQuizDataAnswers.filter((aws: Answer) => aws.question_id === storedQuizDataQuestions[currentIndex].id));
            }
        }
    }, [currentIndex]);

    const handleAnswerClick = (awsId: number) => {
        checkAnswer(awsId);

        const existingUserAnswersString: UnparcedData = localStorage.getItem('users_answers');
        const existingUserAnswers: UserAnswers = existingUserAnswersString ? JSON.parse(existingUserAnswersString) : [];
        const updatedUserAnswers: UserAnswers = [...existingUserAnswers, awsId];
        localStorage.setItem('users_answers', JSON.stringify(updatedUserAnswers));

        setTimeout(() => {
            setCorrectAnswerId(undefined);
            setFalseAnswerId(undefined);
            changeQuestion();
        }, 500);
        setClickedAnswer(0);
    };

    const handleAnswerClick2 = (awsId: number) => {
        setClickedAnswer(awsId);
    };

    const changeQuestion = () => {
        if (currentIndex < quizData.questions.length - 1) {
            localStorage.setItem('quiz_index', String(currentIndex + 1));
            setCurrentIndex(currentIndex + 1);
            setCurrentQuestion(quizData.questions[currentIndex + 1].question);
            setTimeout(() => {
                setCurrentAnswers(quizData.answers.filter((aws: any) => aws.question_id === quizData.questions[currentIndex + 1].id));
                setCurrentAnswers(currentAnswers => currentAnswers.sort(() => Math.random() - 0.5));
            }, 100);
        } else {
            localStorage.setItem('points', points.toString());
            updateScoreboard(userId, points);
            window.location.href = '/quiz/final';
        }
    };

    const checkAnswer = (awsId: number) => {
        const correctAnswer = currentAnswers.find((aws: Answer) => aws.is_correct === true);
        if (correctAnswer && correctAnswer.id === awsId) {
            setCorrectAnswerId(correctAnswer.id);
            setPoints(points + correctAnswer.points);
        } else {
            setFalseAnswerId(awsId);
        }
    };

    return (
        <div className="quiz-page">
            <div className="quiz-title-container">
                <h1 className="quiz-title">Quizzer</h1>
                <p className="quiz-question-num">Q.{currentIndex + 1}</p>
            </div>
            <div className="quiz-question">{currentQuestion}</div>
            <div className="quiz-answers">
                <div className="quiz-answer">
                    {currentAnswers.map((aws: Answer) => (
                        <button
                            className={`quiz-answer-selection ${aws.id === correctAnswerId ? 'correct' : ''} ${
                                aws.id === falseAnswerId ? 'false' : ''
                            }`}
                            onClick={() => handleAnswerClick2(aws.id)}
                        >
                            <div className={`quiz-checkbox ${aws.id === clickedAnswer ? 'checkbox-ticked' : ''}`}></div>
                            <p className="answer-text">{aws.answer}</p>
                        </button>
                    ))}
                </div>
            </div>
            <button
                className={`confirm-btn ${clickedAnswer ? '' : 'less-opacity'}`}
                disabled={clickedAnswer ? false : true}
                onClick={() => handleAnswerClick(clickedAnswer || 0)}
            >
                Confirm Answer
            </button>
        </div>
    );
};

export default QuizPage2;
