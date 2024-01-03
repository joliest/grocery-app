import {productMap} from '../constants/keyNames';

const BLANK = '';
const valueIsEmpty = str => ['\r', BLANK].some(emptyValue => emptyValue === str);
const convertListToFixedLength = (list, length) => Array.from({ length }, (_, i) => list[i] || BLANK);

const getCsvFileData = async (file) => {
    let data = [];
    try {
        // 1. create url from the file
        const fileUrl = URL.createObjectURL(file);

        // 2. use fetch API to read the file
        const response = await fetch(fileUrl);

        // 3. get the text from the response
        const text = await response.text();

        // 4. split the text by newline
        const lines = text.split('\n');

        // 5. map through all the lines and split each line by comma.
        data = lines.map((line) => line.split(','));
    } catch (error) {
        console.error(error);
    }
    return data;
}

const getCsvHeaders = (data = []) => {
    if (data.length === 0) return data;
    return data[0].reduce((acc, currentValue) => {
        return !valueIsEmpty(currentValue) ? [...acc, currentValue] : acc;
    }, []);
};

const getCsvRows = (data = []) => {
    if (data.length <= 1) return [];
    const headerLength = getCsvHeaders(data)?.length || 0;
    return data.reduce((acc, currentRow, currentIndex) => {
        if (currentIndex === 0) return [];
        const row = convertListToFixedLength(currentRow, headerLength);
        return [...acc, row];
    }, []);
}

const getCleanCsvRows = (data = []) => {
    const csvRows = getCsvRows(data);
    return csvRows.reduce((acc, currentRow, currentIndex) => {
        const areAllBlank = currentRow.every(cell => valueIsEmpty(cell));
        return !areAllBlank ? [...acc, currentRow] : acc;
    }, []);
};


const convertCsvToJs = (csvData, keyNames = {}) => {
    const fieldNames = getCsvHeaders(csvData);
    const fieldValues = getCleanCsvRows(csvData);
    return fieldValues.map(values => {
        const toJsObject = (acc, currentName, currentIndex) => {
            const isValidKey = Object.keys(keyNames).length
                ? keyNames[currentName]
                : true;
            if (!isValidKey) return acc;
            const value = currentName === 'price'
                ? Number(values[currentIndex])
                : values[currentIndex];
            return {...acc, [currentName]: value};
        };
        return fieldNames.reduce(toJsObject, {});
    });
}

const csvHelpers = {
    getCsvFileData,
    getCsvHeaders,
    getCsvRows,
    getCleanCsvRows,
    convertCsvToJs,
}

export default csvHelpers;