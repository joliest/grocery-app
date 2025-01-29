import {GET_GROCERIES, GET_GROCERIES_SUCCESS, getGroceries, getGroceriesSuccess} from './groceries';

describe('Groceries Action', () => {
    describe('get groceries', () => {
        it('returns action type', () => {
            expect(getGroceries()).toEqual({
                type: GET_GROCERIES,
            });
        });
    });
    describe('get groceries success', () => {
        it('returns action type with payload', () => {
            expect(getGroceriesSuccess('payload')).toEqual({
                type: GET_GROCERIES_SUCCESS,
                payload: 'payload',
            });
        });
    });
});