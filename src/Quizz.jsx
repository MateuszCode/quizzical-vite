import React, {useRef} from 'react'

export default function Quizz() {

    const [questionsData, setQuestions] = React.useState([])
    const [chosenAnswers, setChosenAnswers] = React.useState([])
    const [finalAnswersStyling, setFinalAnswers] = React.useState(false)
    const [restartGame, setRestartGame] = React.useState(0)
    const [checkAnswersBtnDisplay, setCheckAnswersBtnDisplay] = React.useState({display: "block"})
    const [restartBtnDisplay, setRestartBtnDisplay] = React.useState({display: "none"})

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
      }

    React.useEffect(() => {
        fetch('https://the-trivia-api.com/v2/questions/')
        .then(response => response.json())
        .then(data => {
            const fiveQuestions = data.slice(0,5)
            const newQuestions = fiveQuestions.map(question => {
                const shuffledAnswers = [...question.incorrectAnswers, question.correctAnswer]
                shuffleArray(shuffledAnswers)
                return {
                    ...question,
                    allAnswers: {shuffledAnswers}

                }
            })
            setQuestions(newQuestions)
        })
    }, [restartGame])

    React.useEffect(() => {
        setChosenAnswers(() => {
            return questionsData.map(question => {
                return {
                    id: question.id,
                    chosenAnswer: ""
                }
            })
        })
    }, [questionsData])

    const questionElement = questionsData.map(questionInfo => {
        const {question, correctAnswer, incorrectAnswers, id, allAnswers} = questionInfo 
        
        const answersElement = allAnswers.shuffledAnswers.map((answer,index) => {
                let className = "answer-element"

                for (let i = 0; i < chosenAnswers.length; i++) {
                    if (answer === correctAnswer && finalAnswersStyling) {
                        className = "answer-element correct-answer chosen-answer-element"
                    } else if (chosenAnswers[i].chosenAnswer === answer && answer !== correctAnswer && finalAnswersStyling ) {
                        className = "answer-element wrong-answer"
                    }
                    else if (chosenAnswers[i].chosenAnswer === answer) {
                        className = "answer-element chosen-answer-element"
                    } 
                }

                return <p
                        id={id}
                        value={answer}
                        onClick={finalAnswersStyling === false ? handleClick : ""}
                        className={className}
                        >
                        {answer}
                        </p>
                })

        return (
                    <div className="question-container">
                            <div className="question-text">{question.text}</div>
                            <div className="question-answers">{answersElement}</div>
                    </div>  
                )
    })
  
    function handleClick(event) {
        const id = event.target.id
        const value = event.target.getAttribute('value')

        setChosenAnswers(oldArray => {
            return oldArray.map(question => {
                if (question.id === id) {
                    return {
                        id: id,
                        chosenAnswer: value
                    }
                } else {
                    return question
                }
            })
        })
    }

    function handleCheckAnswersBtnClick() {
        setFinalAnswers(oldValue => !oldValue)
        setCheckAnswersBtnDisplay({display: "none"})
        setRestartBtnDisplay({display: "block"})
    }

    function handleRestartBtnClick() {
        setRestartGame(oldValue => oldValue + 1)
        setCheckAnswersBtnDisplay({display: "block"})
        setRestartBtnDisplay({display: "none"})
        setFinalAnswers(false)
    }

    return (
        <div>
            {questionElement}
            <div className="btn-div">
            <button className="btn game-btn" onClick={handleCheckAnswersBtnClick} style={checkAnswersBtnDisplay}>Check answers!</button>
            <button className="btn game-btn" onClick={handleRestartBtnClick} style={restartBtnDisplay}>New quizz!</button>
            </div>
        </div>
    )
}