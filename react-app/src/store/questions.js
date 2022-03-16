const GET_QUESTIONS = 'questions/GET_QUESTIONS'
const POST_QUESTION = 'questions/POST_QUESTION'

const getQuestionsAction = (questions) => ({
    type: GET_QUESTIONS,
    payload: questions
})

const postQuestionAction = (question) => {
    return {
        type: POST_QUESTION,
        payload: question
    }
}


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
        if (data.errors) {
            console.log('data in thunk',data)
            return data;
        } else {
            dispatch(postQuestionAction(data))
            return data
        }
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

        case POST_QUESTION:
            newState = {...state}
            newState[action.payload.question.id] = action.payload.question
            return newState

        default:
            return state;
    }
}
