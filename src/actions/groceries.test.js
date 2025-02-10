import * as groceryActions from './groceries';

describe('Groceries Action', () => {
    describe('get groceries', () => {
        it('returns action type', () => {
            expect(groceryActions.getGroceries()).toEqual({
                type: groceryActions.GET_GROCERIES,
            });
        });
    });
    describe('get groceries success', () => {
        it('returns action type with payload', () => {
            expect(groceryActions.getGroceriesSuccess('payload')).toEqual({
                type: groceryActions.GET_GROCERIES_SUCCESS,
                payload: 'payload',
            });
        });
    });
    describe('get grocery by id', () => {
        it('returns action type with payload', () => {
            expect(groceryActions.getGroceryById('id')).toEqual({
                type: groceryActions.GET_GROCERY_BY_ID,
                payload: 'id',
            });
        });
    });
    describe('get grocery by id success', () => {
        it('returns action type with payload', () => {
            expect(groceryActions.getGroceryByIdSuccess('grocery')).toEqual({
                type: groceryActions.GET_GROCERY_BY_ID_SUCCESS,
                payload: 'grocery',
            });
        });
    });
});