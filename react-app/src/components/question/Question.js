import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import './Question.css'

export const Question = ({ user }) => {
    const { id : questionId } = useParams()
    const [showAnswerBox, setShowAnswerBox] = useState(false)
    const question = useSelector(({questions}) => questions[questionId])

    const openAnswerBox = () => {
        setShowAnswerBox(true)
        const answerElement = document.querySelector('#post-answer')
        answerElement.style.opacity = '.5'
        answerElement.style.pointerEvents = 'none'
    }

    return (
        <div id='question-page'>
            <div id='question-left-container'>
                <div id="question-header-container">
                    <div id="question-header">{question.question}</div>
                    <div id="question-footer-icons">
                        <div id="post-answer" onClick={openAnswerBox}>
                            <i class="fa-solid fa-pen-to-square square"></i>
                            <div className="answers-text" id='post-answer-text'>Answer</div>
                        </div>
                    </div>
                {showAnswerBox && (
                    <div id="post-answer-box-container">
                        <div id="post-answer-box-header">
                            <img src='defaultUser.jpg'></img>
                            <div>
                                <div>{user.full_name}</div>
                                <div>Edit credential</div>
                            </div>
                        </div>

                    </div>
                )}
                </div>
                <div id='num-answers'>
                    <div className="circle">
                        <i className="fa-solid fa-list-ul" id="answer-icon"></i>
                    </div>
                    <span className="answers-text">{question.answers.length}</span>
                    <span className="answers-text">Answers</span>
                </div>
                <ul>
                    {question.answers.map(answer => (
                        <div key={Math.random()} className="answer-container">
                            <div className="answer-user">{answer.user.full_name}</div>
                            <li className="list-answer">{answer.answer}</li>
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    )
}
