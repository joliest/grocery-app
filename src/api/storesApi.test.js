import apiInstance from './apiInstance';
import storesApi from './storesApi';

describe('Stores Api', () => {
    describe('get stores', () => {
        const setup = () => {
            jest.spyOn(apiInstance, 'get')
                .mockReturnValueOnce('get stores mock return value');
        };
        it('retrieves all stores', () => {
            setup();
            expect(storesApi.getStores()).toBe('get stores mock return value');
        });
        it('calls get api instance', () => {
            setup();
            storesApi.getStores();
            expect(apiInstance.get).toHaveBeenCalled();
        });
    });
});