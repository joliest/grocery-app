import React from 'react';
import PropTypes from 'prop-types';
import {Button} from '@mui/material';

const UploadCsvButton = (props) => {
    const handleFileChange = async (e) => {
        if (e.target.files) {
            try {
                const file = e.target.files[0];

                // 1. create url from the file
                const fileUrl = URL.createObjectURL(file);

                // 2. use fetch API to read the file
                const response = await fetch(fileUrl);

                // 3. get the text from the response
                const text = await response.text();

                // 4. split the text by newline
                const lines = text.split('\n');

                // 5. map through all the lines and split each line by comma.
                const data = lines.map((line) => line.split(','));

                // 6. call the onChange event
                props.onFileChange(data);
            } catch (error) {
                console.error(error);
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
                <Button variant="contained" component="span">
                    Upload CSV
                </Button>
            </label>
        </>
)
};
UploadCsvButton.propTypes = {
    onFileChange: PropTypes.func.isRequired,
};
export default UploadCsvButton;