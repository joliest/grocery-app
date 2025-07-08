import * as groceryActions from './groceries';
import {selectGroceryItem} from './groceries';

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
    describe('select grocery item', () => {
        it('returns action type with payload', () => {
            const payload = {
                id: 'id',
                category: 'category',
                subcategory: 'subcategory',
                actualPrice: 0,
                estimatedPrice: 0,
                product: {
                    name: 'product',
                },
                store: {
                    name: 'store',
                },
            };
            expect(groceryActions.selectGroceryItem(payload))
                .toEqual({
                    type: groceryActions.SELECT_GROCERY_ITEM,
                    payload,
                });
        });
    });
});