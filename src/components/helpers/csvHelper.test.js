import uploadHelper from './csvHelper';

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
});