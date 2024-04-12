import React, { useEffect, useState } from "react";
import getQuiz from "./quizFetch2";
import checkToken from "../../utilities/auth";
import updateScoreboard from "./quizUpdateScoreboard";

const QuizPage2 = () => {
    const [quizData, setQuizData] = useState<any>();
    const [currentIndex, setCurrentIndex] = useState<any>(0);
    const [points, setPoints] = useState<number>(0);
    const [currentQuestion, setCurrentQuestion] = useState<string>('');
    const [currentAnswers, setCurrentAnswers] = useState<any[]>([]);
    const [correctAnswerId, setCorrectAnswerId] = useState<number>();
    const [falseAnswerId, setFalseAnswerId] = useState<number>();
    const userId: any = localStorage.getItem('user_id');


    useEffect(() => {
        const storedQuizDataQuestionsString: any = localStorage.getItem('quiz_data_questions');
        const storedQuizDataAnswersString: any = localStorage.getItem('quiz_data_answers');
        console.log(storedQuizDataAnswersString);
        
        const storedQuizDataQuestions: any = JSON.parse(storedQuizDataQuestionsString);
        const storedQuizDataAnswers: any = JSON.parse(storedQuizDataAnswersString);
        console.log(storedQuizDataAnswers);

        const storedQuizIndex: any = localStorage.getItem('quiz_index');

        checkToken()

        if (!storedQuizDataQuestions) {
            const getQuizData = async () => {
                const data = await getQuiz();
                if (data !== null) {
                    setQuizData(data);
                    if (data.questions.length > 0) {
                        setCurrentQuestion(data.questions[0].question);
                        setCurrentAnswers(data.answers.filter((aws) => aws.question_id === data.questions[0].id));
                        setCurrentAnswers(currentAnswers => currentAnswers.sort(() => Math.random() - 0.5));
                        localStorage.setItem('quiz_data_questions', JSON.stringify(data.questions));
                        localStorage.setItem('quiz_data_answers', JSON.stringify(data.answers));
                        localStorage.setItem('quiz_index', currentIndex);
                    }
                }
            };
            getQuizData();
        } else {
            setQuizData({ questions: storedQuizDataQuestions, answers: storedQuizDataAnswers });
            if (storedQuizDataQuestions.length > 0) {
                setCurrentIndex(parseInt(storedQuizIndex, 10));
                setCurrentQuestion(storedQuizDataQuestions[currentIndex].question);
                setCurrentAnswers(storedQuizDataAnswers.filter((aws: any) => aws.question_id === storedQuizDataQuestions[currentIndex].id));
            };
        }
    }, [currentIndex])

    const handleAnswerClick = (awsId: number) => {
        checkAnswer(awsId);
        setTimeout(() => {
            setCorrectAnswerId(undefined)
            setFalseAnswerId(undefined)
            changeQuestion();
        }, 500);
    };

    const changeQuestion = () => {
        if (currentIndex < quizData.questions.length - 1) {
            localStorage.setItem('quiz_index', currentIndex + 1);
            setCurrentIndex(currentIndex + 1);
            setCurrentQuestion(quizData.questions[currentIndex + 1].question);
            setTimeout(() => {
            setCurrentAnswers(quizData.answers.filter((aws: any) => aws.question_id === quizData.questions[currentIndex + 1].id));
            setCurrentAnswers(currentAnswers => currentAnswers.sort(() => Math.random() - 0.5));
        }, 100)
        } else {
            updateScoreboard(userId, points)
            localStorage.removeItem('quiz_data_questions');
            localStorage.removeItem('quiz_data_answers');
            localStorage.removeItem('quiz_index');
            setTimeout(() => {
                window.location.href = "/";
            }, 1500)
        }
    };

    const checkAnswer = (awsId: number) => {
        const correctAnswer = currentAnswers.find((aws: any) => aws.is_correct === true);
        if (correctAnswer && correctAnswer.id === awsId) {
            setCorrectAnswerId(correctAnswer.id)
            setPoints(points + parseInt(correctAnswer.points));
        } else {
            setFalseAnswerId(awsId)
        }
    };

    return (
        <div className="quiz-page">
            <div className="quiz-question">{currentQuestion}</div>
            <div className="quiz-answers">
                <div className="quiz-answer">
                    {currentAnswers.map((aws: any, index: number) => (
                        <button className={`quiz-answer-button ${aws.id === correctAnswerId ? 'correct' : ''} ${aws.id === falseAnswerId ? 'false' : ''}`} disabled={correctAnswerId !== undefined || falseAnswerId !== undefined} onClick={() => handleAnswerClick(aws.id)} key={index}>{aws.answer}</button>
                    ))}
                </div>
            </div>
            <div>Points: {points}</div>
        </div>
    );
};

export default QuizPage2;
