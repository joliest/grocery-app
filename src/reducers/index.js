import { combineReducers } from 'redux';
import groceriesReducer from './groceries';
import storesReducer from './stores';


export default combineReducers({
    groceries: groceriesReducer,
    stores: storesReducer,
});