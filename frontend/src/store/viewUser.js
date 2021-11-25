import { csrfFetch } from './csrf';

// --------------------------- Defined Action Types as Constants ---------------------

const GET_COMMENTS = 'users/GET_COMMENTS';
const ADD_COMMENT = 'users/ADD_COMMENT';
const EDIT_COMMENT = 'users/EDIT_COMMENT';
const DELETE_COMMENT = 'users/DELETE_COMMENT';

// --------------------------- Defined Action Creator(s) --------------------------

const getComments = (comment) => ({ type: GET_COMMENTS, comment });
const addComment = (comment) => ({ type: ADD_COMMENT, comment });
const editComment = (comment) => ({ type: EDIT_COMMENT, comment });
const deleteComment = (comment) => ({ type: DELETE_COMMENT, comment });

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

// edit comment data
export const editCommentContent = (imageId, updatedState, commentId) => async (dispatch) => {
    const response = await csrfFetch(`/api/images/${imageId}/comment/${commentId}/edit`, {
        method: 'PUT',
        body: JSON.stringify({ comment: updatedState })
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(editComment(data));
        return response;
    };
};


// delete an comment
export const removeComment = (imageId, commentId) => async (dispatch) => {
    const response = await csrfFetch(`/api/images/${imageId}/comment/${commentId}/delete`, {
        method: 'DELETE',
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(deleteComment(data));
        return response;
    };
};


// Comment state
const initialState = [];


// Comment reducer
const commentReducer = (state = initialState, action) => {
    let newState = [ ...state ]
    switch (action.type) {
        case GET_COMMENTS:
            return [ ...action.comment ]
        case ADD_COMMENT:
            return [ ...newState, action.comment ]
        case EDIT_COMMENT:
            return [ newState ];
        case DELETE_COMMENT:
            return newState.filter((el) => action.comment.id !== el.id)
        default:
            return state;
    }
}

// Export the reducer
export default commentReducer;
