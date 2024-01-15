import React from 'react'
import Quizz from './Quizz.jsx'

export default function App() {

    const [quizzDisplay, setQuizzDisplay] = React.useState({display: "none"})
    const [buttonDisplay, setButtonDisplay] = React.useState({display: "block"})

    function handleClick() {
        setButtonDisplay({display: "none"})
        setQuizzDisplay({display: "block"})
    }

    return (
        <div className="main-container">
            <div style={buttonDisplay}>
                <button onClick={handleClick} className="start-btn btn">Start the quizz</button>
            </div>
            <div style={quizzDisplay}>
                <Quizz /> 
            </div>
        </div>
    )
}