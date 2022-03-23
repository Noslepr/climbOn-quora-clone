import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { PostQuestion } from '../postQuestion/PostQuestion'
import { AddCredentials } from '../credentials/AddCredentials';
import { Modal } from '../../context/Modal'
import { logout } from '../../store/session';
import { addProfileImg } from '../../store/session';
import img from '../../images/defaultUser.jpg'
import './NavBar.css'

export const NavBar = ({ }) => {
    const dispatch = useDispatch()
    const hiddenInputRef = useRef(null);
    const currentUser = useSelector(({ session }) => session);

    const [showQuestionModal, setShowQuestionModal] = useState(false)
    const [showProfileDropdown, setShowProfileDropdown] = useState(false)
    const [showNavCredModal, setShowNavCredModal] = useState(false)
    const [profileImg, setProfileImg] = useState(null)
    // const [search, setSearch] = useState('')

    const user = currentUser.user

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
        const searchValue = e.target.value
    }

    useEffect(() => {
        if (profileImg) {
            dispatch(addProfileImg(profileImg))
            setShowProfileDropdown(false)
        }
    }, [dispatch, profileImg])

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
                    onKeyUp={handleSearch}
                />
                <div id='overlay'></div>
                <i class="fa-regular fa-magnifying-glass search-icon"></i>
                <button id='search-btn'>Search</button>
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
                                <li><i className="fa-light fa-message-question"></i>Your Questions</li>
                                <li><i className="fa-light fa-pen-field your-answers"></i>Your Answers</li>
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
