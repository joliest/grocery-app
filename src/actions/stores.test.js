import * as storeActions from './stores';

describe('Store Action', () => {
    describe('get store', () => {
        it('returns action type', () => {
            expect(storeActions.getStores()).toEqual({
                type: storeActions.GET_STORES,
            });
        });
    });
    describe('get store success', () => {
        it('returns action type with payload', () => {
            expect(storeActions.getStoresSuccess('payload')).toEqual({
                type: storeActions.GET_STORES_SUCCESS,
                payload: 'payload',
            });
        });
    });
});