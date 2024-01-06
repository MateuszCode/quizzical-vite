import React from 'react'

export default function Question(props) {

    const {text, incorrectAnswers, correctAnswer,id} = props

    const [formData, setFormData] = React.useState(
        {
            [id]: "",
        }
    )

    const answersArray = [...incorrectAnswers, correctAnswer]

    const [shuffledAnswersArray, setShuffledArray] = React.useState(answersArray.sort((a, b) => 0.5 - Math.random()))

    const answersElement = shuffledAnswersArray.map((answer) => {
        return (  
        <div>
            <label>
                <input 
                    type="radio"
                    name={id}
                    value={answer}
                    checked={formData[id] === answer}
                    onChange={handleChange}
                />
                {answer}
            </label>
        </div>
        )
    })

    function handleChange(event) {
        const {name, value, type, checked} = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }

    return (
        <div>
            <h3>{text}</h3>
            <div>{answersElement}</div>
        </div>   
    )
}