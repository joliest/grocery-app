import {GET_GROCERIES_SUCCESS, GET_GROCERY_BY_ID_SUCCESS} from '../actions/groceries';

const initialState = {
    isSuccess: false,
    list: [],
    selectedGrocery: {
        id: null,
    },
};


const groceryReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_GROCERIES_SUCCESS:
            return {
                ...state,
                isSuccess: true,
                list: action.payload,
            };
        case GET_GROCERY_BY_ID_SUCCESS:
            return {
                ...state,
                selectedGrocery: action.payload,
            };
        default:
            return state;
    }

}

export default groceryReducer;