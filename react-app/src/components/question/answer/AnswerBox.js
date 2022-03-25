import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { postAnswer, patchAnswer } from "../../../store/answers";
import img from '../../../images/defaultUser.jpg'


export const AnswerBox = ({ user, questionId, answerObj, closeAnswerBox, closeEditAnswerBox, setShowAnswerCredModal, option }) => {

    const dispatch = useDispatch()
    const [answerId] = useState(answerObj ? answerObj.id : null)
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
            handleEditAnswerSubmit()
        } else {
            handlePostAnswerSubmit()
        }
    }

    return (
        <div id="post-answer-box-container">
            <div id="post-answer-box-header">
                {user.profile_img ?
                    <img src={user.profile_img} alt='profile' className="answer-profile-img"></img>
                    :
                    <img src={img} alt='profile' className="answer-profile-img"></img>
                }
                <div id='post-answer-box-text'>
                    <div id='box-name'>{user.full_name}</div>
                    {/* <div>Edit credential</div> */}
                    {!user.credentials ?
                        <div className='home-question-credentials' id='add-credentials' onClick={() => setShowAnswerCredModal(true)}>
                            Add Credentials
                        </div>
                        :
                        <div className='home-question-credentials'>
                            {user.credentials}
                        </div>
                    }
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
                {option === 'edit' ?
                    <button id='post-answer-btn' className='layer2' onClick={handleSubmit}>Edit</button>
                    :
                    <button id='post-answer-btn' className='layer2' onClick={handleSubmit}>Post</button>
                }
                <button id='post-answer-cancel-btn' className='layer2' onClick={handleCancel}>Cancel</button>
            </div>
        </div>
    )
}
