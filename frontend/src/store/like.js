import { csrfFetch } from './csrf';

// --------------------------- Defined Action Types as Constants ---------------------

const GET_LIKES = 'users/GET_LIKES';
const LIKE_IMAGE = 'users/LIKE_IMAGE';

// --------------------------- Defined Action Creator(s) --------------------------

const getLikes = (likes) => ({ type: GET_LIKES, likes });
const likeImage = (like) => ({ type: LIKE_IMAGE, like });

// ---------------------------  Defined Thunk(s) --------------------------------

// like an image
export const createLike = (imageId, userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/images/${imageId}/like`, {
        method: 'POST',
        body: JSON.stringify({ userId })
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(likeImage(data));
        return response;
    };
};


// get image likes
export const getLikesNum = (imageId) => async (dispatch) => {
    const response = await csrfFetch(`/api/images/${imageId}/get-likes`, {
        method: 'GET'
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(getLikes(data));
        return response;
    }
}

// likes state
const initialState = {
    imageLikes: 0,
};

// likes reducer
const likesReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_LIKES:
            newState = Object.assign({}, state);
            newState["imageLikes"] = action.likes
            return newState
        case LIKE_IMAGE:
            newState = Object.assign({}, state);
            newState["imageLikes"] = action.like
            return newState
        default:
            return state;
    }
}

// Export the reducer
export default likesReducer;
