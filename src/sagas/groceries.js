import {call, put, takeEvery} from 'redux-saga/effects';
import {GET_GROCERIES, getGroceriesSuccess} from '../actions/groceries';
import groceriesApi from '../api/groceriesApi';

const workGetGroceriesFn = () => function* () {
    const groceries = yield call(groceriesApi.getGroceries);
    yield put(getGroceriesSuccess(groceries.data));
}

export const workGetGroceries = workGetGroceriesFn();

export function* getGroceriesWatcher() {
    yield takeEvery(GET_GROCERIES, workGetGroceries);
}

const watchers = [
    getGroceriesWatcher(),
]

export default watchers;