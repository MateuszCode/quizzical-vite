import React, {useRef} from 'react'
import Question from './Question'

export default function Quizz() {

    const [questionsData, setQuestions] = React.useState([])
    const [chosenAnswers, setChosenAnswers] = React.useState([])

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
      


    }, [])

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

    const [isClicked, setIsClicked] = React.useState(false)


    const questionsElement = questionsData.map(questionInfo => {
        const {question, correctAnswer, incorrectAnswers, id, allAnswers} = questionInfo


        const answersElement = allAnswers.shuffledAnswers.map((answer,index) => {
            let isCorrect = ""
            if (answer === correctAnswer) {
                isCorrect = "true"
            } else {
                isCorrect = "false"
            }

            function flipIsClicked() {
                setIsClicked(oldValue => !oldValue)
            }

            isCorrect 
                return <p 
                        id={id}
                        value={answer}
                        index={index}
                        onClick={(ev) => {
                            ev.stopPropagation();
                            handleClick(ev);    // INVOCATION
                           flipIsClicked();
                          }}
                        iscorrect={isCorrect}
                        className={isClicked ? "chosen-answer-element" : "answer-element"}
                        >{answer}</p>
        })

        return  ( 
            <div className="question-container">
                <div className="question-text">{question.text}</div>
                <div className="question-answers">{answersElement}</div>
            </div>
        )
    })

  
    function handleClick(event) {
        const index = event.target.getAttribute('index');
        const isCorrect = event.target.getAttribute('iscorrect');
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
        
        console.log(chosenAnswers)

    }

    function handleBtnClick() {
        console.log(questionsData[0].correctAnswer)
            for (let i = 0; i < questionsData.length; i++) {
               if (questionsData[i].correctAnswer === chosenAnswers[i].chosenAnswer) {
                console.log("correctAnswer!")
               } else if (questionsData[i].correctAnswer != chosenAnswers[i].chosenAnswer) {
                console.log("wrongAnswer!")
               }

            }
    }

    return (
        <div>
            {questionsElement}
            <div className="btn-div">
            <button className="btn" onClick={handleBtnClick}>Check answers!</button>
            </div>
        </div>

    )
}