import {render, screen} from '@testing-library/react';
import AddGroceryItemAutocomplete from './AddGroceryItemAutocomplete';
import testHelper from '../../helpers/unittests/muiHelper';
import productsApi from '../../api/productsApi';

const TEST_ID = 'add-grocery-item-dropdown';
const SEARCH_PRODUCT_LIST = [{
    name: 'Product Name 1',
    category: 'Category',
    subcategory: 'Sub Category',
    purchaseHistoryList: [{
        store: 'SM Manila',
        link: 'http://product-link/1',
        datePurchased: '2023-04-21',
        price: 120,
    }],
}];

const mockUseSearchProducts = () => {
    jest.spyOn(productsApi, 'searchProducts')
        .mockResolvedValue({
            data: SEARCH_PRODUCT_LIST,
        });
};

const setup = (props = {}, state = {}) => {
    // mocks
    const mockDispatch = jest.fn();
    const initialProps = {
        dispatch: mockDispatch,
        ...props,
    }
    mockUseSearchProducts();

    // render
    const utils = render(<AddGroceryItemAutocomplete {...initialProps} />);

    // useful functions
    const getAddGroceryItemDropdown = () => screen.getByTestId(TEST_ID);
    const getInput = () => screen.getByRole('combobox');
    const selectGroceryItemFromCombobox = async () =>
        await testHelper.asyncSelectFromAutocomplete(TEST_ID, SEARCH_PRODUCT_LIST[0].name);
    return {
        ...utils,
        mockDispatch,
        getAddGroceryItemDropdown,
        selectGroceryItemFromCombobox,
        getInput,
    };
};

describe('<AddGroceryItemAutocomplete />', () => {
    let utils;
    it('renders add grocery item dropdown', () => {
        (utils = setup());
        expect(utils.getAddGroceryItemDropdown()).toBeInTheDocument();
    });
    describe('on select grocery item', () => {
        beforeEach(async () => {
            (utils = setup());
            await utils.selectGroceryItemFromCombobox();
        });
        it('dispatches select grocery item action with value', () => {
            expect(utils.mockDispatch).toHaveBeenCalled();
        });
        it('clear textbox', async () => {
            expect(utils.getInput()).toHaveValue('')
        });
    });
});