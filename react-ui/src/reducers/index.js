import { combineReducers } from 'redux';
import postReducer from './postReducer';
import UserReducer from './UserReducer';
import SearchResultReducer from './SearchResultReducer';
import SubmitGameReducer from './SubmitGameReducer.js';

export default combineReducers({
    posts: postReducer,
    user: UserReducer,
    searchResult: SearchResultReducer,
    submitGame: SubmitGameReducer,
});
