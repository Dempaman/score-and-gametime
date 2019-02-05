import { SEARCH_RESULT, LOADING, SEARCH_RESULT_CLICKED, SEARCH_RESULT_HEAD } from '../actions/SearchActions.js'

const initialState = {
item: [],
items: [],
clicked: {},
loading: true,
}

export default function (state = initialState, action) {
    switch(action.type) {
        case SEARCH_RESULT:
            return {
                ...state,
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
        case SEARCH_RESULT_HEAD:
            return {
                ...state,
                items: action.payload
            }
        default:
            return state;
    }
}
