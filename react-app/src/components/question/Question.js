import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { postAnswer } from "../../store/answers";
import { AnswerBox } from "./answer/AnswerBox";
import { patchAnswer } from "../../store/answers";
import './Question.css'

export const Question = ({ user }) => {
    const dispatch = useDispatch()
    const { id : questionId } = useParams()
    const questions = useSelector(({questions}) => questions)
    const question = questions[questionId]

    // const [answer, setAnswer] = useState('')
    const [showAnswerBox, setShowAnswerBox] = useState(false)
    const [showErrors, setShowErrors] = useState(false)
    const [error, setError] = useState('')
    const [showDropdown, setShowDropdown] = useState(null)
    const [showEditAnswerBox, setShowEditAnswerBox] = useState(null)

    const handleAnswerSubmit = async (sentAnswer) => {
        // e.preventDefault()
        // setAnswer(sentAnswer)
        const response = await dispatch(postAnswer(sentAnswer, questionId))
        if (response.errors) {
            setError(response.errors[0].answer)
            setShowErrors(true)
        } else {
            closeAnswerBox()
        }
    }

    const handleEditAnswerSubmit = async (answer, answerId) => {
        console.log('in handle edit answer submit')
        const response = await dispatch(patchAnswer(answer, answerId))
        if (response.errors) {
            setError(response.errors[0].answer)
            setShowErrors(true)
        } else {
            closeEditAnswerBox()
        }
    }

    // useEffect(() => {
    //     if (answer.length >= 15) {
    //         setShowErrors(false)
    //         setError('')
    //     }
    // }, [answer])

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
        // setAnswer('')
        setError('')
    }

    const closeEditAnswerBox = () => {
        setShowEditAnswerBox(null)
    }

    useEffect(() => {
        const func = (e) => {
            setShowDropdown(null)
            document.removeEventListener('click', func)
        }
        if (showDropdown || showDropdown === 0) {
            console.log('adding eventlistener')
            document.addEventListener('click', func)
        }
    }, [showDropdown])

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
                    <AnswerBox
                        user={user}
                        showErrors={showErrors}
                        error={error}
                        setShowErrors={setShowErrors}
                        setError={setError}
                        // answer={answer}
                        // setAnswer={setAnswer}
                        handleAnswerSubmit={handleAnswerSubmit}
                        closeAnswerBox={closeAnswerBox}
                    />
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
                    {question.answers.map((answerObj, idx) => (
                        <div key={Math.random()} className="list-answer-container">
                            <div className="list-answer-header">
                                <div className="list-answer-user">{answerObj.user.full_name}</div>
                                {answerObj.user.id === user.id && (
                                    <i class="fa-solid fa-ellipsis" onClick={() => {
                                        console.log(idx)
                                        setShowDropdown(idx)
                                    }}></i>
                                )}
                                {(showDropdown === idx) && (
                                    <ul id='answer-dropdown-menu'>
                                        <li className="dropdown-list-item" onClick={() => {
                                            setShowEditAnswerBox(idx)
                                            // setAnswer(answerObj.answer)
                                        }}>
                                            <i class="fa-light fa-pen icon"></i>Edit answer
                                        </li>
                                        <li className="dropdown-list-item red"><i class="fa-regular fa-trash-can icon"></i>Delete answer</li>
                                    </ul>
                                )}
                            </div>
                            {showEditAnswerBox !== idx && (
                                <li className="list-answer">{answerObj.answer}</li>
                            )}
                            {showEditAnswerBox === idx && (
                                <AnswerBox
                                    user={user}
                                    showErrors={showErrors}
                                    error={error}
                                    setShowErrors={setShowErrors}
                                    setError={setError}
                                    // answer={answer}
                                    answerObj={answerObj}
                                    // setAnswer={setAnswer}
                                    handleEditAnswerSubmit={handleEditAnswerSubmit}
                                    closeEditAnswerBox={closeEditAnswerBox}
                                    option='edit'
                                />
                            )}
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    )
}
