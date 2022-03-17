import { postAnswerAction } from "./questions";

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
        console.log('data in post thunk',data)
        if (data.errors) {
            return data;
        } else {
            dispatch(postAnswerAction(data.answer, question_id))
            return data
        }
    }
}
