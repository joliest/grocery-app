import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import UploadCsvPreviewModal from './UploadCsvPreviewModal';

const setup = (props) => {
    const setOpen = jest.fn();
    const utils = render(
        <UploadCsvPreviewModal setOpen={setOpen} open={false} {...props} />
    );
    return {
        ...utils,
        setOpen,
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
            const props = { open: true };
            setup(props);
        });
        it('renders the modal', () => {
            expect(screen.getByLabelText('Upload Data Preview')).toBeInTheDocument();
        });
    })
});