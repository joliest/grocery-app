export const GET_GROCERIES = 'GET_GROCERIES';
export const GET_GROCERIES_SUCCESS = 'GET_GROCERIES_SUCCESS';

export const GET_GROCERY_BY_ID = 'GET_GROCERY_BY_ID';
export const GET_GROCERY_BY_ID_SUCCESS = 'GET_GROCERY_BY_ID_SUCCESS';

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