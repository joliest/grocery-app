import {call, put, takeEvery, takeLatest} from 'redux-saga/effects';
import * as groceryActions from '../actions/groceries';
import groceriesApi from '../api/groceriesApi';
import HttpStatus from '../constants/httpStatusCodes';

export const workGetGroceries = function* () {
    const groceries = yield call(groceriesApi.getGroceries);
    if (groceries.status === HttpStatus.OK) {
        return yield put(groceryActions.getGroceriesSuccess(groceries.data));
    }
    yield put(groceryActions.getGroceriesFailure());
}

export const workGetGroceryById = function* (action) {
    const grocery = yield call(groceriesApi.getGroceryById, action.payload);
    yield put(groceryActions.getGroceryByIdSuccess(grocery.data));
}

export const workAddGrocery = function* (action) {
    const { name, description = '' } = action.payload;
    const groceryToSave = { name, description };
    const savedGrocery = yield call(groceriesApi.postGrocery, groceryToSave);
    yield put(groceryActions.addGrocerySuccess(savedGrocery.data));
}

function* getGroceriesWatcher() {
    yield takeEvery(groceryActions.GET_GROCERIES, workGetGroceries);
}

function* getGroceryByIdWatcher() {
    yield takeLatest(groceryActions.GET_GROCERY_BY_ID, workGetGroceryById);
}

function* addGroceryWatcher() {
    yield takeLatest(groceryActions.ADD_GROCERY, workAddGrocery);
}

const watchers = [
    getGroceriesWatcher(),
    getGroceryByIdWatcher(),
    addGroceryWatcher(),
]

export default watchers;