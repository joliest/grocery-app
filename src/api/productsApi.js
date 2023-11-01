import apiInstance from './apiInstance';

const getProducts = () => {
    return apiInstance.get({
        url: 'http://localhost:8080/v1/products',
    });
}

export default {
    getProducts,
};