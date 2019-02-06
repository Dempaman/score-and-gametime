import axios from 'axios';

export const SUBMIT_GAME = 'SUBMIT_GAME';
export const SUBMIT_GAME_TIME = 'SUBMIT_GAME_TIME';

const PORT = process.env.PORT || 'http://localhost:5000';

export function submitGame(data, uid) {
    return dispatch => {
        console.log(data)
        console.log(uid)
        axios({
            url: `/api/submitgame?uid=${uid}`,
            method: 'PUT',
            data: data
        })
        .then(res => {
            console.log(res);

        })
        .catch(err => {
            console.error(err);
        });

        dispatch({
            type: SUBMIT_GAME,
            payload: data,
        })
    };
}
export function submitGameTime(data) {
    return dispatch => {
                dispatch({
                    type: SUBMIT_GAME_TIME,
                    payload: data,
                })
    };
}
