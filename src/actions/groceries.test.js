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
    describe('get groceries failure', () => {
        it('returns action type', () => {
            expect(groceryActions.getGroceriesFailure()).toEqual({
                type: groceryActions.GET_GROCERIES_FAILURE,
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
    describe('add grocery', () => {
        it('returns action type', () => {
            const payload = {
                name: 'Name',
                description: 'Description',
                storeId: 'Store ID',
            }
            expect(groceryActions.addGrocery(payload)).toEqual({
                type: groceryActions.ADD_GROCERY, payload,
            });
        });
    });
    describe('add grocery success', () => {
        it('returns action type with payload', () => {
            expect(groceryActions.addGrocerySuccess('new grocery')).toEqual({
                type: groceryActions.ADD_GROCERY_SUCCESS,
                payload: 'new grocery',
            });
        });
    });
});