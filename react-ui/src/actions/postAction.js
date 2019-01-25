import { FETCH_POSTS, NEW_POSTS } from './types';
import games from './fakedata';

export const fetchPosts = () => dispatch => {
    /*
    axios({
        url: "https://cors-anywhere.herokuapp.com/https://api-v3.igdb.com/games/?fields=name,genres.name,cover.url,popularity&order=popularity:desc&expand=genres.name",
        method: 'GET',
        data: "fields alpha_channel,animated,height,image_id,url,width;"
    })
    .then(res => {
        console.log(res.data);
        dispatch({
            type: FETCH_POSTS,
            payload: res.data
        })
    })
    .catch(err => {
        console.error(err);
    });*/

    dispatch({
        type: FETCH_POSTS,
        payload: games
    })
};

export const createPost = (postData) => dispatch => {
    dispatch({
        type: NEW_POSTS,
        payload: postData
    })
};
