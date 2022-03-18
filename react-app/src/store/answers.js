import { postAnswerAction } from "./questions";
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

    if (res.ok) {
        const data = await res.json();
        if (data.errors) {
            return data;
        } else {
            dispatch(postAnswerAction(data.answer, question_id))
            return data
        }
    }
}

export const patchAnswer = ( answer, answer_id ) => async (dispatch) => {
    console.log('in thunk')
    const res = await fetch('/api/answers/', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            answer,
            answer_id
        })
    })

    if (res.ok) {
        const data = await res.json();
        console.log(data)
        if (data.errors) {
            return data;
        } else {
            // dispatch(patchAnswerAction(data.answer, question_id))
            return data
        }
    }
}
