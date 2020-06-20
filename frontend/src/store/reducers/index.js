import { combineReducers } from 'redux';

import employeeReducer from './employeeReducer';
import authReducer from './authReducer';

export default combineReducers({
    employee: employeeReducer,
    auth: authReducer
});