import { FETCH_MOVIES, SEARCH_MOVIES } from '../actions/types';

const initialState = {
    items: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_MOVIES:
            return {
                ...state,
                items: action.payload
            }
        case SEARCH_MOVIES:
            return {
                ...state,
                items: action.payload
            }
        default:
            return state;
    }
}