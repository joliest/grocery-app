import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import UploadCsvButton from './UploadCsvButton';

const setup = (props = {}) => {
    const onFileChange = jest.fn();
    const utils = render(
        <UploadCsvButton onFileChange={onFileChange} {...props} />
    );
    const getUploadCsvButton = () => screen.getByTestId('upload-csv-button');
    return { ...utils, onFileChange, getUploadCsvButton };
};

describe('<UploadCsvButton /> component', () => {
    let onFileChange, getUploadCsvButton;
    beforeEach(() => {
        global.URL.createObjectURL = jest.fn();
        global.fetch = jest.fn(() => {
            return {
                text: () => 'Product1,201,test',
            }
        });

        ({ onFileChange, getUploadCsvButton } = setup());
    });
    afterEach(() => {
        global.URL.createObjectURL.mockReset();
        global.fetch.mockReset();
    });
    it('renders input', () => {
        expect(getUploadCsvButton()).toBeInTheDocument();
    });
    it('when on change event is triggered, then it calls onFileChange prop', async () => {
        const file = new File(["(⌐□_□)"], "chucknorris.csv", { type: "text/csv" });

        await waitFor(() =>
            fireEvent.change(getUploadCsvButton(), {
                target: { files: [file] },
            })
        );
        expect(onFileChange).toHaveBeenCalledWith([['Product1', '201', 'test']]);
    });
});