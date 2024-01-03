import React, { useState } from 'react';
import UploadCsvButton from './form/inputs/UploadCsvButton';
import UploadCsvPreviewModal from './modals/UploadCsvPreviewModal';
import GenericTable from './subcomponent/GenericTable';
import useProducts from '../hooks/useProducts';
import csvHelper from '../helpers/csvHelper';
import {productMap} from '../constants/keyNames';
import productsApi from '../api/productsApi';

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
                product?.subcategory,
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

    const handleOnSave = () => {
        const productsFromCsv = csvHelper.convertCsvToJs(csvData, productMap);
        productsApi.postProducts(productsFromCsv)
            .then(() => {
                window.location.reload();
            });
    }

    return (
        <>
            <GenericTable data={buildTable(products)} />
            <UploadCsvPreviewModal
                setOpen={handleSetModalOpen}
                open={isModalOpen}
                data={csvData}
                onSave={handleOnSave}
            />
            <UploadCsvButton onFileChange={handleFileChange} />
        </>
    );
}

export default ProductTable;