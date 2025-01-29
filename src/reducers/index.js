import { combineReducers } from 'redux';
import groceriesReducer from './groceries';


export default combineReducers({
    groceries: groceriesReducer,
});