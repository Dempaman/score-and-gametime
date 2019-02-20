import { GET_USER, RESET_USER, GET_USER_FROM_MONGO } from '../actions/UserActions'

export default function (state = { loading: false }, action) {
    switch(action.type) {
        case GET_USER:
            return {
                ...state,
                loading: false,
                email: action.payload.email,
                displayName:  action.payload.displayName,
                uid: action.payload.uid,
                photoURL: action.payload.photoURL
            }
        case RESET_USER:
            return {
                loading: false
            }
        case GET_USER_FROM_MONGO:
            return {
                ...state,
                profile: action.payload
            }
        default:
            return state;
    }
}
