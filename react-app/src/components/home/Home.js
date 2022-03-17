import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

    useEffect(() => {
        dispatch(getQuestions())
    }, [dispatch])

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
                {currentQuestionId &&
                    <li
                        className='questions-container'>{questions[currentQuestionId].question}
                        {//questions[id].user.id === user.id && (
                            <>
                                <button onClick={(e) => handleEdit(e, currentQuestionId)}>Edit</button>
                                <button onClick={(e) => handleDelete(e, currentQuestionId)}>Delete</button>
                            </>
                        }
                    </li>}
                {shuffleIds(arrayOfIds).map(id => {
                    if (parseInt(id) !== currentQuestionId) {
                        return (
                            <li key={`${id}-question`} className='questions-container'>
                                <div>{questions[id].question}</div>
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
