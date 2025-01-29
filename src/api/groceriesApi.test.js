import apiInstance from './apiInstance';
import groceriesApi from './groceriesApi';

describe('Groceries Api', () => {
    describe('get groceries', () => {
        const setup = () => {
            jest.spyOn(apiInstance, 'get')
                .mockReturnValueOnce('get groceries mock return value');
        };
        it('retrieves all groceries', () => {
            setup();
            expect(groceriesApi.getGroceries()).toBe('get groceries mock return value');
        });
        it('calls get api instance', () => {
            setup();
            groceriesApi.getGroceries();
            expect(apiInstance.get).toHaveBeenCalled();
        });
    });
});