import apiInstance from './apiInstance';

const getGroceries = () => {
    return apiInstance.get({
        url: 'http://localhost:8080/v1/groceries',
    });
}

export default {
    getGroceries,
};