import React from "react";

interface QuestionCardProps {
    question: {
        question: string,
        explanation: string,
        id: number
    },
    userAnswer: string,
    checkAnswer: boolean,
    correctAnswer: string
}

export const QuizFinalPageQuestionCards: React.FC<QuestionCardProps>= ({ question, userAnswer, checkAnswer, correctAnswer}) => {
   
    return (
        <div>
            <div className="final-question-cards" key={question.id}>
                <p>{question.question}</p>
                <p>
                    <strong>Your Selected Answer:</strong> {userAnswer}
                </p>
                {checkAnswer ? (
                    <p>This is the correct answer</p>
                ) : (
                    <p>
                        <strong>Correct Answer:</strong> {correctAnswer}
                    </p>
                )}
                <p>Explanation- {question.explanation}</p>
            </div>
    </div>
    )
}

export default QuizFinalPageQuestionCards