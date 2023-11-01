import {useState, useEffect} from 'react';
import productsApi from '../api/productsApi';

const useProducts = () => {
    const [products, setProducts] = useState(null);
    useEffect(() => {
        if (!products) {
            productsApi
                .getProducts()
                .then((fetchedProducts = {}) => {
                    setProducts(fetchedProducts.data);
                });
        }
    }, [products]);
    return {
        products,
    }
}

export default useProducts;