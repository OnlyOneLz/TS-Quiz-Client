import React, { useState } from 'react';

interface QuestionCardProps {
    question: {
        question: string;
        explanation: string;
        id: number;
    };
    userAnswer: string;
    checkAnswer: boolean;
    correctAnswer: string;
}

export const QuizFinalPageQuestionCards: React.FC<QuestionCardProps> = ({ question, userAnswer, checkAnswer, correctAnswer }) => {
    const [modalOpen, setModalOpen] = useState<any>(false);
    return (
        <div>
            <div className="final-question-cards" key={question.id}>
                <div className={`tick-cross-box ${checkAnswer ? 'correct-answer-background' : 'wrong-answer-background'}`}></div>
                <p className="final-question">{question.question}</p>
                <button className="open-question-modal" onClick={() => setModalOpen(!modalOpen)}></button>
                <div className="question-modal" style={modalOpen ? { display: 'grid' } : { display: 'none' }}>
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
        </div>
    );
};

export default QuizFinalPageQuestionCards;
