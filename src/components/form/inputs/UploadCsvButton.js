import React from 'react';
import PropTypes from 'prop-types';
import csvHelper from '../../../helpers/csvHelper';
import DefaultButton from '../muiWrappers/DefaultButton';

const UploadCsvButton = (props) => {
    const handleFileChange = async (e) => {
        if (e.target.files) {
            const file = e.target.files[0];
            try {
                const data = await csvHelper.getCsvFileData(file);
                props.onFileChange(data);
            } catch (e) {
                props.onFileChange([]);
            }
        }
    };
    return (
        <>
            <input
                type="file"
                accept=".csv"
                style={{ display: 'none' }}
                id="upload-csv-button"
                data-testid="upload-csv-button"
                onChange={handleFileChange}
            />
            <label htmlFor="upload-csv-button">
                <DefaultButton variant="contained" component="span">
                    Upload CSV
                </DefaultButton>
            </label>
        </>
)
};
UploadCsvButton.propTypes = {
    onFileChange: PropTypes.func.isRequired,
};
export default UploadCsvButton;