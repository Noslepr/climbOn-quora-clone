import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getQuestions } from '../../store/questions';
import { Modal } from '../../context/Modal';
import { PostQuestion } from '../postQuestion/PostQuestion';

export const HomePage = ({ user }) => {
    const dispatch = useDispatch()
    const questions = useSelector(({questions}) => questions)
    const [showEditQuestionModal, setShowEditQuestionModal] = useState(false)
    const [currentQuestion, setCurrentQuestion] = useState('')
    const [currentQuestionId, setCurrentQuestionId] = useState(null)
    const arrayOfIds = Object.keys(questions)

    useEffect(() => {
        dispatch(getQuestions())
        console.log('currentQuestion:', currentQuestion)
    }, [dispatch, currentQuestion])

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

    return (
        <>
            <ul>
                {currentQuestionId && <li>{questions[currentQuestionId].question}</li>}
                {shuffleIds(arrayOfIds).map(id => {
                    if (id != currentQuestionId) {
                        return (
                            <li key={`${id}-question`}>
                                {questions[id].question}
                                {questions[id].user.id === user.id && (
                                    <button onClick={(e) => handleEdit(e, id)}>Edit</button>
                                )}
                            </li>
                        )
                    }
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
        </>
    )
}
