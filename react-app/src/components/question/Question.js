import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { postAnswer } from "../../store/answers";
import './Question.css'

export const Question = ({ user }) => {
    const dispatch = useDispatch()
    const { id : questionId } = useParams()
    const questions = useSelector(({questions}) => questions)

    const [answer, setAnswer] = useState('')
    const [showAnswerBox, setShowAnswerBox] = useState(false)
    const [showErrors, setShowErrors] = useState(false)
    const [error, setError] = useState('')
    const question = questions[questionId]

    const handleAnswerSubmit = async (e) => {
        e.preventDefault()
        const response = await dispatch(postAnswer(answer, questionId))
        if (response.errors) {
            setError(response.errors[0].answer)
            setShowErrors(true)
        } else {
            closeAnswerBox()
        }
    }
    
    useEffect(() => {
        if (answer.length >= 15) {
            setShowErrors(false)
            setError('')
        }
    }, [answer])

    const openAnswerBox = () => {
        setShowAnswerBox(true)
        const answerElement = document.querySelector('#post-answer')
        answerElement.style.opacity = '.5'
        answerElement.style.pointerEvents = 'none'
    }

    const closeAnswerBox = () => {
        setShowAnswerBox(false)
        const answerElement = document.querySelector('#post-answer')
        answerElement.style.opacity = '1'
        answerElement.style.removeProperty('pointer-events')
        setAnswer('')
        setError('')
    }

    return (
        <div id='question-page'>
            <div id='question-left-container'>
                <div id="question-header-container">
                    <div id="question-header">{question.question}</div>
                    <div id="question-footer-icons">
                        <div id="post-answer" onClick={openAnswerBox}>
                            <i className="fa-solid fa-pen-to-square square"></i>
                            <div className="answers-text" id='post-answer-text'>Answer</div>
                        </div>
                    </div>
                {showAnswerBox && (
                    <div id="post-answer-box-container">
                        <div id="post-answer-box-header">
                            <img ></img>
                            <div>
                                <div>{user.full_name}</div>
                                <div>Edit credential</div>
                            </div>
                        </div>
                        {showErrors && (
                            <div id="error">{error}</div>
                        )}
                        <form id='answer-form'>
                            <textarea
                                type='text'
                                id="post-answer-field"
                                placeholder="Write your answer"
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                            />
                        </form>
                        <div id="post-answer-box-footer">
                            <button id='post-answer-btn' onClick={handleAnswerSubmit}>Post</button>
                            <button id='post-answer-cancel-btn' onClick={closeAnswerBox}>Cancel</button>
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
