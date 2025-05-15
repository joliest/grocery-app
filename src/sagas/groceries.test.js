import {testSaga} from 'redux-saga-test-plan';
import {workAddGrocery, workGetGroceries, workGetGroceryById} from './groceries';
import groceriesApi from '../api/groceriesApi';
import {addGrocerySuccess, getGroceriesSuccess, getGroceryByIdSuccess} from '../actions/groceries';


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
    describe('add grocery', () => {
        it('works adding a grocery', () => {
            const action = {
                payload: {
                    name: 'Name',
                    description: '',
                    storeId: 1,
                },
            };
            testSaga(workAddGrocery, action)
                .next()
                .call(groceriesApi.postGrocery, {
                    name: action.payload.name,
                    description: action.payload.description,
                    storeId: action.payload.storeId,
                })
                .next({ data: 'new grocery'})
                .put(addGrocerySuccess('new grocery'))
                .next()
                .isDone();
        });
    });
});