import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { postQuestion, patchQuestion } from '../../store/questions';


export const PostQuestion = ({setShowQuestionModal, setShowEditQuestionModal, currentQuestion, currentQuestionId, option}) => {
    const dispatch = useDispatch()
    const [question, setQuestion] = useState('')
    const [errors, setErrors] = useState([])

    useEffect(() => {
        if (currentQuestion) {
            setQuestion(currentQuestion)
        }
    }, [currentQuestion])

    const handleQuestion = async (e) => {
        e.preventDefault()

        if (option === 'post') {
            const response = await dispatch(postQuestion(question))
            if (response.errors) {
                setErrors(response.errors)
                return
            } else {
                setShowQuestionModal(false)
            }

        } else if (option === 'edit') {
            const response = await dispatch(patchQuestion(question, currentQuestionId))
            if (response.errors) {
                setErrors(response.errors)
                return
            } else {
                setShowEditQuestionModal(false)
            }
        }
    }

    return (
        <>
            <form onSubmit={handleQuestion}>
                <ul>
                    {errors && errors.map(error => (
                        <li key={Math.random()}>{error.question}</li>
                    ))}
                </ul>
                <input
                    type='text'
                    placeholder='question'
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                />
                <button>Add question</button>
            </form>
        </>
    )
}
