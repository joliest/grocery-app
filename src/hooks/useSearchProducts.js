import {useState} from 'react';
import productsApi from '../api/productsApi';

const transformProductToGroceryItem = (product) => {
    const recentPurchase = product.purchaseHistoryList.length
        ? product.purchaseHistoryList[0]
        : {};
    return ({
        actualPrice: recentPurchase.price,
        product: {
            id: product.id,
            name: product.name,
            category: product.category,
            subcategory: product.subcategory,
        },
        store: {
            name: recentPurchase.store,
        },
    });
}

const useSearchProducts = () => {
    const [products, setProducts] = useState([]);
    const searchProducts = (value) => {
        productsApi.searchProducts(value)
            .then(response => {
                const transformedToGroceryItemListResponse = response
                    .data?.map(transformProductToGroceryItem) || [];
                setProducts(transformedToGroceryItemListResponse);
            })
            .catch(error => {
                setProducts([]);
                console.log(error)
            });
    }


    return {
        products,
        searchProducts,
    }
}

export default useSearchProducts;