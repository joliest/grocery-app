import GenericDataGrid from '../subcomponent/GenericDataGrid';

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'name',
        headerName: 'Product Name',
        width: 150,
        editable: true,
    },
    {
        field: 'category',
        headerName: 'Category',
        width: 150,
        editable: true,
    },
    {
        field: 'actualPrice',
        headerName: 'Recent price',
        type: 'number',
        width: 110,
        editable: false,
        valueGetter: (value, row) => `₱${value}`,
    },
    // {
    //     field: 'quantity',
    //     headerName: 'Quantity',
    //     type: 'number',
    //     width: 110,
    //     editable: false,
    //     valueGetter: (value, row) =>  {
    //         console.log(value)
    //         console.log(row)
    //     },
    // },
    {
        field: 'subcategory',
        headerName: 'Subcategory',
        sortable: true,
        width: 160,
    },
    {
        field: 'store',
        headerName: 'Store name',
        sortable: true,
        width: 160,
        valueGetter: (value, row) => value.name,
    },
];

const GroceryItemDataGrid = (props) => {
    const list = props.list || [];
    const rows = list?.map(listItem => {
        return {
            id: listItem.product.id,
            name: listItem.product.name,
            category: listItem.product.category,
            subcategory: listItem.product.subcategory,
            actualPrice: listItem.actualPrice,
            store: listItem.store,
        };
    });

    return (
        <GenericDataGrid
            id="grocery-item-data-grid"
            columns={columns}
            rows={rows}
        />
    );
};

export default GroceryItemDataGrid;