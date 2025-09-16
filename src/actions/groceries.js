export const GET_GROCERIES = 'GET_GROCERIES';
export const GET_GROCERIES_SUCCESS = 'GET_GROCERIES_SUCCESS';
export const GET_GROCERIES_FAILURE = 'GET_GROCERIES_FAILURE';

export const GET_GROCERY_BY_ID = 'GET_GROCERY_BY_ID';
export const GET_GROCERY_BY_ID_SUCCESS = 'GET_GROCERY_BY_ID_SUCCESS';

export const ADD_GROCERY = 'ADD_GROCERY';
export const ADD_GROCERY_SUCCESS = 'ADD_GROCERY_SUCCESS';

export const SELECT_GROCERY_ITEM = 'SELECT_GROCERY_ITEM';
export const UPDATE_SELECTED_GROCERY_ITEM = 'UPDATE_SELECTED_GROCERY_ITEM';
export const ADD_SELECTED_GROCERY_ITEM = 'ADD_SELECTED_GROCERY_ITEM';

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
    name, description = '',
}) => {
    return {
        type: ADD_GROCERY,
        payload: {
            name, description,
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
    quantity = 0,
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
            quantity,
            estimatedPrice,
            actualPrice,
            store,
        },
    };
}

export const addSelectedGroceryItem = (payload) => {
    return {
        type: ADD_SELECTED_GROCERY_ITEM, payload,
    }
}


/**
 * {
 *     "quantity": 1,
 *     "notes": "Notes 1",
 *     "actualPrice": 100,
 *     "estimatedPrice": 0,
 *     "productId": 3,
 *     "storeId": 1
 * }
 */
// export const addGroceryItem = ({
//     quantity = 0,
//     notes,
//     actualPrice = 0,
//     estimatedPrice = 0,
//     productId = null,
//     storeId = null,
// }) => {
//     return {
//         type: ADD_GROCERY_ITEM,
//         payload: {
//             quantity,
//             notes,
//             actualPrice,
//             estimatedPrice,
//             productId,
//             storeId,
//         }
//     }
// }

export const updateSelectedGroceryItem = (payload) => {
    return {
        type: UPDATE_SELECTED_GROCERY_ITEM, payload,
    }
}
