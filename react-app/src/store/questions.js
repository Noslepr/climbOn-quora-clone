const GET_QUESTIONS = 'questions/GET_QUESTIONS'
const POST_QUESTION = 'questions/POST_QUESTION'
const PATCH_QUESTION = 'questions/PATCH_QUESTION'
const DELETE_QUESTION = 'questions/DELETE_QUESTION'
const POST_ANSWER = 'answers/POST_ANSWER'
const PATCH_ANSWER = 'answers/PATCH_ANSWER'
const DELETE_ANSWER = 'answers/DELETE_ANSWER'
const PATCH_CRED = 'questions/PATCH_CRED'
const PATCH_PROFILE_IMG = 'questions/PATCH_PROFILE'

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

const deleteQuestionAction = (id) => ({
    type: DELETE_QUESTION,
    payload: id
})

export const postAnswerAction = (answer, questionId) => ({
    type: POST_ANSWER,
    payload: { answer, questionId }
})

export const patchAnswerAction = (answer, answerId, questionId) => ({
    type: PATCH_ANSWER,
    payload: { answer, answerId, questionId}
})

export const deleteAnswerAction = (answerId, questionId ) => ({
    type: DELETE_ANSWER,
    payload: { answerId, questionId }
})

export const patchCredAction = (data) => ({
    type: PATCH_CRED,
    payload: data
})

export const patchProfileImg = (data) => ({
    type: PATCH_PROFILE_IMG,
    payload: data
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
        if (data.errors) {
            return data;
        } else {
            dispatch(patchQuestionAction(data))
            return data
        }
    }
}

export const deleteQuestion = (question_id) => async (dispatch) => {
    const res = await fetch('/api/questions/', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            question_id
        })
    })

    if (res.ok) {
        const data = await res.json();
        dispatch(deleteQuestionAction(data))
        return null
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

        case DELETE_QUESTION:
            newState = {...state}
            delete newState[action.payload.id]
            return newState

        case POST_ANSWER:
            newState = {...state}
            newState[action.payload.questionId].answers.unshift(action.payload.answer)
            return newState

        case PATCH_ANSWER:
            newState = {...state}
            newState[action.payload.questionId].answers.map(answer => {
                if (answer.id === action.payload.answerId) {
                    answer.answer = action.payload.answer
                } else return answer
            })
            return newState

        case DELETE_ANSWER:
            newState = {...state}
            const questionId = action.payload.questionId
            newState[questionId].answers.map((answer, idx) => {
                if (answer.id === action.payload.answerId) {
                    newState[questionId].answers.splice(idx, 1)
                } else return answer
            })
            return newState

        case PATCH_CRED:
            newState = {...state}
            const userId = action.payload.user_id
            for (let id in newState) {
                if (newState[id].user.id === parseInt(userId)) {
                    newState[id].user.credentials = action.payload.credentials
                }
                newState[id].answers.map((answer, idx) => {
                    if (answer.user.id === parseInt(userId)) {
                        newState[id].answers[idx].user.credentials = action.payload.credentials
                    }
                })
            }
            return newState

        case PATCH_PROFILE_IMG:
            newState = {...state}
            const user_id = parseInt(action.payload.user_id)
            for (let id in newState) {
                if (newState[id].user.id === user_id) {
                    newState[id].user.profile_img = action.payload.profile_img
                }
                newState[id].answers.map((answer, idx) => {
                    if (answer.user.id === user_id) {
                        newState[id].answers[idx].user.profile_img = action.payload.profile_img
                    }
                })
            }
            return newState
        default:
            return state;
    }
}
