import React, { useEffect, useState } from 'react';


export const PostQuestion = ({}) => {
    const [question, setQuestion] = useState('')

    return (
        <>
            <form>
                <input
                    type='text'
                    placeholder='question'
                    value={question}
                    onChange={(e) => setQuestion(e.target)}
                />
            </form>
        </>
    )
}
