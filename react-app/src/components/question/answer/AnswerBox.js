import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { postAnswer, patchAnswer } from "../../../store/answers";


export const AnswerBox = ({ user, questionId, answerObj, closeAnswerBox, closeEditAnswerBox, option }) => {

    const dispatch = useDispatch()
    const [answerId, setAnswerId] = useState(answerObj ? answerObj.id: null)
    const [answer, setAnswer] = useState(answerObj ? answerObj.answer : '')
    const [showErrors, setShowErrors] = useState(false)
    const [error, setError] = useState('')


    const handlePostAnswerSubmit = async () => {
        const response = await dispatch(postAnswer(answer, questionId))
        if (response.errors) {
            setError(response.errors[0].answer)
            setShowErrors(true)
        } else {
            closeAnswerBox()
        }
    }

    const handleEditAnswerSubmit = async () => {
        const response = await dispatch(patchAnswer(answer, answerId, questionId))
        if (response.errors) {
            setShowErrors(true)
            setError(response.errors[0].answer)
        } else {
            closeEditAnswerBox()
        }
    }

    useEffect(() => {
        if (answer?.length >= 15) {
            setShowErrors(false)
            setError('')
        }
    }, [answer])

    const handleCancel = () => {
        if (option === 'edit') {
            closeEditAnswerBox()
        } else {
            closeAnswerBox()
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (option === 'edit') {
            console.log('in handle submit for edit')
            handleEditAnswerSubmit()
        } else {
            console.log('in handle submit for post')
            handlePostAnswerSubmit()
        }
    }

    return (
        <div id="post-answer-box-container">
            <div id="post-answer-box-header">
                <img ></img>
                <div id='post-answer-box-text'>
                    <div id='box-name'>{user.full_name}</div>
                    {/* <div>Edit credential</div> */}
                </div>
            </div>
            {showErrors && (
                <div id="error">{error}</div>
            )}
            <form id='answer-form' className='layer2'>
                <textarea
                    type='text'
                    id="post-answer-field"
                    placeholder="Write your answer"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                />
            </form>
            <div id="post-answer-box-footer">
                <button id='post-answer-btn' className='layer2' onClick={handleSubmit}>Post</button>
                <button id='post-answer-cancel-btn' className='layer2' onClick={handleCancel}>Cancel</button>
            </div>
        </div>
    )
}
