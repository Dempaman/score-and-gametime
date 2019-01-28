import { SEARCH_RESULT, LOADING, SEARCH_RESULT_CLICKED } from '../actions/SearchActions.js'

const initialState = {
item: [],
clicked: {},
loading: true,
}

export default function (state = initialState, action) {
    switch(action.type) {
        case SEARCH_RESULT:
            return {
                item: action.payload
            }
        case SEARCH_RESULT_CLICKED:
            return {
                ...state,
                clicked: action.payload
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
