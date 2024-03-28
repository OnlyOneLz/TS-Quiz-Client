import React from 'react'
import { useState, useEffect } from "react"

export default function QuizFetch({type}: {type: string}) {
    const [questions, setQuestions] = useState<{ success: Boolean; data: any[] }>({ success: false, data: []})

    const fetchQuestions = async () => {
        try {
            const response = await fetch(`http://localhost:4001/question/display/random/${type}`)
            const data = await response.json()

            if (response.ok) {
                setQuestions(data)
                console.log(data);
                console.log(questions);
                
                
            } else {
                console.log("Failed to fetch questions");
            }
        } catch (error) {
            console.error("Error fetching questions", error);
        }
    }

    useEffect(() => {
        fetchQuestions()
        // eslint-disable-next-line
    }, [type])

    useEffect(() => {
        console.log("Updated questions:", questions); // Log updated questions
    }, [questions])

  return (
    <div>
        <p>{type}</p>
        {questions.data.map((question, index) => (
    <div key={(question as any).id || index}>{(question as any).question}</div>
))}
    </div>
  )
}
