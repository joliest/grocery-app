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

const postGrocery = (body) => {
    return apiInstance.post({
        url: `http://localhost:8080/v1/groceries`,
        body: {
            ...body,
            storeId: 1,
        },
    });
}

export default {
    getGroceries,
    getGroceryById,
    postGrocery,
};