import groceryReducer from './groceries';
import {ADD_GROCERY_SUCCESS} from '../actions/groceries';


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
                type: ADD_GROCERY_SUCCESS,
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
});