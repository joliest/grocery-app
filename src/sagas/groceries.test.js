import {testSaga} from 'redux-saga-test-plan';
import {workAddGrocery, workGetGroceries, workGetGroceryById} from './groceries';
import groceriesApi from '../api/groceriesApi';
import * as groceryActions from '../actions/groceries';
import HttpStatus from '../constants/httpStatusCodes';


describe('Groceries Saga', () => {
    describe('get groceries', () => {
        describe('works get groceries - success', () => {
            it('puts success action', () => {
                testSaga(workGetGroceries)
                    .next()
                    .call(groceriesApi.getGroceries)
                    .next({
                        data: 'groceries data',
                        status: HttpStatus.OK,
                    })
                    .put(groceryActions.getGroceriesSuccess('groceries data'))
                    .next()
                    .isDone();
            });
        })
        describe('works get groceries - failure', () => {
            it('puts failure action', () => {
                testSaga(workGetGroceries)
                    .next()
                    .call(groceriesApi.getGroceries)
                    .next({
                        data: 'error',
                        status: HttpStatus.INTERNAL_SERVER_ERROR,
                    })
                    .put(groceryActions.getGroceriesFailure())
                    .next()
                    .isDone();
            });
        })
    });
    describe('get grocery by id', () => {
        it('works get groceries', () => {
            const action = { payload: 'id' };
            testSaga(workGetGroceryById, action)
                .next()
                .call(groceriesApi.getGroceryById, 'id')
                .next({ data: 'groceries data'})
                .put(groceryActions.getGroceryByIdSuccess('groceries data'))
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
                },
            };
            testSaga(workAddGrocery, action)
                .next()
                .call(groceriesApi.postGrocery, {
                    name: action.payload.name,
                    description: action.payload.description,
                })
                .next({ data: 'new grocery'})
                .put(groceryActions.addGrocerySuccess('new grocery'))
                .next()
                .isDone();
        });
    });
});