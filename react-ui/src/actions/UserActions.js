import { auth } from '../Firebase.js';
import axios from 'axios';
export const GET_USER = 'get_user';
export const RESET_USER = 'reset_user';

//const PORT = process.env.PORT || 'http://localhost:5000';

export function getUser() {
    return dispatch => {
        auth.onAuthStateChanged((user) => {
            if(user){
                axios({
                    url: `/api/create_user?uid=${user.uid}&email=${user.email}&displayName=${user.displayName}&photoURL=${user.photoURL}`,
                    method: 'PUT',
                })
                .then(res => {
                    if (res) {
                        dispatch({
                            type: GET_USER,
                            payload: user,
                        })
                    }
                })
                .catch(err => {
                    console.error(err);
                });

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
