import { SEARCH_RESULT, LOADING } from '../actions/SearchActions.js'

const initialState = {
item: [],
loading: true,
}

export default function (state = initialState, action) {
    switch(action.type) {
        case SEARCH_RESULT:
            return {
                item: action.payload
            }
        case LOADING:
            return {
                ...state,
                loading: action.payload
            }
        default:
            return state;
    }
}
