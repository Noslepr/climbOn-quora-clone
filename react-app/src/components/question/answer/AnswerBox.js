import React, { useEffect, useState } from "react";
// import { useState } from "react";


export const AnswerBox = ({ user, showErrors, error, setShowErrors, setError, answerObj, handleAnswerSubmit, handleEditAnswerSubmit, closeAnswerBox, closeEditAnswerBox, option }) => {
    let answerId
    const [answer, setAnswer] = useState('')

    useEffect(() => {
        console.log(answerObj)
        if (answerObj) {
            setAnswer(answerObj.answer)
            answerId = answerObj.id
        }
    }, [])

    useEffect(() => {
        if (answer.length >= 15) {
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

    const handlePost = () => {
        if (option === 'edit') {
            handleEditAnswerSubmit(answer, answerId)
        } else {
            handleAnswerSubmit(answer)
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
            <form id='answer-form'>
                <textarea
                    type='text'
                    id="post-answer-field"
                    placeholder="Write your answer"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                />
            </form>
            <div id="post-answer-box-footer">
                <button id='post-answer-btn' onClick={handlePost}>Post</button>
                <button id='post-answer-cancel-btn' onClick={handleCancel}>Cancel</button>
            </div>
        </div>
    )
}
