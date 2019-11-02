import { combineReducers } from 'redux';
import posts from './posts';
import region from './regions';

export default combineReducers({
    posts,
    region
})