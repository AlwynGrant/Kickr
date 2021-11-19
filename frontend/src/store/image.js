import { csrfFetch } from './csrf';

// --------------------------- Defined Action Types as Constants ---------------------

const GET_IMAGE = 'users/GET_IMAGE'
const GET_IMAGES = 'users/GET_IMAGE'
const ADD_IMAGE = 'users/ADD_IMAGE';
const EDIT_IMAGE = 'users/EDIT_IMAGE';
const DELETE_IMAGE = 'users/DELETE_IMAGE';

// --------------------------- Defined Action Creator(s) --------------------------

const getImage = (image) => ({ type: GET_IMAGE, image });
const getImages = (image) => ({ type: GET_IMAGES, image });
const addImage = (image) => ({ type: ADD_IMAGE, image });
const editImage = (image) => ({ type: EDIT_IMAGE, image });

// ---------------------------  Defined Thunk(s) --------------------------------

// get image(s)
export const listImages = (userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/images`, {
        method: 'GET'
    });

    if (response.ok) {
        const images = await response.json();
        dispatch(getImages(images));
    }
}


// get image
export const listImage = (imageId) => async (dispatch) => {
    const response = await csrfFetch(`/api/images/${imageId}`, {
        method: 'GET'
    });

    if (response.ok) {
        const image = await response.json();
        dispatch(getImage(image));
    }
}

// create image
export const createImage = (newImage) => async (dispatch) => {
    const { userId, imageUrl, description } = newImage;

    const formData = new FormData();
    formData.append("userId", userId);
    if (imageUrl) formData.append("imageUrl", imageUrl);
    formData.append("description", description);

    const response = await csrfFetch('/api/images/new', {
        method: 'POST',
        headers: { "Content-Type": "multipart/form-data" },
        body: formData
    });

    if(response.ok) {
        const data = await response.json();
        dispatch(addImage(data));
        // return response;
    };
};

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
        dispatch(getImages(data));
    };
};


// Image state
const initialState = {};


// Image reducer
const imageReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case ADD_IMAGE:
            newState = Object.assign({}, state);
            newState['images'] = action.image;
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
        default:
            return state;
    }
}

// Export the reducer
export default imageReducer;
