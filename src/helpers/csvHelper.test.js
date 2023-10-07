import uploadHelper from './csvHelper';

const sampleCsvData = [
    // header
    [ 'name', 'price', 'store', 'category', 'subcategory', 'link', 'datePurchased', '', '', '', '\r' ],
    // clean values
    [ 'Product 1', '12', 'Sm Pampanga', 'Category', 'Sub Category', 'http://link/1', '4-21-92', '', '', '', '\r' ],
    [ 'Product 2', '14', 'Mall of Asia', 'Category 2', 'Sub Category 2', '', '9-21-23', '\r', 'should not be included' ],
    [ '', '14', '', '', '', '', '', '\r', 'should not be included', '' ],
    // not clean values
    [ '' ],
    [ '', '', '', '', '', '', '', '', ],
    [ '\r' ],
];

describe('Csv Helper', () => {
    describe('Get Csv File Data', () => {
        const file = new File(['(⌐□_□)'], 'chucknorris.csv', { type: 'text/csv' });
        describe('happy path', () => {
            beforeEach(() => {
                global.URL.createObjectURL = jest.fn();
                global.fetch = jest.fn(() => {
                    return {
                        text: () => 'Product1,201,test',
                    }
                });
            });
            afterEach(() => {
                global.URL.createObjectURL.mockReset();
                global.fetch.mockReset();
                jest.clearAllMocks();
            });
            it('returns data', async () => {
                const actual = await uploadHelper.getCsvFileData(file);
                expect(actual).toEqual([['Product1', '201', 'test']]);
            });
        });
        describe('when it throws an error', () => {
            beforeEach(() => {
                global.URL.createObjectURL = jest.fn();
                global.fetch = jest.fn().mockRejectedValue('trigger error');
            });
            afterEach(() => {
                global.URL.createObjectURL.mockReset();
                global.fetch.mockReset();
                jest.clearAllMocks();
            });
            it('returns empty array', async () => {
                const actual = await uploadHelper.getCsvFileData(file);
                expect(actual).toEqual([]);
            });
        });
    });
    describe('Get CSV header', () => {
        describe('data has atleast one row', () => {
            it('gets the first row of the Csv file', () => {
                expect(uploadHelper.getCsvHeaders(sampleCsvData)).toEqual([
                    'name', 'price', 'store', 'category', 'subcategory', 'link', 'datePurchased',
                ]);
            });
        });
        describe('data does not have any row', () => {
            it('returns empty array', () => {
                const data = undefined;
                expect(uploadHelper.getCsvHeaders(data)).toEqual([]);
            });
        });
    });
    describe('Get clean csv rows', () => {
        describe('when data has atleast two rows', () => {
            it('returns second row', () => {
                expect(uploadHelper.getCleanCsvRows(sampleCsvData)).toEqual([
                    ['Product 1', '12', 'Sm Pampanga', 'Category', 'Sub Category', 'http://link/1', '4-21-92'],
                    ['Product 2', '14', 'Mall of Asia', 'Category 2', 'Sub Category 2', '', '9-21-23'],
                    ['', '14', '', '', '', '', ''],
                ]);
            });
        });
        describe('when data has atleast one row', () => {
            it('returns empty array', () => {
                const data = [
                    [ 'name', 'price', 'store', 'category', 'subcategory', 'link', 'datePurchased', '', '', '', '\r' ],
                ];
                expect(uploadHelper.getCleanCsvRows(data)).toEqual([]);
            });
        });
        describe('when data is not defined', () => {
            it('returns empty array', () => {
                const data = undefined;
                expect(uploadHelper.getCleanCsvRows(data)).toEqual([]);
            });
        });
    });
    describe('Get csv rows', () => {
        describe('when data has atleast two rows', () => {
            it('returns second row', () => {
                expect(uploadHelper.getCsvRows(sampleCsvData)).toEqual([
                    ['Product 1', '12', 'Sm Pampanga', 'Category', 'Sub Category', 'http://link/1', '4-21-92'],
                    ['Product 2', '14', 'Mall of Asia', 'Category 2', 'Sub Category 2', '', '9-21-23'],
                    ['', '14', '', '', '', '', ''],
                    ['', '', '', '', '', '', ''],
                    ['', '', '', '', '', '', ''],
                    ['\r', '', '', '', '', '', ''],
                ]);
            });
        });
        describe('when data has atleast one row', () => {
            it('returns empty array', () => {
                const data = [
                    [ 'name', 'price', 'store', 'category', 'subcategory', 'link', 'datePurchased', '', '', '', '\r' ],
                ];
                expect(uploadHelper.getCsvRows(data)).toEqual([]);
            });
        });
        describe('when data is not defined', () => {
            it('returns empty array', () => {
                const data = undefined;
                expect(uploadHelper.getCsvRows(data)).toEqual([]);
            });
        });
    });
});