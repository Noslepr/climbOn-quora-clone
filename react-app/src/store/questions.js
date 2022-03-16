const GET_QUESTIONS = 'questions/GET_QUESTIONS'

const getQuestionsAction = (questions) => ({
    type: GET_QUESTIONS,
    payload: questions
})



export const postQuestion = (question) => async (dispatch) => {
    const res = await fetch('/api/questions/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            question
        })
    })

    if (res.ok) {
        const data = await res.json();
        console.log(data)
        dispatch(getQuestionsAction(data))
        return data
    }
}

export const getQuestions = () => async (dispatch) => {
    const res = await fetch('/api/questions/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (res.ok) {
        const data = await res.json();
        dispatch(getQuestionsAction(data))
        return data
    }
}

export default function reducer(state = {}, action) {
    let newState
    switch (action.type) {
        case GET_QUESTIONS:
            newState = {...state}
            action.payload.questions.map(question => newState[question.id] = question)
            return newState

        default:
            return state;
    }
}
