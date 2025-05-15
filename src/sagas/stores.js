import {call, put, takeEvery} from 'redux-saga/effects';
import {
    GET_STORES,
    getStoresSuccess,
} from '../actions/stores';
import storesApi from '../api/storesApi';

export const workGetStores = function* () {
    const stores = yield call(storesApi.getStores);
    yield put(getStoresSuccess(stores.data));
}

function* getStoresWatcher() {
    yield takeEvery(GET_STORES, workGetStores);
}

const watchers = [
    getStoresWatcher(),
]

export default watchers;