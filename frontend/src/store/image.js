import { csrfFetch } from './csrf';

// Define Action Types as Constants
const ADD_IMAGE = 'users/ADD_IMAGE';
const EDIT_IMAGE = 'users/EDIT_IMAGE';
const REMOVE_IMAGE = 'users/REMOVE_IMAGE';


// Define Action Creators
const addImage = (image) => ({ type: ADD_IMAGE, payload: image});
const editImage = (image) => ({ type: EDIT_IMAGE, payload: image });
const removeImage = () => ({ type: REMOVE_IMAGE })

// Define Thunks
export const createImage = (image) => async (dispatch) => {
    const { imageUrl, description } = image;
    const response = await csrfFetch('/api/image', {
        method: 'POST',
        body: JSON.stringify({
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

// Define an initial state
const initialState = {};

// Define a reducer
const imageReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case ADD_IMAGE:
            newState = Object.assign({}, state);
            newState.newImage = action.image;
            return newState;
        default:
            return state;
    }
}


// Export the reducer
export default imageReducer;
