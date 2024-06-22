import apiInstance from './apiInstance';
import productsApi from './productsApi';

describe('Products Api', () => {
    describe('get products', () => {
        const setup = () => {
            jest.spyOn(apiInstance, 'get')
                .mockReturnValueOnce('get products mock return value');
        };
        it('retrieves all products', () => {
            setup();
            expect(productsApi.getProducts()).toBe('get products mock return value');
        });
        it('calls get api instance', () => {
            setup();
            productsApi.getProducts();
            expect(apiInstance.get).toHaveBeenCalled();
        });
    });
    describe('post products', () => {
        const products = 'products';
        const setup = () => {
            jest.spyOn(apiInstance, 'post')
                .mockReturnValueOnce('post products mock return value');
        };
        it('retrieves all products', () => {
            setup();
            expect(productsApi.postProducts(products)).toBe('post products mock return value');
        });
        it('calls get api instance', () => {
            setup();
            productsApi.postProducts(products);
            expect(apiInstance.post).toHaveBeenCalledWith({
                url: 'http://localhost:8080/v1/products/import',
                body: products,
            });
        });
    });
});