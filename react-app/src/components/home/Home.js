import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getQuestions, deleteQuestion } from '../../store/questions';
import { Modal } from '../../context/Modal';
import { PostQuestion } from '../postQuestion/PostQuestion';
import './Home.css'

export const HomePage = ({ user }) => {
    const dispatch = useDispatch()
    const questions = useSelector(({questions}) => questions)
    const [showEditQuestionModal, setShowEditQuestionModal] = useState(false)
    const [currentQuestion, setCurrentQuestion] = useState('')
    const [currentQuestionId, setCurrentQuestionId] = useState(null)
    const arrayOfIds = Object.keys(questions)

    const newQuestionId = Math.max(...arrayOfIds)
    console.log(newQuestionId)

    const shuffleIds = arr => {
        for (let i = 0; i < arr.length; i++) {
            let j = Math.floor(Math.random() * (arr.length - 1))
            let temp = arr[i]
            arr[i] = arr[j]
            arr[j] = temp
        }
        return arr
    }

    const handleEdit = (e, id) => {
        e.preventDefault()
        const idToInt = parseInt(id)
        setShowEditQuestionModal(true)
        setCurrentQuestion(questions[idToInt].question)
        setCurrentQuestionId(idToInt)
    }

    const handleDelete = (e, id) => {
        e.preventDefault()
        const idToInt = parseInt(id)
        dispatch(deleteQuestion(idToInt))
        setCurrentQuestionId(null)
    }

    return (
        <div id='home-page'>
            <ul>
                {currentQuestionId ?
                    <li className='questions-container'>
                        <Link to={`/question/${currentQuestionId}`}>
                            <div>{questions[currentQuestionId].question}</div>
                        </Link>
                        <button onClick={(e) => handleEdit(e, currentQuestionId)}>Edit</button>
                        <button onClick={(e) => handleDelete(e, currentQuestionId)}>Delete</button>
                    </li>
                    :
                    <li className='questions-container'>
                        <Link to={`/question/${newQuestionId}`}>
                            <div>{questions[newQuestionId].question}</div>
                        </Link>
                        {questions[newQuestionId].user.id === user.id && (
                            <>
                                <button onClick={(e) => handleEdit(e, newQuestionId)}>Edit</button>
                                <button onClick={(e) => handleDelete(e, newQuestionId)}>Delete</button>
                            </>
                        )}
                    </li>
                }
                {shuffleIds(arrayOfIds).map(id => {
                    if (parseInt(id) !== currentQuestionId && parseInt(id) !== newQuestionId) {
                        return (
                            <li key={`${id}-question`} className='questions-container'>
                                <Link to={`/question/${id}`}>
                                    <div>{questions[id].question}</div>
                                </Link>
                                {questions[id].user.id === user.id && (
                                    <>
                                        <button onClick={(e) => handleEdit(e, id)}>Edit</button>
                                        <button onClick={(e) => handleDelete(e, id)}>Delete</button>
                                    </>
                                )}
                            </li>
                        )
                    } else return null
                })}
            </ul>
            { showEditQuestionModal &&
                <Modal onClose={() => setShowEditQuestionModal(false)}>
                    <PostQuestion
                        setShowEditQuestionModal={setShowEditQuestionModal}
                        currentQuestion={currentQuestion}
                        currentQuestionId={currentQuestionId}
                        option='edit'
                    />
                </Modal>
            }
        </div>
    )
}
