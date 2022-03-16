import React, { useState } from 'react';
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

            <LogoutButton />
            <button onClick={askQuestion}>Add question</button>

            {showQuestionModal &&
                <Modal onClose={() => setShowQuestionModal(false)}>
                    <PostQuestion setShowQuestionModal={setShowQuestionModal}/>
                </Modal>
            }
        </nav>
    )
}
