import { auth } from '../Firebase.js'
export const GET_USER = 'get_user';
export const RESET_USER = 'reset_user';

var user = auth.currentUser;

export function getUser() {
    return dispatch => {
        auth.onAuthStateChanged((user) => {
            if(user){
                dispatch({
                    type: GET_USER,
                    payload: user,
                })
            }
        })
    };
}

export function login(email, password) {
    return dispatch => auth.signInWithEmailAndPassword(email, password);
}

export function logout() {

    return dispatch => auth.signOut().then(() =>{
        dispatch({
            type: RESET_USER,
        });
    });
}

export function createAccount(email, password) {
    return dispatch => auth.createUserWithEmailAndPassword(email, password);
}
