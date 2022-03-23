const SEARCH_RESULTS = 'search/SEARCH_RESULTS'

const searchAction = (questions) => ({
    type: SEARCH_RESULTS,
    payload: questions
})

export const searchThunk = (search_word) => async (dispatch) => {
    let response
    if (search_word) {
        response = await fetch(`/api/search/${search_word}`)
    } else {
        response = await fetch('/api/search/none')
    }

    if (response.ok) {
        const data = await response.json()
        dispatch(searchAction(data.search_results))
    }

}

export default function reducer(state = {}, action) {
    let newState
    switch (action.type) {
        case SEARCH_RESULTS:
            newState = {...state}
            newState.search = action.payload
            return newState
        default:
            return state
    }
}
