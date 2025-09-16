import apiInstance from './apiInstance';

const getGroceries = () => {
    return apiInstance.get({
        url: 'http://localhost:8080/v1/groceries',
    });
}

const getGroceryById = (id) => {
    return apiInstance.get({
        url: `http://localhost:8080/v1/groceries/${id}`,
    });
}

const postGrocery = (params) => {
    const  { name, description = '' } = params;
    return apiInstance.post({
        url: `http://localhost:8080/v1/groceries`,
        body: { name, description },
    });
}
const postGroceryItem = (groceryId, params) => {
    const {
        quantity,
        notes,
        actualPrice,
        estimatedPrice,
        productId,
        storeId
    } = params;
    return apiInstance.post({
        url: `http://localhost:8080/v1/groceries/${groceryId}/item`,
        body: {
            quantity,
            notes,
            actualPrice,
            estimatedPrice,
            productId,
            storeId
        },
    });
}
const putGroceryItem = (groceryId, params) => {
    const {
        quantity,
    } = params;
    return apiInstance.put({
        url: `http://localhost:8080/v1/groceries/item/${groceryId}`,
        body: {
            quantity,
        },
    });
}

export default {
    getGroceries,
    getGroceryById,
    postGrocery,
    postGroceryItem,
    putGroceryItem,
};