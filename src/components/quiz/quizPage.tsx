import React, { useState } from 'react';
import QuizFetch from './quizFetch'

export default function Quiz() {
    const [isDisabled, setIsDisabled] = useState(false)
    const [type, setType] = useState('')

    const quiz_type: string[] = ['basic', 'Front-end', 'Back-end', 'Random'];

    function updateType(index: number) {
        setType(quiz_type[index])
        setIsDisabled(true)
    }

  return (
    <div>
        <h3>Quiz Time!</h3>
        <h5>Which type of quiz would you like to complete today?</h5>
        {quiz_type.map((type, index) => (
            <button disabled={isDisabled} key={index} onClick={() => updateType(index)}>{type}</button>
        ))}
        {type && <QuizFetch type={type}/>}
    </div>
  )
}
