import { csrfFetch } from './csrf';

// --------------------------- Defined Action Types as Constants ---------------------

const GET_IMAGE = 'users/GET_IMAGE'
const GET_IMAGES = 'users/GET_IMAGES'
const ADD_IMAGE = 'users/ADD_IMAGE';
const EDIT_IMAGE = 'users/EDIT_IMAGE';
const DELETE_IMAGE = 'users/DELETE_IMAGE';

// --------------------------- Defined Action Creator(s) --------------------------

const getImage = (image) => ({ type: GET_IMAGE, image });
const getImages = (image) => ({ type: GET_IMAGES, image });
const addImage = (image) => ({ type: ADD_IMAGE, image });
const editImage = (image) => ({ type: EDIT_IMAGE, image });
const removeImage = (image) => ({ type: DELETE_IMAGE, image });

// ---------------------------  Defined Thunk(s) --------------------------------

// get image(s)
export const listImages = (userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/images`, {
        method: 'GET'
    });

    if (response.ok) {
        const data = await response.json();
        console.log(data)
        dispatch(getImages(data));
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
        dispatch(removeImage(data));
    };
};


// Image state
const initialState = [];


// Image reducer
const imageReducer = (state = initialState, action) => {
    let newState = [ ...state ]
    switch (action.type) {
        case GET_IMAGE:
            return [ action.image ]
        case GET_IMAGES:
            return [ ...action.image ]
        case ADD_IMAGE:
            return [ ...newState, action.image ]
        case EDIT_IMAGE:
            return [ newState ]
        case DELETE_IMAGE:
            return newState.filter((el) => action.image.id !== el.id)
        default:
            return state;
    }
}

// Export the reducer
export default imageReducer;
