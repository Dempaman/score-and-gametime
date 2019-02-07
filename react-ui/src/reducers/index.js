import { combineReducers } from 'redux';
import UserReducer from './UserReducer';
import SearchResultReducer from './SearchResultReducer';
import SubmitGameReducer from './SubmitGameReducer.js';

export default combineReducers({
    user: UserReducer,
    searchResult: SearchResultReducer,
    submitGame: SubmitGameReducer,
});
