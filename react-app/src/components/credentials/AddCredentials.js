import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { patchUser } from '../../store/session';
import './AddCredentials.css'




export const AddCredentials = ({ user, option, setShowCredModal, setShowNavCredModal, setShowAnswerCredModal, setShowSearchCredModal }) => {
    const dispatch = useDispatch()
    const [credentials, setCredentials] = useState('')
    const [errors, setErrors] = useState([])

    const handleCredentials = async (e) => {
        const response = await dispatch(patchUser(credentials))
        if (response.errors) {
            setErrors(response.errors)
        } else {
            handleCancel(e)
        }

    }

    useEffect(() => {
        if (user.credentials) {
            setCredentials(user.credentials)
        }
    }, [user])

    const handleCancel = (e) => {
        e.preventDefault()
        if (option === 'home') {
            setShowCredModal(false)
        } else if (option === 'nav') {
            setShowNavCredModal(false)
        } else if (option === 'answer') {
            setShowAnswerCredModal(false)
        } else {
            setShowSearchCredModal(false)
        }
    }

    return (
        <div id='add-credentials-modal'>
            <div>
                <div id='add-question-modal-header'>
                    <div className='x-continaer'>
                        <i className="fa-light fa-xmark x" onClick={handleCancel}></i>
                    </div>
                    <div id='bubble-container'>
                        <i className="fa-light fa-id-card cred-icon"></i>
                        <div id='add-header-text'>Add Credentials</div>
                    </div>
                </div>
                <div>
                    <ul id='question-tip-box'>
                        <div id='tips-header'>Good credentials:</div>
                        <li>Are short and specific</li>
                        <li>Are helpful and sincere</li>
                        <li>Have correct grammar and spelling</li>
                    </ul>
                </div>
                <form>
                    <input
                        id='question-form-field'
                        type='text'
                        placeholder='Credentials'
                        value={credentials}
                        onChange={(e) => setCredentials(e.target.value)}
                    />
                </form>
                <ul id='question-error-container'>
                    {errors && errors.map(error => (
                        <li key={Math.random()} className='question-errors'>{error.credentials}</li>
                    ))}
                </ul>
            </div>
            <div id='add-question-btn-container'>
                <button id='add-question-cancel-btn' className='btn' onClick={handleCancel}>Cancel</button>
                <button id='add-question-add-btn' className='btn' onClick={handleCredentials}>Add credentials</button>
            </div>
        </div>
    )
}
