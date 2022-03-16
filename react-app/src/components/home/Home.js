import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getQuestions } from '../../store/questions';

export const HomePage = ({ user }) => {
    const dispatch = useDispatch()
    const questions = useSelector(({questions}) => questions)
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

    return (
        <>
            <ul>
                {shuffleIds(arrayOfIds).map(id => (
                    <li key={`${id}-question`}>{questions[id].question}</li>
                ))}
            </ul>
        </>
    )
}
