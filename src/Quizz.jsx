import React from 'react'
import Question from './Question'

export default function Quizz() {

    const [questionsData, setQuestions] = React.useState([])

    React.useEffect(() => {
        fetch('https://the-trivia-api.com/v2/questions/')
        .then(response => response.json())
        .then(data => {
            const newQuestions = data.slice(0,5)
            setQuestions(newQuestions)
        })
    }, [])


    const questionsElement = questionsData.map(question => {
        return  <Question 
            text = {question.question.text}
            correctAnswer = {question.correctAnswer}
            incorrectAnswers = {question.incorrectAnswers}
            key = {question.id}
            id = {question.id}
        /> 
    })

    return (
        <div>
            {questionsElement}
        </div>

    )
}