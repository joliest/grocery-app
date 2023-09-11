
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

export default {
    getCsvFileData,
}