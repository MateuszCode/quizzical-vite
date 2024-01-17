import React from 'react'
import Quizz from './Quizz.jsx'

export default function App() {

    const [quizzDisplay, setQuizzDisplay] = React.useState(false)

    return (
        <div className="main-container">
                {quizzDisplay ?
                <Quizz />
                :
                <button onClick={() => setQuizzDisplay(true)} className="start-btn btn">Start the quizz</button>
                 }
        </div>
    )
}