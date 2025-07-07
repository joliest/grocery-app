export const GET_GROCERIES = 'GET_GROCERIES';
export const GET_GROCERIES_SUCCESS = 'GET_GROCERIES_SUCCESS';
export const GET_GROCERIES_FAILURE = 'GET_GROCERIES_FAILURE';

export const GET_GROCERY_BY_ID = 'GET_GROCERY_BY_ID';
export const GET_GROCERY_BY_ID_SUCCESS = 'GET_GROCERY_BY_ID_SUCCESS';

export const ADD_GROCERY = 'ADD_GROCERY';
export const ADD_GROCERY_SUCCESS = 'ADD_GROCERY_SUCCESS';

export const SELECT_GROCERY_ITEM = 'SELECT_GROCERY_ITEM';

export const getGroceries = () => {
    return {
        type: GET_GROCERIES,
    }
}

export const getGroceriesSuccess = (groceries) => {
    return {
        type: GET_GROCERIES_SUCCESS,
        payload: groceries,
    }
}
export const getGroceriesFailure = () => {
    return {
        type: GET_GROCERIES_FAILURE,
    }
}

export const getGroceryById = (id) => {
    return {
        type: GET_GROCERY_BY_ID,
        payload: id,
    }
}

export const getGroceryByIdSuccess = (grocery) => {
    return {
        type: GET_GROCERY_BY_ID_SUCCESS,
        payload: grocery,
    }
}

export const addGrocery = ({
    name, storeId, description = '',
}) => {
    return {
        type: ADD_GROCERY,
        payload: {
            name, description, storeId,
        }
    }
}

export const addGrocerySuccess = (payload) => {
    return {
        type: ADD_GROCERY_SUCCESS, payload,
    }
}

export const selectGroceryItem = ({
    id,
    category,
    subcategory,
    actualPrice = 0,
    estimatedPrice = 0,
    product = {},
    store = {},
}) => {
    return {
        type: SELECT_GROCERY_ITEM,
        payload: {
            id,
            product,
            category,
            subcategory,
            estimatedPrice,
            actualPrice,
            store,
        },
    };
}

