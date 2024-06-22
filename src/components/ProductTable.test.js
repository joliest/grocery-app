import BasicTable from './ProductTable';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import csvHelper from '../helpers/csvHelper';
import productsApi from '../api/productsApi';
import * as useProducts from '../hooks/useProducts';

const mockUseProducts = () => {
    jest.spyOn(useProducts, 'default').mockReturnValue({
        products: [{
            name: 'Product Name 1',
            category: 'Category',
            subcategory: 'Sub Category',
            purchaseHistoryList: [{
                store: 'SM Manila',
                link: 'http://product-link/1',
                datePurchased: '2023-04-21',
                price: 120,
            }],
        }],
    });
}

const mockResolvedGetCsvFileData = () => {
    jest.spyOn(csvHelper, 'getCsvFileData')
        .mockResolvedValueOnce([
            ['Name', 'Price', 'Description'],
            ['Product1', '201', 'test'],
        ]);
}

const mockPostProducts = () => {
    jest.spyOn(productsApi, 'postProducts')
        .mockResolvedValueOnce(null);
};

// see reference: https://kentcdodds.com/blog/avoid-nesting-when-youre-testing
const setup = () => {
    const utils = render(<BasicTable />);
    const getColumnHeader = name => screen.getByRole('columnheader', { name });
    const getColumnCell = name => screen.getByRole('cell', { name });
    const getUploadCsv = () => screen.getByTestId('upload-csv-button');
    const queryModal = () => screen.getByTestId('upload-csv-modal')
    const mockUploadFile = () => {
        const file = new File(['(⌐□_□)'], 'chucknorris.csv', { type: 'text/csv' });
        fireEvent.change(getUploadCsv(), {
            target: { files: [file] },
        });
    };
    const mockSaveChanges = async () => {
        mockUploadFile();
        await waitFor(() => queryModal());
        fireEvent.click(screen.getByText('Save changes'));
        await waitFor(() => productsApi.postProducts);
    };
    return {
        ...utils,
        mockSaveChanges,
        mockUploadFile,
        getColumnHeader,
        getColumnCell,
        getUploadCsv,
        queryModal,
    };
};

describe('<ProductTable /> component', () => {
    let utils;
    const original = window.location;
    beforeEach(() => {
        mockUseProducts();
        mockResolvedGetCsvFileData();
        mockPostProducts();

        // mocking windows.location.reload
        Object.defineProperty(window, 'location', {
            configurable: true,
            value: { reload: jest.fn() },
        });
        (utils = setup());
    });

    afterEach(() => {
        // cleanup: mocking windows.location.reload
        Object.defineProperty(window, 'location', { configurable: true, value: original });
    });

    it('should render the table', async () => {
        await waitFor(() => {
            expect(screen.getByRole('table')).toBeInTheDocument();
        });
    });
    it.each([
        'Name', 'Price', 'Store', 'Category', 'Sub Category', 'Reference', 'Date Purchased',
    ])('renders %s header', async (headerName) => {
        await waitFor(() => {
            expect(utils.getColumnHeader(headerName)).toBeInTheDocument();
        });
    });
    it.each([
        'Product Name 1',
        '120',
        'SM Manila',
        'Category',
        'Sub Category',
        'http://product-link/1',
        '2023-04-21',
    ])('render table value - %s', async (cell) => {
        await waitFor(() => {
            expect(utils.getColumnCell(cell)).toBeInTheDocument();
        });
    });
    it('should render upload csv button', () => {
        expect(screen.getByTestId('upload-csv-button')).toBeInTheDocument();
    });
    describe('modal', () => {
        describe('when file is uploaded', () => {
            it('opens the modal', async () => {
                utils.mockUploadFile();
                expect(utils.getUploadCsv()).toBeInTheDocument();
                await waitFor(() => {
                    expect(utils.queryModal()).toBeInTheDocument();
                });
            });
            describe('when Save Changes button is clicked', () => {
                it('posts products', async () => {
                    await utils.mockSaveChanges();
                    expect(productsApi.postProducts).toHaveBeenCalled();
                });
                it('reloads the page', async () => {
                    await utils.mockSaveChanges();
                    expect(window.location.reload).toHaveBeenCalled()
                });
            });
        });
    });
});