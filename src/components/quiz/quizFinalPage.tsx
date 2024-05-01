import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HomeProgress from "../home/homeProgress";

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
    localStorage.removeItem('points')
    localStorage.removeItem('category')
  }

  let [progressShowing, setProgressShowing] = useState<boolean>(false)
  let [pointsShowing, setPointsShowing] = useState<boolean>(false)
  let [progressPointsShowing, setProgressPointsShowing] = useState<boolean>(true)
  let [progressDone, setProgressDone] = useState<boolean>(false)

  const points = localStorage.getItem('points')

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

    changePointsProgress()

    setTimeout(() => {
      setProgressDone(true);
    },9000);

  }, [])

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
    <div className={`final-page ${progressDone ? 'fade-in-final' : ''}`} >
      {progressPointsShowing &&
        <div className="final-page-progress-points-container">
          {!progressShowing ?
            <h2 className={`final-page-points ${pointsShowing ? 'fade-out' : ''}`}>
              You scored {points} points
            </h2>
            :
            <div className={progressDone ? 'fade-out' : ''}>
              <HomeProgress prop={true} />
            </div>
          }
        </div>
      }
      <h3 className="final-quiz-title">Your Quiz Results!</h3>
      <br />
      <div>
        {questions.map((question, index) => (
          <div className="final-question-cards" key={question.id}>
            <p>{question.question}</p>
            <p><strong>Your Selected Answer:</strong> {answers[parseInt(userAnswers[index])].answer}</p>
            {answers[parseInt(userAnswers[index])].answer === correctAnswersMap[question.id] ? <p>This is the correct answer</p> : <p><strong>Correct Answer:</strong> {correctAnswersMap[question.id]}</p>}
            <p>Explanation- </p>
          </div>
        ))}
      </div>
      <Link to={'/'}>
        <button className="logout-btn" onClick={removeQuizInfo}>Finish Quiz Review</button>
      </Link>
      <br />
    </div>
  );
}
