import apiInstance from './apiInstance';

describe('Api Instance', () => {
    describe('get', () => {
        it('returns data when successful', async () => {
            // given
            jest.spyOn(global, 'fetch')
                .mockImplementation(() =>
                    Promise.resolve({
                        status: 200,
                        json: () => Promise.resolve('success'),
                    })
                );
            const url = 'http://localhost:8080/products';

            // when
            const actual = await apiInstance.get({ url });

            // then
            const expected = { data: 'success', status: 200 };
            expect(expected).toEqual(actual);
        });
        it('returns error when failed', async () => {
            // given
            jest.spyOn(global, 'fetch')
                .mockImplementation(() =>
                    Promise.reject('error')
                );
            const url = 'http://localhost:8080/products';

            // when
            const actual = await apiInstance.get({ url });

            // then
            const expected = { error: 'error' };
            expect(expected).toEqual(actual);
        });
    });
    describe('post', () => {
        it('returns data when successful', async () => {
            // given
            jest.spyOn(global, 'fetch')
                .mockImplementation(() =>
                    Promise.resolve({
                        status: 200,
                        json: () => Promise.resolve('success'),
                    })
                );
            const url = 'http://localhost:8080/products';

            // when
            const actual = await apiInstance.post({ url });

            // then
            const expected = { data: 'success', status: 200 };
            expect(expected).toEqual(actual);
        });
        it('returns error when failed', async () => {
            // given
            jest.spyOn(global, 'fetch')
                .mockImplementation(() =>
                    Promise.reject('error')
                );
            const url = 'http://localhost:8080/products';

            // when
            const actual = await apiInstance.post({ url });

            // then
            const expected = { error: 'error' };
            expect(expected).toEqual(actual);
        });
    });
});