import {testSaga} from 'redux-saga-test-plan';
import {workGetGroceries, workGetGroceryById} from './groceries';
import groceriesApi from '../api/groceriesApi';
import {getGroceriesSuccess, getGroceryByIdSuccess} from '../actions/groceries';


describe('Groceries Saga', () => {
    describe('get groceries', () => {
        it('works get groceries', () => {
            testSaga(workGetGroceries)
                .next()
                .call(groceriesApi.getGroceries)
                .next({ data: 'groceries data'})
                .put(getGroceriesSuccess('groceries data'))
                .next()
                .isDone();
        });
    });
    describe('get grocery by id', () => {
        it('works get groceries', () => {
            const action = { payload: 'id' };
            testSaga(workGetGroceryById, action)
                .next()
                .call(groceriesApi.getGroceryById, 'id')
                .next({ data: 'groceries data'})
                .put(getGroceryByIdSuccess('groceries data'))
                .next()
                .isDone();
        });
    });
});