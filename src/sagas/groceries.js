import {call, put, takeEvery, takeLatest} from 'redux-saga/effects';
import {
    GET_GROCERIES,
    GET_GROCERY_BY_ID,
    getGroceriesSuccess,
    getGroceryByIdSuccess
} from '../actions/groceries';
import groceriesApi from '../api/groceriesApi';

export const workGetGroceries = function* () {
    const groceries = yield call(groceriesApi.getGroceries);
    yield put(getGroceriesSuccess(groceries.data));
}

export const workGetGroceryById = function* (action) {
    const grocery = yield call(groceriesApi.getGroceryById, action.payload);
    yield put(getGroceryByIdSuccess(grocery.data));
}

function* getGroceriesWatcher() {
    yield takeEvery(GET_GROCERIES, workGetGroceries);
}

function* getGroceryByIdWatcher() {
    yield takeLatest(GET_GROCERY_BY_ID, workGetGroceryById);
}

const watchers = [
    getGroceriesWatcher(),
    getGroceryByIdWatcher(),
]

export default watchers;