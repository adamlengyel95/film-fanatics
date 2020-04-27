import { FETCH_CARDS } from '../actions/types';

const initialState = {
    data: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_CARDS:
            return {
                ...state,
                data: action.payload
            }
        default:
            return state;
    }
}