const GET_QUESTIONS = 'questions/GET_QUESTIONS'
const POST_QUESTION = 'questions/POST_QUESTION'
const PATCH_QUESTION = 'questions/PATCH_QUESTION'

const getQuestionsAction = (questions) => ({
    type: GET_QUESTIONS,
    payload: questions
})

const postQuestionAction = (question) => ({
    type: POST_QUESTION,
    payload: question
})

const patchQuestionAction = (question) => ({
    type: PATCH_QUESTION,
    payload: question
})

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
            return data;
        } else {
            dispatch(postQuestionAction(data))
            return data
        }
    }
}

export const patchQuestion = (question, id) => async (dispatch) => {
    const res = await fetch('/api/questions/', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            question,
            question_id: id
        })
    })

    if (res.ok) {
        const data = await res.json();
        console.log('in thunk', data)
        if (data.errors) {
            return data;
        } else {
            dispatch(patchQuestionAction(data))
            return data
        }
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

        case PATCH_QUESTION:
            newState = {...state}
            newState[action.payload.question.id] = action.payload.question
            return newState

        default:
            return state;
    }
}
