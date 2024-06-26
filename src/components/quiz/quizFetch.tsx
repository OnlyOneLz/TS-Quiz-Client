import { QuizData, QuestionIds } from '../../types';

const getQuiz = async (): Promise<QuizData | null> => {
    const quizType = localStorage.getItem('category');
    let questionIds: QuestionIds = [];

    try {
        const response = await fetch(`http://localhost:4001/question/${quizType === 'Random' ? 'Random' : `display/${quizType}`}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log(data);

        data.data.map((question: { id: string }) => questionIds.push(question.id));

        const response2 = await fetch(`http://localhost:4001/answer/display`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                questions: questionIds
            })
        });
        const data2 = await response2.json();
        return {
            questions: data.data || [],
            answers: data2.data || []
        };
    } catch (error) {
        console.log(error, 'Failed to get QuizData');
        return null;
    }
};

export default getQuiz;
