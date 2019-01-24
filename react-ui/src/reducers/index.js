import { combineReducers } from 'redux';
import postReducer from './postReducer';
import UserReducer from './UserReducer';

export default combineReducers({
    posts: postReducer,
    user: UserReducer,
});
