import {testSaga} from 'redux-saga-test-plan';
import {workGetGroceries} from './groceries';
import groceriesApi from '../api/groceriesApi';
import {getGroceriesSuccess} from '../actions/groceries';


describe('workGetGroceries', () => {
    it('puts groceries data', () => {
        testSaga(workGetGroceries)
            .next()
            .call(groceriesApi.getGroceries)
            .next({ data: 'groceries data'})
            .put(getGroceriesSuccess('groceries data'))
            .next()
            .isDone();
    });
});