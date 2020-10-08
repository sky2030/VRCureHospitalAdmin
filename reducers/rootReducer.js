import { combineReducers } from 'redux';
import { doctorReducer } from './doctorReducer';
import { deptReducer } from './deptReducer';

export default combineReducers({
    doctorReducer,
    deptReducer
});