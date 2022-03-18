import React, { useEffect, useState } from "react";
// import { useState } from "react";


export const AnswerBox = ({ user, showErrors, error, savedAnswer, trigger, setTrigger, setShowErrors, setError, answerObj, handleAnswerSubmit, handleEditAnswerSubmit, closeAnswerBox, closeEditAnswerBox, option }) => {
    const [answerId, setAnswerId] = useState(null)
    const [answer, setAnswer] = useState('')
    // const [count, setCount] = useState(0)

    useEffect(() => {
        console.log('in use effect')
        if (answerObj && !error) {
            console.log('setting answer to answerObj')
            // setAnswer(answerObj.answer)
            // setAnswerId(answerObj.id)
        }
    }, [user])
    // useEffect(() => {
    //     // console.log('answer in useEffect',answer)
    // }, [answer])

    // useEffect(() => {
    //     if (answer?.length >= 15) {
    //         setShowErrors(false)
    //         setError('')
    //         // setTrigger(true)
    //     }
    // }, [answer])

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
                <button id='post-answer-btn' onClick={(e) => handleSubmit(e)}>Post</button>
                <button id='post-answer-cancel-btn' onClick={handleCancel}>Cancel</button>
            </div>
        </div>
    )
}
