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
        case groceryActions.ADD_SELECTED_GROCERY_ITEM:
            return {
                ...state,
                selectedGrocery: {
                    ...state.selectedGrocery,
                    list: [
                        action.payload,
                        ...state.selectedGrocery.list,
                    ],
                },
            };
        case groceryActions.UPDATE_SELECTED_GROCERY_ITEM:
            const selectedGroceryList = JSON.parse(JSON.stringify(state.selectedGrocery.list));
            const updatedGroceryList = selectedGroceryList.map((item) => {
                if (item.id === action.payload.id) {
                    return {
                        ...item,
                        ...action.payload,
                    };
                }
                return item;
            });
            return {
                ...state,
                selectedGrocery: {
                    ...state.selectedGrocery,
                    list: updatedGroceryList,
                },
            };
        default:
            return state;
    }

}

export default groceryReducer;