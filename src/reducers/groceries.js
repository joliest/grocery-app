import * as groceryActions from '../actions/groceries';

const initialState = {
    isSuccess: false,
    hasError: false,
    list: [],
    selectedGrocery: {
        id: null,
        list: [],
    },
};


const groceryReducer = (state = initialState, action) => {
    switch (action.type) {
        case groceryActions.GET_GROCERIES_SUCCESS:
            return {
                ...state,
                isSuccess: true,
                hasError: false,
                list: action.payload,
            };
        case groceryActions.GET_GROCERIES_FAILURE:
            return {
                ...state,
                isSuccess: false,
                hasError: true,
                list: [],
            };
        case groceryActions.ADD_GROCERY_SUCCESS:
            return {
                ...state,
                list: [
                    ...state.list,
                    action.payload,
                ],
            };
        case groceryActions.GET_GROCERY_BY_ID_SUCCESS:
            return {
                ...state,
                selectedGrocery: action.payload,
            };
        case groceryActions.SELECT_GROCERY_ITEM:
            return {
                ...state,
                selectedGrocery: {
                    ...state.selectedGrocery,
                    list: [
                        ...state.selectedGrocery.list,
                        action.payload,
                    ],
                },
            };
        default:
            return state;
    }

}

export default groceryReducer;