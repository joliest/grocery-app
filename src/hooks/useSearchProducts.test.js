import useProducts from './useProducts';
import productsApi from '../api/productsApi';
import {act, renderHook, waitFor} from '@testing-library/react';
import useSearchProducts from './useSearchProducts';

const MOCK_SEARCH_PRODUCTS = [
    {
        id: 723,
        name: 'Red Bell Pepper',
        category: 'Food',
        subcategory: 'Vegetable',
        purchaseHistoryList: [
            {
                id: 1024,
                price: 19,
                datePurchased: '05-17-2025',
                link: 'No Receipt',
                store: 'N/A'
            }
        ]
    }
];

const mockSuccess = () => {
    jest.spyOn(productsApi, 'searchProducts')
        .mockResolvedValue({
            data: MOCK_SEARCH_PRODUCTS,
        });
};

const mockFailure = () => {
    jest.spyOn(productsApi, 'searchProducts')
        .mockRejectedValue('error');
};

const setup = () => {
    const utils = renderHook(() => useSearchProducts());
    return {
        ...utils,
    }
};
describe('use products', () => {
    it('returns list of products', async () => {
        mockSuccess();
        const { result } = setup();
        result.current.searchProducts('Red');
        await waitFor(() => {
            expect(result.current.products).toEqual([
                {
                    actualPrice: 19,
                    product: {
                        id: 723,
                        name: 'Red Bell Pepper',
                        category: 'Food',
                        subcategory: 'Vegetable',
                    },
                    store: {
                        name: 'N/A',
                    },
                },
            ]);
        });
    });
    it('returns empty products', async () => {
        mockFailure();
        const { result } = setup();
        result.current.searchProducts('Red');
        await act(async () => {
            await expect(result.current.products).toEqual([]);
        });
    });
});