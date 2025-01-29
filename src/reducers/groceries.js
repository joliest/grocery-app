import {GET_GROCERIES_SUCCESS} from '../actions/groceries';

const initialState = {
    isSuccess: false,
    list: [],
};


const groceryReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_GROCERIES_SUCCESS:
            return {
                isSuccess: true,
                list: action.payload,
            };
        default:
            return state;
    }

}

export default groceryReducer;