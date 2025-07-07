import apiInstance from './apiInstance';

const BASE_URL = 'http://localhost:8080/v1/products';

const getProducts = (urlWithParams) => {
    const url = urlWithParams || BASE_URL;
    return apiInstance.get({ url });
}
const postProducts = (products = []) => {
    const body = products;
    return apiInstance.post({
        url: `${BASE_URL}/import`, body,
    });
}

const searchProducts = (search) => {
    const url = new URL(BASE_URL);
    url.searchParams.set('search', search);
    return getProducts(url.toString());
}

export default {
    getProducts,
    postProducts,
    searchProducts,
};