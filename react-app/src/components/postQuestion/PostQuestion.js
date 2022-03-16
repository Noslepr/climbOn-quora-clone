import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { postQuestion } from '../../store/questions';


export const PostQuestion = ({setShowQuestionModal}) => {
    const dispatch = useDispatch()
    const [question, setQuestion] = useState('')
    const [errors, setErrors] = useState([])

    const handleQuestion = async (e) => {
        e.preventDefault()
        const response = await dispatch(postQuestion(question))
        if (response.errors) {
            setErrors(response.errors)
            return
        } else {
            setShowQuestionModal(false)
        }
    }
    // useEffect(() => {
    //     console.log(errors)
    // }, [errors])

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
