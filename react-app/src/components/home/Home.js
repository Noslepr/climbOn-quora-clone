import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteQuestion } from '../../store/questions';
import { Modal } from '../../context/Modal';
import { PostQuestion } from '../postQuestion/PostQuestion';
import { AddCredentials } from '../credentials/AddCredentials';
import img from '../../images/defaultUser.jpg'
import './Home.css'

export const HomePage = ({ user }) => {
    const dispatch = useDispatch()
    const questions = useSelector(({ questions }) => questions)
    const [showEditQuestionModal, setShowEditQuestionModal] = useState(false)
    const [currentQuestion, setCurrentQuestion] = useState('')
    const [currentQuestionId, setCurrentQuestionId] = useState(null)
    const [showCurrentDropdown, setShowCurrentDropdown] = useState(false)
    const [showNewDropdown, setShowNewDropdown] = useState(null)
    const [showDropdown, setShowDropdown] = useState(null)
    const [shuffledArr, setShuffledArr] = useState([])
    const [showCredModal, setShowCredModal] = useState(false)
    const arrayOfIds = Object.keys(questions)

    const newQuestionId = Math.max(...arrayOfIds)

    const shuffleIds = arr => {
        for (let i = 0; i < arr.length; i++) {
            let j = Math.floor(Math.random() * (arr.length - 1))
            let temp = arr[i]
            arr[i] = arr[j]
            arr[j] = temp
        }
        return arr
    }

    useEffect(() => {
        setShuffledArr(shuffleIds(arrayOfIds))
    }, [questions])

    const handleEdit = (e, id) => {
        e.preventDefault()
        const idToInt = parseInt(id)
        setShowEditQuestionModal(true)
        setCurrentQuestion(questions[idToInt].question)
        setCurrentQuestionId(idToInt)
        setShowCurrentDropdown(false)
        setShowNewDropdown(false)
        setShowDropdown(null)
    }

    const handleDelete = (e, id) => {
        e.preventDefault()
        const idToInt = parseInt(id)
        dispatch(deleteQuestion(idToInt))
        setCurrentQuestionId(null)
        setShowCurrentDropdown(false)
        setShowNewDropdown(false)
        setShowDropdown(null)
    }
    // if (currentQuestionId) {
    //     console.log(user.id, questions[currentQuestionId].user.id)
    // }

    // const handleEllipsis = () => {
    //     console.log('in func')
    //     setShowDropdown(true)
    // }

    return (
        <div id='home-page'>
            {showCredModal &&
                <Modal onClose={() => setShowCredModal(false)}>
                    <AddCredentials
                        user={user}
                        option='home'
                        setShowCredModal={setShowCredModal}
                    />
                </Modal>
            }
            <ul>
                {currentQuestionId ?
                    <li className='questions-container'>
                        <div className='home-question-header'>
                            <div className='headder-left'>
                                <img className='question-profile-img' src={img} alt='profile'></img>
                                <div className='home-question-header-text'>
                                    <div className='home-question-name'>{questions[currentQuestionId].user.full_name}</div>
                                    <div className='home-question-credentials'>
                                        {((questions[currentQuestionId].user.id === user.id) && !questions[currentQuestionId].user.credentials) ?
                                            <div id='add-credentials' onClick={() => setShowCredModal(true)}>Add Credentials</div> :
                                            <div>{questions[currentQuestionId].user.credentials}</div>
                                        }
                                    </div>
                                </div>
                            </div>
                            {questions[currentQuestionId].user.id === user.id && (
                                <i className="fa-solid fa-ellipsis" onClick={() => setShowCurrentDropdown(true)}></i>
                            )}
                            {showCurrentDropdown && (
                                <>
                                    <div id='background' onClick={() => setShowCurrentDropdown(null)}></div>
                                    <ul id='question-dropdown-menu'>
                                        <li className="dropdown-list-item" onClick={(e) => {
                                            handleEdit(e, currentQuestionId)
                                            setShowDropdown(null)
                                        }}>
                                            <i className="fa-light fa-pen icon"></i>Edit question
                                        </li>
                                        <li className="dropdown-list-item red" onClick={(e) => handleDelete(e, currentQuestionId)}>
                                            <i className="fa-regular fa-trash-can icon"></i>Delete question
                                        </li>
                                    </ul>
                                </>
                            )}
                        </div>
                        <Link to={`/question/${currentQuestionId}`}>
                            <div className='home-question'>{questions[currentQuestionId].question}</div>
                        </Link>
                    </li>
                    :
                    <li className='questions-container'>
                        <div className='home-question-header'>
                            <div className='headder-left'>
                                <img className='question-profile-img' src={img} alt='profile'></img>
                                <div className='home-question-header-text'>
                                    <div className='home-question-name'>{questions[newQuestionId].user.full_name}</div>
                                    <div className='home-question-credentials'>
                                        {((questions[newQuestionId].user.id === user.id) && !questions[newQuestionId].user.credentials) ?
                                            <div id='add-credentials' onClick={() => setShowCredModal(true)}>Add Credentials</div> :
                                            <div>{questions[newQuestionId].user.credentials}</div>
                                        }
                                    </div>
                                </div>

                            </div>
                            {questions[newQuestionId].user.id === user.id && (
                                <i className="fa-solid fa-ellipsis" onClick={() => setShowNewDropdown(true)}></i>
                            )}
                            {showNewDropdown && (
                                <>
                                    <div id='background' onClick={() => setShowNewDropdown(null)}></div>
                                    <ul id='question-dropdown-menu'>
                                        <li className="dropdown-list-item" onClick={(e) => {
                                            handleEdit(e, newQuestionId)
                                            setShowDropdown(null)
                                        }}>
                                            <i className="fa-light fa-pen icon"></i>Edit question
                                        </li>
                                        <li className="dropdown-list-item red" onClick={(e) => handleDelete(e, newQuestionId)}>
                                            <i className="fa-regular fa-trash-can icon"></i>Delete question
                                        </li>
                                    </ul>
                                </>
                            )}
                        </div>
                        <Link to={`/question/${newQuestionId}`}>
                            <div className='home-question'>{questions[newQuestionId].question}</div>
                        </Link>
                    </li>
                }
                {shuffledArr.map((id, idx) => {
                    if (parseInt(id) !== currentQuestionId && parseInt(id) !== newQuestionId) {
                        if (questions[id]) {
                            return (
                                <li key={`${id}-question`} className='questions-container'>
                                    <div className='home-question-header'>
                                        <div className='headder-left'>
                                            <img className='question-profile-img' src={img} alt='profile'></img>
                                            <div className='home-question-header-text'>
                                                <div className='home-question-name'>{questions[id].user.full_name}</div>
                                                <div className='home-question-credentials'>
                                                    {((questions[id].user.id === user.id) && !questions[id].user.credentials) ?
                                                        <div id='add-credentials' onClick={() => setShowCredModal(true)}>Add Credentials</div> :
                                                        <div>{questions[id].user.credentials}</div>
                                                    }
                                                    {/* {questions[id].user.credentials} */}
                                                </div>
                                            </div>
                                        </div>
                                        {questions[id].user.id === user.id && (
                                            <i className="fa-solid fa-ellipsis" onClick={() => setShowDropdown(idx)}></i>
                                        )}
                                        {showDropdown === idx && (
                                            <>
                                                <div id='background' onClick={() => setShowDropdown(null)}></div>
                                                <ul id='question-dropdown-menu'>
                                                    <li className="dropdown-list-item" onClick={(e) => {
                                                        handleEdit(e, id)
                                                        setShowDropdown(null)
                                                    }}>
                                                        <i className="fa-light fa-pen icon"></i>Edit question
                                                    </li>
                                                    <li className="dropdown-list-item red" onClick={(e) => handleDelete(e, id)}>
                                                        <i className="fa-regular fa-trash-can icon"></i>Delete question
                                                    </li>
                                                </ul>
                                            </>
                                        )}
                                    </div>
                                    <Link to={`/question/${id}`}>
                                        <div className='home-question'>{questions[id].question}</div>
                                    </Link>
                                </li>
                            )
                        }// else return <></>
                    }
                })}
            </ul>
            {showEditQuestionModal &&
                <Modal onClose={() => setShowEditQuestionModal(false)}>
                    <PostQuestion
                        setShowEditQuestionModal={setShowEditQuestionModal}
                        currentQuestion={currentQuestion}
                        currentQuestionId={currentQuestionId}
                        option='edit'
                    />
                </Modal>
            }
        </div>
    )
}
