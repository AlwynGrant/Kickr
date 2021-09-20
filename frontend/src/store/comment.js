import { csrfFetch } from './csrf';

// --------------------------- Defined Action Types as Constants ---------------------



const GET_COMMENTS = 'users/GET_COMMENTS';
const ADD_COMMENT = 'users/ADD_COMMENT';
const EDIT_COMMENT = 'users/EDIT_COMMENT';


// --------------------------- Defined Action Creator(s) --------------------------


const getComments = (comment) => ({ type: GET_COMMENTS, comment });
const addComment = (comment) => ({ type: ADD_COMMENT, comment });
const editComment = (comment) => ({ type: EDIT_COMMENT, comment });


// ---------------------------  Defined Thunk(s) --------------------------------


// create comment
export const createComment = (newComment) => async (dispatch) => {
    const { userId, imageId, comment } = newComment;
    const response = await csrfFetch(`/api/image/${imageId}/comment`, {
        method: 'POST',
        body: JSON.stringify({
            userId,
            imageId,
            comment
        })
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(addComment(data));
        return response;
    };
};


// get comment(s)
export const listComments = (imageId) => async (dispatch) => {
    const response = await csrfFetch(`/api/image/${imageId}`, {
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
    const response = await csrfFetch(`/api/image/${imageId}/comment/${commentId}/edit`, {
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
export const deleteComment = (imageId, commentId) => async (dispatch) => {
    const response = await csrfFetch(`/api/image/${imageId}/comment/${commentId}/delete`, {
        method: 'DELETE',
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(getComments(data));
        return response;
    };
};


// Comment state
const initialState = {};


// Comment reducer
const commentReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case ADD_COMMENT:
            newState = Object.assign({}, state);
            newState['comments'] = action.comment;
            return newState;
        case GET_COMMENTS:
            newState = Object.assign({}, state);
            newState= action.comment;
            return newState;
        case EDIT_COMMENT:
            newState = Object.assign({}, state); // TODO: REFACTOR EDIT AFTER MODAL
            newState.comment = action.comment
            return newState;
        default:
            return state;
    }
}

// Export the reducer
export default commentReducer;
