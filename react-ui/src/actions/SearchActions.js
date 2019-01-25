export const SEARCH_RESULT = 'SEARCH_RESULT';
export const LOADING = 'LOADING';

export function searchResult(searchResult) {
    return dispatch => {
                dispatch({
                    type: SEARCH_RESULT,
                    payload: searchResult,
                })
    };
}
export function loading(setBool) {
    return dispatch => {
                dispatch({
                    type: LOADING,
                    payload: setBool,
                })
    };
}
