import { combineReducers } from 'redux';
import postReducer from './postReducer';
import UserReducer from './UserReducer';
import SearchResultReducer from './SearchResultReducer';

export default combineReducers({
    posts: postReducer,
    user: UserReducer,
    searchResult: SearchResultReducer,
});
