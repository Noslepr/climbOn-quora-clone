import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { PostQuestion } from '../postQuestion/PostQuestion'
import { AddCredentials } from '../credentials/AddCredentials';
import { Modal } from '../../context/Modal'
import { logout } from '../../store/session';
import { addProfileImg } from '../../store/session';
import { searchThunk } from '../../store/search';
import img from '../../images/defaultUser.jpg'
import './NavBar.css'

export const NavBar = ({ }) => {
    const dispatch = useDispatch()
    const hiddenInputRef = useRef(null);
    const currentUser = useSelector(({ session }) => session);
    const searchObj = useSelector(({ search }) => search)

    const [showQuestionModal, setShowQuestionModal] = useState(false)
    const [showProfileDropdown, setShowProfileDropdown] = useState(false)
    const [showNavCredModal, setShowNavCredModal] = useState(false)
    const [profileImg, setProfileImg] = useState(null)
    const [search, setSearch] = useState('')

    const user = currentUser.user
    const searchResults = searchObj.search

    const askQuestion = e => {
        e.preventDefault()
        setShowQuestionModal(true)
    }

    const handleLogout = () => {
        dispatch(logout())
    }

    const handleButton = (e) => {
        e.preventDefault()
        hiddenInputRef.current.click();
    };

    const handleFile = (e) => {
        setProfileImg(e.target.files[0])
    }

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    useEffect(() => {
        dispatch(searchThunk(search))
    }, [dispatch, search])

    useEffect(() => {
        if (profileImg) {
            dispatch(addProfileImg(profileImg))
            setShowProfileDropdown(false)
        }
    }, [dispatch, profileImg])

    const makeDisappear = () => {
        const list = document.querySelectorAll('.search-list-item')
        list.forEach(ele => ele.style.display = 'none')
    }

    return (
        <nav id='nav-bar'>
            <Link to='/'>
                <div id='logo'>climbOn</div>
            </Link>
            <div id='search-container'>
                <input
                    id='search-bar'
                    type='text'
                    placeholder='Search climbOn'
                    value={search}
                    onKeyUp={handleSearch}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <div id='overlay'></div>
                <i className="fa-regular fa-magnifying-glass search-icon"></i>
                {searchResults &&
                    <ul id='search-list'>
                        <NavLink to={`/search`}>
                            <li id='search-field' onClick={makeDisappear}>
                                <i className="fa-regular fa-magnifying-glass" style={{color:'rgb(160, 160, 160)'}}></i>
                                <div className='search-gray'>Search:</div>
                                {search}
                            </li>
                        </NavLink>
                        {searchResults.map((question, idx) => {
                            if (idx < 4) {
                                return (
                                <NavLink to={`/question/${question.id}`}>
                                    <li className='search-list-item' onClick={() => setSearch('')}>
                                        <i className="fa-light fa-message-question" style={{color:'rgb(160, 160, 160)'}}></i>
                                        <div className='search-gray'>Question:</div>
                                        <div className='searched-questions'>{question.question}</div>
                                    </li>
                                </NavLink>
                                )
                            }
                        })}
                    </ul>
                }
            </div>
            <div id='nav-right'>
                {user.profile_img ?
                    <img src={user.profile_img} id='nav-profile' alt='profile' onClick={() => setShowProfileDropdown(true)}></img>
                    :
                    <img src={img} id='nav-profile' alt='profile' onClick={() => setShowProfileDropdown(true)}></img>
                }
                <button id='add-question-btn' onClick={askQuestion}>Add question</button>
                {showProfileDropdown && (
                    <>
                        <div id='nav-background' onClick={() => setShowProfileDropdown(false)}></div>
                        <div id='nav-dropdown'>
                            <div id='nav-dropdown-header'>
                                <input
                                    type='file'
                                    ref={hiddenInputRef}
                                    onChange={handleFile}
                                    style={{ display: 'none' }}
                                />
                                {user.profile_img ?
                                    <img src={user.profile_img} id='dropdown-profile-img' alt='profile'></img>
                                    :
                                    <img src={img} id='dropdown-profile-img' alt='profile'></img>
                                }
                                <div id='edit-container' onClick={handleButton}>
                                    <i className="fa-light fa-pencil edit"></i>
                                </div>
                                <div id='dropdown-name'>{user.full_name}</div>
                            </div>
                            <ul id='nav-dropdown-your-list'>
                                <NavLink to='/myQuestions'>
                                    <li id='my-questions' onClick={(() => setShowProfileDropdown(false))}><i className="fa-light fa-message-question"></i>Your Questions</li>
                                </NavLink>
                                {/* <li><i className="fa-light fa-pen-field your-answers"></i>Your Answers</li> */}
                                <li onClick={() => {
                                    setShowNavCredModal(true)
                                    setShowProfileDropdown(false)
                                }}><i className="fa-light fa-id-card"></i>Edit Your Credentials</li>
                                <li onClick={handleButton}>
                                    <i class="fa-light fa-square-user edit-profile-icon"></i>Edit Your Profile Image
                                </li>
                            </ul>
                            <div id='logout-container'>
                                <div id='logout' onClick={handleLogout}>Logout</div>
                            </div>
                            <ul id='dropdown-about'>
                                <li>About me</li>
                                <li><a href='https://www.linkedin.com/in/chris-young-96453917/' target='_blank' rel="noopener noreferrer" id='linkedin'>LinkedIn</a></li>
                                <li><a href='https://github.com/Noslepr' target='_blank' rel="noopener noreferrer" id='github'>GitHub</a></li>
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
