export const GET_STORES = 'GET_STORES';
export const GET_STORES_SUCCESS = 'GET_STORES_SUCCESS';

export const getStores = () => {
    return {
        type: GET_STORES,
    }
}

export const getStoresSuccess = (groceries) => {
    return {
        type: GET_STORES_SUCCESS,
        payload: groceries,
    }
}