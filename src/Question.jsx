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
        props.checkChosenAnswers(value,name)
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }

    function checkTheAnswer() {
        if(formData[id] === correctAnswer) {
            console.log("This is the correct answer!")
        } else {
            console.log("This is wrong, try again!")
        }

    }

    React.useEffect(() => {
        checkTheAnswer(); 
    }, [props.refresh]);


    return (
        <div>
            <h3>{text}</h3>
            <div>{answersElement}</div>
        </div>   
    )
}



// const questionsElement = questionsData.map(questionInfo => {
//     const {question, correctAnswer, incorrectAnswers, id, allAnswers} = questionInfo

//     const answersElement = allAnswers.shuffledAnswers.map((answer,index) => {
//         let isCorrect = ""
//         if (answer === correctAnswer) {
//             isCorrect = "true"
//         } else {
//             isCorrect = "false"
//         }

//         let isClicked = false

//         function flipIsClicked() {
//             isClicked = !isClicked
//         }

//         isCorrect 
//             return <p 
//                     id={id}
//                     value={answer}
//                     index={index}
//                     onClick={(ev) => {
//                         ev.stopPropagation();
//                         handleClick(ev);    // INVOCATION
//                        flipIsClicked();
//                       }}
//                     iscorrect={isCorrect}
//                     className={isClicked ? "chosen-answer-element" : "answer-element"}
//                     >{answer}</p>
//     })

//     return  ( 
//         <div className="question-container">
//             <div className="question-text">{question.text}</div>
//             <div className="question-answers">{answersElement}</div>
//         </div>
//     )
// })