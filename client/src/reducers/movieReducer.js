import { FETCH_MOVIES, SEARCH_MOVIES } from '../actions/types';

const initialState = {
    homeItems: []
}

export default function (state = initialState, action) {
    console.log('state', state)
    switch (action.type) {
        case FETCH_MOVIES:
            return {
                ...state,
                homeItems: action.payload
            }
        case SEARCH_MOVIES:
            return {
                ...state,
                homeItems: action.payload
            }
        default:
            return state;
    }
}