import groceryReducer from './groceries';
import * as groceryActions from '../actions/groceries';


describe('Groceries Reducer', () => {
    describe('ADD_GROCERY_SUCCESS', () => {
        it('pushes new grocery list from the payload', () => {
            const initialState = {
                isSuccess: false,
                list: [
                    {
                        id: 'id 1',
                        name: 'name 1',
                        description: 'description 1',
                    },
                ],
            };

            const action = {
                type: groceryActions.ADD_GROCERY_SUCCESS,
                payload: {
                    id: 'id 2',
                    name: 'name 2',
                    description: 'description 2',
                },
            }

            const expected = groceryReducer(initialState, action);
            expect(expected).toEqual({
                isSuccess: false,
                list: [
                    {
                        id: 'id 1',
                        name: 'name 1',
                        description: 'description 1',
                    }, {
                        id: 'id 2',
                        name: 'name 2',
                        description: 'description 2',
                    },
                ],
            })
        });
    });
    describe('GET_GROCERIES_SUCCESS', () => {
        it('sets status and populates list', () => {
            const initialState = {
                isSuccess: false,
                hasError: false,
                list: [],
            };

            const action = {
                type: groceryActions.GET_GROCERIES_SUCCESS,
                payload: [{
                    id: 'id 1',
                    name: 'name 1',
                    description: 'description 1',
                }],
            }

            const expected = groceryReducer(initialState, action);
            expect(expected).toEqual({
                isSuccess: true,
                hasError: false,
                list: [{
                    id: 'id 1',
                    name: 'name 1',
                    description: 'description 1',
                }],
            })
        });
    });
    describe('GET_GROCERY_BY_ID_FAILURE', () => {
        it('sets status and clears the list', () => {
            const initialState = {
                isSuccess: true,
                hasError: false,
                list: [{
                    id: 'id 1',
                    name: 'name 1',
                    description: 'description 1',
                }],
            };

            const action = {
                type: groceryActions.GET_GROCERIES_FAILURE,
            }

            const expected = groceryReducer(initialState, action);
            expect(expected).toEqual({
                isSuccess: false,
                hasError: true,
                list: [],
            })
        });
    });
    describe('SELECT_GROCERY_ITEM', () => {
        it('pushes payload to the list', () => {
            const initialState = {
                isSuccess: true,
                hasError: false,
                selectedGrocery: {
                    list: [{
                        id: 'id 1',
                        name: 'name 1',
                        description: 'description 1',
                    }],
                },
            };

            const action = {
                type: groceryActions.SELECT_GROCERY_ITEM,
                payload: {
                    id: 'id 2',
                    name: 'name 2',
                    description: 'description 2',
                },
            }

            const expected = groceryReducer(initialState, action);
            expect(expected).toEqual({
                isSuccess: true,
                hasError: false,
                selectedGrocery: {
                    list: [{
                        id: 'id 1',
                        name: 'name 1',
                        description: 'description 1',
                    }, {
                        id: 'id 2',
                        name: 'name 2',
                        description: 'description 2',
                    }],
                },
            })
        });
    });
});