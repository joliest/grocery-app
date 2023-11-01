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
});