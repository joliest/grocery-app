import apiInstance from './apiInstance';

const getStores = () => {
    return apiInstance.get({
        url: 'http://localhost:8080/v1/stores',
    });
}

export default {
    getStores,
};