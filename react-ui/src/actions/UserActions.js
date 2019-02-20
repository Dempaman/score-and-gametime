import { auth } from '../Firebase.js';
import axios from 'axios';
export const GET_USER = 'get_user';
export const RESET_USER = 'reset_user';
export const GET_USER_FROM_MONGO = 'get_user_from_mongo';

export function getUser(name) {
    return dispatch => {
        auth.onAuthStateChanged((user) => {
            if(user){

                user.updateProfile({
                    displayName: name
                }).then(function() {
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

                }, function(error) {
                // An error happened.
                });

            }
        })
    };
}
export function getUserFromMongo(name) {
    return dispatch => {
        auth.onAuthStateChanged((user) => {
            if(user){
                axios({
                    url: `/profile?uid=${user.uid}`,
                    method: 'GET',
                })
                .then(res => {
                    if (res) {
                        dispatch({
                            type: GET_USER_FROM_MONGO,
                            payload: res.data,
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
