import { csrfFetch } from './csrf';

// --------------------------- Defined Action Types as Constants ---------------------

const GET_USER = 'users/GET_USER';
const GET_USERS = 'users/GET_USERS';

// --------------------------- Defined Action Creator(s) --------------------------

const getUser = (user) => ({ type: GET_USER, user });
const getUsers = (users) => ({ type: GET_USERS, users });

// ---------------------------  Defined Thunk(s) --------------------------------


// create comment
export const createComment = (newComment) => async (dispatch) => {
    const { userId, imageId, comment } = newComment;

    const response = await csrfFetch(`/api/images/${imageId}/new-comment`, {
        method: 'POST',
        body: JSON.stringify({ userId, imageId, comment })
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(addComment(data));
        return response;
    };
};


// get comment(s)
export const listComments = (imageId) => async (dispatch) => {
    const response = await csrfFetch(`/api/images/${imageId}/comments`, {
        method: 'GET'
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(getComments(data));
        return response;
    }
}

// view user state
const initialState = [];


// view user reducer
const viewUserReducer = (state = initialState, action) => {
    let newState = [ ...state ]
    switch (action.type) {
        case GET_USER:
            return [ action.comment ]
        case GET_USERS:
            return [ ...action.comment ]
        default:
            return state;
    }
}

// Export the reducer
export default viewUserReducer;
