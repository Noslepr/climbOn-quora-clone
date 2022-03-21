import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { PostQuestion } from '../postQuestion/PostQuestion'
import { Modal } from '../../context/Modal'
import { logout } from '../../store/session';
import img from '../../images/defaultUser.jpg'
import { AddCredentials } from '../credentials/AddCredentials';
import './NavBar.css'

export const NavBar = ({user}) => {
    const dispatch = useDispatch()
    const [showQuestionModal, setShowQuestionModal] = useState(false)
    const [showProfileDropdown, setShowProfileDropdown] = useState(false)
    const [showNavCredModal, setShowNavCredModal] = useState(false)

    const askQuestion = e => {
        e.preventDefault()
        setShowQuestionModal(true)
    }

    const handleLogout = () => {
        dispatch(logout())
    }

    return (
        <nav id='nav-bar'>
            <Link to='/'>
                <div id='logo'>climbOn</div>
            </Link>
            <div id='nav-right'>
                <img src={img} id='nav-profile' alt='profie' onClick={() => setShowProfileDropdown(true)}></img>
                <button  id='add-question-btn'onClick={askQuestion}>Add question</button>
                {showProfileDropdown && (
                    <>
                        <div id='nav-background' onClick={() => setShowProfileDropdown(false)}></div>
                        <div id='nav-dropdown'>
                            <div id='nav-dropdown-header'>
                                <img src={img} id='dropdown-profile-img' alt='profie'></img>
                                <div id='dropdown-name'>{user.full_name}</div>
                            </div>
                            <ul id='nav-dropdown-your-list'>
                                <li><i className="fa-light fa-message-question"></i>Your Questions</li>
                                <li><i className="fa-light fa-pen-field your-answers"></i>Your Answers</li>
                                <li onClick={() => {
                                    setShowNavCredModal(true)
                                    setShowProfileDropdown(false)
                                }}><i className="fa-light fa-id-card"></i>Edit Your Credentials</li>
                            </ul>
                            <div id='logout-container'>
                                <div id='logout' onClick={handleLogout}>Logout</div>
                            </div>
                            <ul id='dropdown-about'>
                                <li>About me</li>
                                <li>LinkedIn</li>
                                <li>GitHub</li>
                            </ul>
                        </div>
                    </>
                )}
            </div>

            {showNavCredModal &&
                <Modal onClose={() => setShowNavCredModal(false)}>
                    <AddCredentials
                        user={user}
                        option='nav'
                        setShowNavCredModal={setShowNavCredModal}
                    />
                </Modal>
            }

            {showQuestionModal &&
                <Modal onClose={() => setShowQuestionModal(false)}>
                    <PostQuestion
                        setShowQuestionModal={setShowQuestionModal}
                        option='post'
                    />
                </Modal>
            }
        </nav>
    )
}
