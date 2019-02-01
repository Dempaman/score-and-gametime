import { SUBMIT_GAME, SUBMIT_GAME_TIME } from '../actions/SubmitGameActions.js'

const initialState = {
}

export default function (state = initialState, action) {
    switch(action.type) {
        case SUBMIT_GAME:
            return {
                ...state,
                ...action.payload
            }
        case SUBMIT_GAME_TIME:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}
