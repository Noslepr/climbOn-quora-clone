import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import { PostQuestion } from '../postQuestion/PostQuestion'
import { Modal } from '../../context/Modal'
import './NavBar.css'

export const NavBar = ({user}) => {
    const [showQuestionModal, setShowQuestionModal] = useState(false)


    const askQuestion = e => {
        e.preventDefault()
        setShowQuestionModal(true)
    }

    return (
        <nav id='nav-bar'>
            <Link to='/'>
                <div id='logo'>climbOn</div>
            </Link>
            <div>
                <LogoutButton />
                <button onClick={askQuestion}>Add question</button>
            </div>

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
