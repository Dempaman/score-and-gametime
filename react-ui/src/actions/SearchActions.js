import axios from 'axios';

export const SEARCH_RESULT = 'SEARCH_RESULT';
export const SEARCH_RESULT_CLICKED = 'SEARCH_RESULT_CLICKED'
export const SEARCH_RESULT_HEAD = 'SEARCH_RESULT_HEAD';
export const SEARCH_RESULT_NAME_HEAD = 'SEARCH_RESULT_NAME_HEAD';
export const LOADING = 'LOADING';

const PORT = process.env.PORT || 'http://localhost:5000';


export function searchResult(searchResult) {
    return dispatch => {
                dispatch({
                    type: SEARCH_RESULT,
                    payload: searchResult,
                })
    };
}
export function searchResultHead(searchData) {
    return dispatch => {
            axios({
                url: `/api/searchresult`,
                method: 'GET',
            })
            .then(res => {
                dispatch({
                    type: SEARCH_RESULT_HEAD,
                    payload: res.data,
                })
            })
            .catch(err => {
                console.error(err);
            });
    };
}

export function searchResultNameHead(searchData) {
    return dispatch => {
        dispatch({
            type: SEARCH_RESULT_NAME_HEAD,
            payload: searchData,
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
export function searchResultClicked(clicked) {
    return dispatch => {
                dispatch({
                    type: SEARCH_RESULT_CLICKED,
                    payload: clicked,
                })
    };
}
