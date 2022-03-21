import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { AnswerBox } from "./answer/AnswerBox";
import { deleteAnswer } from "../../store/answers";
import './Question.css'

export const Question = ({ user }) => {
    const dispatch = useDispatch()
    const { id : questionId } = useParams()
    const questions = useSelector(({questions}) => questions)
    const question = questions[questionId]

    const [showAnswerBox, setShowAnswerBox] = useState(false)
    const [showDropdown, setShowDropdown] = useState(null)
    const [showEditAnswerBox, setShowEditAnswerBox] = useState(null)

    const handleDelete = (answerId) => {
        dispatch(deleteAnswer(answerId, questionId))
        setShowDropdown(null)
    }

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
    }

    const closeEditAnswerBox = () => {
        console.log('closing')
        setShowEditAnswerBox(null)
    }

    return (
        <div id='question-page'>
            <div id='question-left-container'>
                <div id="question-header-container">
                    <div id="question-header">{question.question}</div>
                    <div id="question-footer-icons">
                        <div id="post-answer" className="layer2" onClick={openAnswerBox}>
                            <i className="fa-solid fa-pen-to-square square"></i>
                            <div className="answers-text" id='post-answer-text'>Answer</div>
                        </div>
                    </div>
                {showAnswerBox && (
                    <AnswerBox
                        user={user}
                        questionId={questionId}
                        closeAnswerBox={closeAnswerBox}
                        option='post'
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
                                    <i className="fa-solid fa-ellipsis layer2" onClick={() => setShowDropdown(idx)}></i>
                                )}
                                {(showDropdown === idx) && (
                                    <>
                                        <div id='background' onClick={() => setShowDropdown(null)}></div>
                                        <ul id='answer-dropdown-menu'>
                                            <li className="dropdown-list-item" onClick={() => {
                                                setShowEditAnswerBox(idx)
                                                setShowDropdown(null)
                                                }}>
                                                <i className="fa-light fa-pen icon"></i>Edit answer
                                            </li>
                                            <li className="dropdown-list-item red" onClick={() => handleDelete(answerObj.id)}><i className="fa-regular fa-trash-can icon"></i>Delete answer</li>
                                        </ul>
                                    </>
                                )}
                            </div>
                            {showEditAnswerBox !== idx && (
                                <li className="list-answer">{answerObj.answer}</li>
                            )}
                            {showEditAnswerBox === idx && (
                                <AnswerBox
                                    user={user}
                                    questionId={questionId}
                                    answerObj={answerObj}
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
