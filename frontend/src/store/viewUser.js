import { csrfFetch } from './csrf';

// --------------------------- Defined Action Types as Constants ---------------------

const GET_USER = 'users/GET_USER';
const GET_USERS = 'users/GET_USERS';

// --------------------------- Defined Action Creator(s) --------------------------

const getUser = (user) => ({ type: GET_USER, user });
const getUsers = (users) => ({ type: GET_USERS, users });

// ---------------------------  Defined Thunk(s) --------------------------------


// get one user
export const getOneUser = (userId) => async (dispatch) => {

    const response = await csrfFetch(`/api/user/${userId}`, {
        method: 'GET',
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(getUser(data));
        return response;
    };
};


// get all users
export const getAllUsers = () => async (dispatch) => {
    const response = await csrfFetch(`/api/user`, {
        method: 'GET'
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(getUsers(data));
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
            return [ action.user ]
        case GET_USERS:
            return [ ...action.users ]
        default:
            return state;
    }
}

// Export the reducer
export default viewUserReducer;
