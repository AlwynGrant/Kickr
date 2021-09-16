import { csrfFetch } from './csrf';

// --------------------------- Defined Action Types as Constants ---------------------


const GET_IMAGE = 'users/GET_IMAGE'
const GET_IMAGES = 'users/GET_IMAGE'
const ADD_IMAGE = 'users/ADD_IMAGE';
const EDIT_IMAGE = 'users/EDIT_IMAGE';
const REMOVE_IMAGE = 'users/REMOVE_IMAGE';


// --------------------------- Defined Action Creator(s) --------------------------


const getImage = (image) => ({ type: GET_IMAGE, image });
const getImages = (image) => ({ type: GET_IMAGES, image });
const addImage = (image) => ({ type: ADD_IMAGE, image });
const editImage = (image) => ({ type: EDIT_IMAGE, image });
const removeImage = () => ({ type: REMOVE_IMAGE })


// ---------------------------  Defined Thunk(s) --------------------------------


// create image
export const createImage = (image) => async (dispatch) => {
    const { userId, imageUrl, description } = image;
    const response = await csrfFetch('/api/image', {
        method: 'POST',
        body: JSON.stringify({
            userId,
            imageUrl,
            description
        })
    });

    if(response.ok) {
        const data = await response.json();
        dispatch(addImage(data));
        return response;
    };
};


// get image(s)
export const listImages = (userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/user/${userId}`, {
        method: 'GET'
    });

    if (response.ok) {
        const images = await response.json();
        dispatch(getImages(images));
    }
}


// get image
export const listImage = (imageId) => async (dispatch) => {
    const response = await csrfFetch(`/api/user/image/${imageId}`, {
        method: 'GET'
    });

    if (response.ok) {
        const image = await response.json();
        dispatch(getImage(image));
    }
}


// edit image data
export const editDescription = (imageId, updatedState) => async (dispatch) => {
    const response = await csrfFetch(`/api/image/${imageId}/edit`, {
        method: 'PATCH',
        body: JSON.stringify({ description: updatedState })
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(editImage(data));
        return response;
    };
};


// delete an image
export const deleteImage = (imageId) => async (dispatch) => {
    const response = await csrfFetch(`/api/image/${imageId}/delete`, {
        method: 'DELETE',
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(removeImage(data));
    };
};


// Define an initial state
const initialState = {};


// Define a reducer
const imageReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case ADD_IMAGE:
            newState = Object.assign({}, state);
            newState = action.image;
            return newState;
        case GET_IMAGES:
            newState = Object.assign({}, state);
            newState = action.image;
            return newState;
        case GET_IMAGE:
            newState = Object.assign({}, state);
            newState = action.image;
            return newState;
        case EDIT_IMAGE:
            newState = Object.assign({}, state);
            newState.image = action.image;
            return newState;
        case REMOVE_IMAGE:
            newState = Object.assign({}, state);
            delete newState[action.image]
            return newState;
        default:
            return state;
    }
}

// Export the reducer
export default imageReducer;
