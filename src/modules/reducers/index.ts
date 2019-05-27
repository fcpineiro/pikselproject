import { combineReducers } from 'redux';
import contents from './contents';
import settings from './settings';

export default combineReducers({
    contents,
    settings,
});