import React, {useState, useEffect} from 'react';
import axios from 'axios';
import UploadCsvButton from './form/inputs/UploadCsvButton';
import UploadCsvPreviewModal from './modals/UploadCsvPreviewModal';
import GenericTable from './subcomponent/GenericTable';

const PRODUCT_HEADER = ['Name', 'Price', 'Store', 'Category', 'Sub Category', 'Reference', 'Date Purchased'];
const buildTable = (products) => {
    if (!products) return [];
    return [
        PRODUCT_HEADER,
        ...products.map((product) => {
            return [
                product?.name,
                product?.price,
                product?.store,
                product?.category,
                product?.subCategory,
                product?.link,
                product?.datePurchased,
            ];
        }),
    ]
};

const ProductTable = () => {
    const [products, setProducts] = useState(null);
    const [csvData, setCsvData] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    useEffect(() => {
        const getProducts = async () => {
            let fetchedProducts = [];
            try {
                fetchedProducts = await axios.get('http://localhost:8080/v1/products')
            } catch (e) {
                console.log(e)
            }
            return fetchedProducts;
        }
        if (!products) {
            getProducts().then((fetchedProducts = {}) => {
                setProducts(fetchedProducts.data);
            });
        }
    }, [products]);

    const handleSetModalOpen = (isOpen) => {
        setModalOpen(isOpen);
    }

    const handleFileChange = (data) => {
        setCsvData(data);
        handleSetModalOpen(true);
    };
    return (
        <>
            <GenericTable data={buildTable(products)} />
            <UploadCsvPreviewModal
                setOpen={handleSetModalOpen}
                open={isModalOpen}
                data={csvData}
            />
            <UploadCsvButton onFileChange={handleFileChange} />
        </>
    );
}

export default ProductTable;