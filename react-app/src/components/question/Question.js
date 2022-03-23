import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { AnswerBox } from "./answer/AnswerBox";
import { deleteAnswer } from "../../store/answers";
import { deleteQuestion } from "../../store/questions";
import { AddCredentials } from '../credentials/AddCredentials';
import { PostQuestion } from "../postQuestion/PostQuestion";
import { Modal } from "../../context/Modal";
import img from '../../images/defaultUser.jpg'
import './Question.css'

export const Question = ({ user }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { id: questionId } = useParams()
    const questions = useSelector(({ questions }) => questions)
    const question = questions[questionId]

    const [showAnswerBox, setShowAnswerBox] = useState(false)
    const [showDropdown, setShowDropdown] = useState(null)
    const [showEditAnswerBox, setShowEditAnswerBox] = useState(null)
    const [showAnswerCredModal, setShowAnswerCredModal] = useState(null)
    const [showEditQuestionDropdown, setShowEditQuestionDropdown] = useState(false)
    const [showEditQuestionModal, setShowEditQuestionModal] = useState(false)

    const [currentQuestion, setCurrentQuestion] = useState('')

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
        setShowEditAnswerBox(null)
    }

    const handleEdit = (e) => {
        e.preventDefault()
        // const idToInt = parseInt(id)
        setShowEditQuestionModal(true)
        setCurrentQuestion(question.question)
        // setCurrentQuestionId(idToInt)
        setShowEditQuestionDropdown(false)
    }

    const handleDeleteQuestion = (e) => {
        e.preventDefault()
        // const idToInt = parseInt(id)
        dispatch(deleteQuestion(question.id))
        // setCurrentQuestionId(null)
        setShowEditQuestionDropdown(false)
        history.push('/')
    }

    return (
        <div id='question-page'>
            {showAnswerCredModal &&
                <Modal onClose={() => setShowAnswerCredModal(false)}>
                    <AddCredentials
                        user={user}
                        option='answer'
                        setShowAnswerCredModal={setShowAnswerCredModal}
                    />
                </Modal>
            }
            {showEditQuestionModal &&
                <Modal onClose={() => setShowEditQuestionModal(false)}>
                    <PostQuestion
                        setShowEditQuestionModal={setShowEditQuestionModal}
                        currentQuestion={currentQuestion}
                        currentQuestionId={question.id}
                        option='edit'
                    />
                </Modal>
            }
            <div id='question-left-container'>
                <div id="question-header-container">
                    <div id="question-header">{question.question}</div>
                    <div id="question-footer-icons">
                        <div id="post-answer" className="layer2" onClick={openAnswerBox}>
                            <i className="fa-solid fa-pen-to-square square"></i>
                            <div className="answers-text" id='post-answer-text'>Answer</div>
                        </div>
                        {question.user.id === user.id &&
                            <i className="fa-solid fa-ellipsis ellipsis" onClick={() => setShowEditQuestionDropdown(true)}></i>
                        }
                        {showEditQuestionDropdown && (
                            <>
                                <div id='background' onClick={() => setShowEditQuestionDropdown(false)}></div>
                                <ul id='question-dropdown-menu'>
                                    <li className="dropdown-list-item" onClick={(e) => {
                                        handleEdit(e)
                                        setShowDropdown(null)
                                    }}>
                                        <i className="fa-light fa-pen icon"></i>Edit question
                                    </li>
                                    <li className="dropdown-list-item red" onClick={handleDeleteQuestion}>
                                        <i className="fa-regular fa-trash-can icon"></i>Delete question
                                    </li>
                                </ul>
                            </>
                        )}
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
                                <div className="list-answer-header-left">
                                    {answerObj.user.profile_img ?
                                        <img src={answerObj.user.profile_img} alt='profile' className="answer-profile-img"></img>
                                        :
                                        <img src={img} alt='profile' className="answer-profile-img"></img>
                                    }
                                    <div className="answer-header-text">
                                        <div className="list-answer-user">{answerObj.user.full_name}</div>
                                        {((answerObj.user.id === user.id) && !answerObj.user.credentials) ?
                                            <div className='home-question-credentials' id='add-credentials' onClick={() => setShowAnswerCredModal(true)}>Add Credentials</div> :
                                            <div className='home-question-credentials'>{answerObj.user.credentials}</div>
                                        }
                                    </div>
                                </div>
                                {answerObj.user.id === user.id && (
                                    <i className="fa-solid fa-ellipsis" onClick={() => setShowDropdown(idx)}></i>
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
