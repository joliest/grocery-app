import {testSaga} from 'redux-saga-test-plan';
import {workGetStores} from './stores';
import storesApi from '../api/storesApi';
import {getStoresSuccess} from '../actions/stores';


describe('Stores Saga', () => {
    describe('get stores', () => {
        it('works get stores', () => {
            testSaga(workGetStores)
                .next()
                .call(storesApi.getStores)
                .next({ data: 'stores data'})
                .put(getStoresSuccess('stores data'))
                .next()
                .isDone();
        });
    });
});