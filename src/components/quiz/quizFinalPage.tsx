import React from "react";
import { Link } from "react-router-dom";

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
            localStorage.removeItem('users_answers')
    }

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
  console.log("Answers: ", answers);
  

  // Create an object to map question IDs to their respective correct answers
  const correctAnswersMap: Record<number, string> = {};
  answersArray.forEach(answer => {
    if (answer.is_correct) {
      correctAnswersMap[answer.question_id] = answer.answer;
    }
  });
  console.log("Correct Answers: ", correctAnswersMap);
  console.log("User Answers: ", userAnswers);
  console.log("Questions: ", questions);
  
  

  return (
    <div>
      <h3>Your Quiz Results!</h3>
      <br />
      <ul>
        {questions.map((question, index) => (
          <li key={question.id}>
            <p>{question.question}</p>
            <p><strong>Your Selected Answer:</strong> {answers[parseInt(userAnswers[index])].answer}</p>
            {answers[parseInt(userAnswers[index])].answer === correctAnswersMap[question.id] ? <p>This is the correct answer</p> : <p><strong>Correct Answer:</strong> {correctAnswersMap[question.id]}</p>}
            <p>Explanation- </p>
            <br />
            <br />
          </li>
        ))}
      </ul>
      <Link to={'/'}>
        <button onClick={removeQuizInfo}>Finish Quiz Review</button>
      </Link>
    </div>
  );
}
