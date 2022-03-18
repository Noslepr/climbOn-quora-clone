import { deleteAnswerAction, postAnswerAction } from "./questions";
import { patchAnswerAction } from "./questions";

export const postAnswer = ( answer, question_id ) => async (dispatch) => {
    const res = await fetch('/api/answers/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            answer,
            question_id
        })
    })
    const data = await res.json();

    if (res.ok) {
        dispatch(postAnswerAction(data.answer, question_id))
        return data
    } else {
        return data
    }
}

export const patchAnswer = ( answer, answer_id, questionId ) => async (dispatch) => {
    const res = await fetch('/api/answers/', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            answer,
            answer_id
        })
    })
    const data = await res.json();
    console.log('data in thunk',data)

    if (res.ok) {
        dispatch(patchAnswerAction(data.answer.answer, data.answer.id, parseInt(questionId)))
        return data
    } else {
        return data
    }
}

export const deleteAnswer = (answer_id, questionId ) => async (dispatch) => {
    const res = await fetch('/api/answers/', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            answer_id
        })
    })

    if (res.ok) {
        const data = await res.json();
        if (data.errors) {
            return data;
        } else {
            deleteAnswerAction(answer_id, questionId)
            return data
        }
    }
}
