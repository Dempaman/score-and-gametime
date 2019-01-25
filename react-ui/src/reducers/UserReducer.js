import { GET_USER, RESET_USER } from '../actions/UserActions'

export default function (state = { loading: true }, action) {
    switch(action.type) {
        case GET_USER:
            return {
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
        default:
            return state;
    }
}
