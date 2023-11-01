import React, { useState } from 'react';
import UploadCsvButton from './form/inputs/UploadCsvButton';
import UploadCsvPreviewModal from './modals/UploadCsvPreviewModal';
import GenericTable from './subcomponent/GenericTable';
import useProducts from '../hooks/useProducts';

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
    const [csvData, setCsvData] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const { products } = useProducts();

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