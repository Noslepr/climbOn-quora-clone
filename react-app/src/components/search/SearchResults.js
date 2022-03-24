import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { PostQuestion } from "../postQuestion/PostQuestion";
import { deleteQuestion } from "../../store/questions";
import { AddCredentials } from "../credentials/AddCredentials";
import { Modal } from "../../context/Modal";
import img from '../../images/defaultUser.jpg'
import './SearchResults.css'
import '../home/Home.css'

export const SearchResults = ({ }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const searchObj = useSelector(({ search }) => search)
    const userObj = useSelector(({ session }) => session)
    const user = userObj.user

    const [currentQuestion, setCurrentQuestion] = useState('')
    const [currentQuestionId, setCurrentQuestionId] = useState(null)
    const [showSearchCredModal, setShowSearchCredModal] = useState(false)
    const [showEditQuestionModal, setShowEditQuestionModal] = useState(false)
    const [showDropdown, setShowDropdown] = useState(false)

    const searchResults = searchObj.search

    const handleEdit = (e, id, question) => {
        e.preventDefault()
        setShowEditQuestionModal(true)
        setCurrentQuestion(question)
        setCurrentQuestionId(id)
        setShowDropdown(null)
    }

    const handleDelete = (e, id) => {
        e.preventDefault()
        dispatch(deleteQuestion(id))
        setShowDropdown(null)
        history.push('/')

    }

    return (
        <div id='search-page'>
            <ul>
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
                {showSearchCredModal &&
                    <Modal onClose={() => setShowSearchCredModal(false)}>
                        <AddCredentials
                            user={user}
                            setShowSearchCredModal={setShowSearchCredModal}
                        />
                    </Modal>
                }
                {searchResults && searchResults.map((question, idx) => {
                    return (
                        <li key={`${idx}-question`} className='questions-container'>
                            <div className='home-question-header'>
                                <div className='header-left'>
                                    {question.user.profile_img ?
                                        <img className='question-profile-img' src={question.user.profile_img} alt='profile'></img>
                                        :
                                        <img className='question-profile-img' src={img} alt='profile'></img>
                                    }
                                    <div className='home-question-header-text'>
                                        <div className='home-question-name'>{question.user.full_name}</div>
                                        <div className='home-question-credentials'>
                                            {((question.user.id === user.id) && !user.credentials) &&
                                                <div id='add-credentials' onClick={() => setShowSearchCredModal(true)}>Add Credentials</div>
                                            }
                                            {question.user.id === user.id ?
                                                <div>{user.credentials}</div>
                                                :
                                                <div>{question.user.credentials}</div>
                                            }
                                        </div>
                                    </div>
                                </div>
                                {question.user.id === user.id && (
                                    <i className="fa-solid fa-ellipsis" onClick={() => setShowDropdown(idx)}></i>
                                )}
                                {showDropdown === idx && (
                                    <>
                                        <div id='background' onClick={() => setShowDropdown(null)}></div>
                                        <ul id='question-dropdown-menu'>
                                            <li className="dropdown-list-item" onClick={(e) => {
                                                handleEdit(e, question.id, question.question)
                                                setShowDropdown(null)
                                            }}>
                                                <i className="fa-light fa-pen icon"></i>Edit question
                                            </li>
                                            <li className="dropdown-list-item red" onClick={(e) => handleDelete(e, question.id)}>
                                                <i className="fa-regular fa-trash-can icon"></i>Delete question
                                            </li>
                                        </ul>
                                    </>
                                )}
                            </div>
                            <Link className='layer2' to={`/question/${question.id}`}>
                                <div className='home-question'>{question.question}</div>
                            </Link>
                        </li>
                    )

                })}
            </ul>

        </div>
    )
}
