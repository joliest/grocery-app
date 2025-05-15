import {all} from 'redux-saga/effects';

import groceries from './groceries';
import stores from './stores';


export default function* rootSaga() {
    yield all([
        ...groceries,
        ...stores,
    ]);
}