import {fireEvent, render, screen, waitFor, within} from '@testing-library/react';
import UploadCsvPreviewModal from './UploadCsvPreviewModal';

const setup = (props) => {
    const setOpen = jest.fn();
    const getTableRowByNumber = number => screen.getAllByRole('rowgroup')[number];
    const utils = render(
        <UploadCsvPreviewModal setOpen={setOpen} open={false} {...props} />
    );
    return {
        ...utils,
        setOpen,
        getTableRowByNumber,
    };
}
describe('<UploadCsvPreviewModal />', () => {
    let utils;
    describe('happy path', () => {
        beforeEach(() => {
            utils = setup();
        });
        it('should not render the modal by default', () => {
            expect(screen.queryByLabelText('Modal title')).not.toBeInTheDocument();
        });
    });
    describe('when open is true', () => {
        beforeEach(() => {
            const props = {
                open: true,
                data: [
                    ['Name', 'Price', 'Description'],
                    ['Product1', '201', 'test'],
                ],
            };
            utils = setup(props);
        });
        it('renders the modal', () => {
            expect(screen.getByLabelText('Upload Data Preview')).toBeInTheDocument();
        });
        it('should render save button', () => {
            expect(screen.getByText('Save changes')).toBeInTheDocument();
        });
        describe('when close button is clicked', () => {
            it('sets open with false', () => {
                fireEvent.click(screen.getByText('Save changes'));
                expect(utils.setOpen).toHaveBeenCalledWith(false);
            });
        });
        describe('table', () => {
            it('renders headers', () => {
                const headerRow = utils.getTableRowByNumber(0);
                const [col1, col2, col3] = within(headerRow).getAllByRole('columnheader');
                expect(col1).toHaveTextContent('Name');
                expect(col2).toHaveTextContent('Price');
                expect(col3).toHaveTextContent('Description');
            });
            it('renders rows', () => {
                const headerRow = utils.getTableRowByNumber(1);
                const [col1, col2, col3] = within(headerRow).getAllByRole('cell');
                expect(col1).toHaveTextContent('Product1');
                expect(col2).toHaveTextContent('201');
                expect(col3).toHaveTextContent('test');
            });
        });
    })
});