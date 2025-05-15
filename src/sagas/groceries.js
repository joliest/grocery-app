import {call, put, takeEvery, takeLatest} from 'redux-saga/effects';
import {
    ADD_GROCERY,
    GET_GROCERIES,
    GET_GROCERY_BY_ID,
    getGroceriesSuccess,
    getGroceryByIdSuccess,
    addGrocerySuccess,
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

export const workAddGrocery = function* (action) {
    const { name, description = '', storeId } = action.payload;
    const groceryToSave = { name, description, storeId };
    const savedGrocery = yield call(groceriesApi.postGrocery, groceryToSave);
    yield put(addGrocerySuccess(savedGrocery.data));
}

function* getGroceriesWatcher() {
    yield takeEvery(GET_GROCERIES, workGetGroceries);
}

function* getGroceryByIdWatcher() {
    yield takeLatest(GET_GROCERY_BY_ID, workGetGroceryById);
}

function* addGroceryWatcher() {
    yield takeLatest(ADD_GROCERY, workAddGrocery);
}

const watchers = [
    getGroceriesWatcher(),
    getGroceryByIdWatcher(),
    addGroceryWatcher(),
]

export default watchers;