import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { postQuestion, patchQuestion } from '../../store/questions';
import './PostQuestion.css'

export const PostQuestion = ({setShowQuestionModal, setShowEditQuestionModal, currentQuestion, currentQuestionId, option}) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [question, setQuestion] = useState('')
    const [errors, setErrors] = useState([])

    console.log(question)
    useEffect(() => {
        if (currentQuestion) {
            setQuestion(currentQuestion)
        }
    }, [currentQuestion,])

    const handleQuestion = async (e) => {
        e.preventDefault()

        if (option === 'post') {
            const response = await dispatch(postQuestion(question))
            if (response.errors) {
                setErrors(response.errors)
                return
            } else {
                history.push('/')
                setShowQuestionModal(false)
            }

        } else if (option === 'edit') {
            const response = await dispatch(patchQuestion(question, currentQuestionId))
            if (response?.errors) {
                setErrors(response.errors)
                return
            } else {
                history.push(`/question/${currentQuestionId}`)
                setShowEditQuestionModal(false)
            }
        }
    }

    const handleCancel = (e) => {
        e.preventDefault()
        if (option === 'post') {
            setShowQuestionModal(false)
        } else if (option === 'edit') {
            setShowEditQuestionModal(false)
        }
    }

    return (
        <div id='add-question-modal'>
            <div>
                <div id='add-question-modal-header'>
                    <div className='x-continaer'>
                        <i className="fa-light fa-xmark x" onClick={handleCancel}></i>
                    </div>
                    <div id='bubble-container'>
                        <i className="fa-light fa-message-question question"></i>
                        <div id='add-header-text'>Add Question</div>
                    </div>
                </div>
                <div>
                    <ul id='question-tip-box'>
                        <div id='tips-header'>Tips on getting good answers quickly</div>
                        <li>Make sure your question has not been asked already</li>
                        <li>Keep your question short and to the point</li>
                        <li>Double-check grammar and spelling</li>
                    </ul>
                </div>
                <form>
                    <input
                        id='question-form-field'
                        type='text'
                        placeholder='Start your question with "What", "How", "Why", etc.'
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        />
                </form>
                <ul id='question-error-container'>
                    {errors && errors.map(error => (
                        <li key={Math.random()} className='question-errors'>{error.question}</li>
                    ))}
                </ul>
            </div>
            <div id='add-question-btn-container'>
                <button id='add-question-cancel-btn' className='btn' onClick={handleCancel}>Cancel</button>
                <button id='add-question-add-btn' className='btn' onClick={handleQuestion}>Add question</button>
            </div>
        </div>
    )
}
