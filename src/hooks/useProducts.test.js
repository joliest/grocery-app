import useProducts from './useProducts';
import productsApi from '../api/productsApi';
import {renderHook} from '@testing-library/react';

const setup = () => {
    jest.spyOn(productsApi, 'getProducts')
        .mockResolvedValue({
            data: 'products',
        });
    const utils = renderHook(() => useProducts());
    return {
        ...utils
    }
};
describe('use products', () => {
    it('returns products', async () => {
        const { result, rerender } = await setup();
        rerender();
        expect(result.current.products).toBe('products');
    });
});