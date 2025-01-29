import {all} from 'redux-saga/effects';

import groceries from './groceries';


export default function* rootSaga() {
    yield all([
        ...groceries,
    ]);
}