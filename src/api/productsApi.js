import apiInstance from './apiInstance';

const getProducts = () => {
    return apiInstance.get({
        url: 'http://localhost:8080/v1/products',
    });
}
const postProducts = (products) => {
    const body = { products };
    return apiInstance.post({
        url: 'http://localhost:8080/v1/products', body,
    });
}

export default {
    getProducts,
    postProducts,
};