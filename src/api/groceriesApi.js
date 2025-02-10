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

export default {
    getGroceries,
    getGroceryById,
};