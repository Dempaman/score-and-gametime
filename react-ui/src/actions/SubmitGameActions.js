export const SUBMIT_GAME = 'SUBMIT_GAME';
export const SUBMIT_GAME_TIME = 'SUBMIT_GAME_TIME';

export function submitGame(data) {
    return dispatch => {
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
