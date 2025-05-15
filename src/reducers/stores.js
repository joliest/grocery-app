import {
    GET_STORES_SUCCESS,
} from '../actions/stores';

const initialState = {
    isSuccess: false,
    list: [],
};


const storesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_STORES_SUCCESS:
            return {
                ...state,
                isSuccess: true,
                list: action.payload,
            };
        default:
            return state;
    }

}

export default storesReducer;