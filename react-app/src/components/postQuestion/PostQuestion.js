import React, { useEffect, useState } from 'react';


export const PostQuestion = ({setShowQuestionModal}) => {
    const [question, setQuestion] = useState('')

    const handleQuestion = (e) => {
        e.preventDefault()
        setShowQuestionModal(false)
        console.log('question:', question)
    }

    return (
        <>
            <form onSubmit={handleQuestion}>
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
