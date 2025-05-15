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
    const  { name, description = '', storeId } = params;
    return apiInstance.post({
        url: `http://localhost:8080/v1/groceries`,
        body: { name, description, storeId },
    });
}

export default {
    getGroceries,
    getGroceryById,
    postGrocery,
};