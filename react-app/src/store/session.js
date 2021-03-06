import { patchCredAction, patchProfileImg } from "./questions";


// constants
const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';
const PATCH_USER = 'session/PATCH_USER'
const PATCH_PROFILE = 'session/PATCH_PROFILE'

const setUser = (user) => ({
    type: SET_USER,
    payload: user
});

const removeUser = () => ({
    type: REMOVE_USER,
})

const patchUserActionCreator = (data) => ({
    type: PATCH_USER,
    payload: data.credentials
})

const addProfileImgAction = (data) => ({
    type: PATCH_PROFILE,
    payload: data.profile_img
})


export const authenticate = () => async (dispatch) => {
    const response = await fetch('/api/auth/', {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }

        dispatch(setUser(data));
    }
}

export const login = (email, password) => async (dispatch) => {
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    });


    if (response.ok) {
        const data = await response.json();
        dispatch(setUser(data))
        return null;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
    }

}

export const logout = () => async (dispatch) => {
    const response = await fetch('/api/auth/logout', {
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (response.ok) {
        dispatch(removeUser());
    }
};


export const signUp = (full_name, email, password, repeat_password) => async (dispatch) => {
    const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            full_name,
            email,
            password,
            repeat_password
        }),
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(setUser(data))
        return null;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
}

export const patchUser = (credentials) => async (dispatch) => {
    const response = await fetch('/api/users/', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            credentials
        }),
    });

    const data = await response.json();
    if (response.ok) {
        if (response.errors) {
            return data;
        } else {
            dispatch(patchUserActionCreator(data))
            dispatch(patchCredAction(data))
            return data;
        }
    }
}

export const addProfileImg = (profileImg) => async (dispatch) => {
    const formData = new FormData();
    formData.append('profile_img', profileImg);

    const response = await fetch('/api/users/profileImg/', {
        method: 'PATCH',
        body: formData
    })
    const data = await response.json();
    if (response.ok) {
        dispatch(addProfileImgAction(data))
        dispatch(patchProfileImg(data))
    }

}

const initialState = { user: null };
export default function reducer(state = initialState, action) {
    let newState
    switch (action.type) {
        case SET_USER:
            return { user: action.payload }
        case REMOVE_USER:
            return { user: null }
        case PATCH_USER:
            newState = {...state}
            newState.user.credentials = action.payload
            return newState
        case PATCH_PROFILE:
            newState = {...state}
            newState.user.profile_img = action.payload
            return newState
        default:
            return state;
    }
}
