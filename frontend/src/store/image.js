import { csrfFetch } from './csrf';

// --------------------------- Defined Action Types as Constants ---------------------

const GET_IMAGE = 'users/GET_IMAGE'
const GET_IMAGES = 'users/GET_IMAGE'
const ADD_IMAGE = 'users/ADD_IMAGE';
const EDIT_IMAGE = 'users/EDIT_IMAGE';
const REMOVE_IMAGE = 'users/REMOVE_IMAGE';


// --------------------------- Defined Action Creator(s) --------------------------

const getImage = (image) => ({ type: GET_IMAGE, payload: image });
const getImages = (image) => ({ type: GET_IMAGES, payload: image });
const addImage = (image) => ({ type: ADD_IMAGE, payload: image});
const editImage = (image) => ({ type: EDIT_IMAGE, payload: image });
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
    const response = await csrfFetch(`/api/users/${userId}`, {
        method: 'GET'
    });

    if (response.ok) {
        const images = await response.json();
        console.log(images)
        dispatch(getImages(images));
    }
}


// Define an initial state
const initialState = {};

// Define a reducer
const imageReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case ADD_IMAGE:
            newState = Object.assign({}, state);
            newState.newImage = action.payload;
            return newState;
        case GET_IMAGES:
            newState = Object.assign({}, state);
            newState.images = action.payload;
            return newState;
        default:
            return state;
    }
}

// Export the reducer
export default imageReducer;
