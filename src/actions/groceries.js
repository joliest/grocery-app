export const GET_GROCERIES = 'GET_GROCERIES';
export const GET_GROCERIES_SUCCESS = 'GET_GROCERIES_SUCCESS';

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