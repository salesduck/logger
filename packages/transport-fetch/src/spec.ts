import { MESSAGE, LEVEL } from '@salesduck/symbols-logs';

import { FetchTransport } from '.';

describe('FetchTransport', () => {
    describe('log ::', () => {
        it('use default init data', async () => {
            const transport = new FetchTransport({ url: 'https://example.com' });

            const func = () => Promise.resolve(new Response());
            const mockedFetch = jest.fn(func);
            global.fetch = mockedFetch;

            await transport.log({ message: 'Hello', [MESSAGE]: 'Hello', [LEVEL]: { name: 'info', priority: 0 } });

            expect(mockedFetch).toHaveBeenCalledWith('https://example.com', {
                method: 'POST',
                body: 'Hello'
            });
        });

        it('use custom init data', async () => {
            const headers = { 'content-type': 'application/json' };

            const transport = new FetchTransport({
                url: 'https://example.com',
                init: { headers }
            });

            const func = () => Promise.resolve(new Response());
            const mockedFetch = jest.fn(func);
            global.fetch = mockedFetch;

            await transport.log({ message: 'Hello', [MESSAGE]: 'Hello', [LEVEL]: { name: 'info', priority: 0 } });

            expect(mockedFetch).toHaveBeenCalledWith('https://example.com', {
                headers,
                method: 'POST',
                body: 'Hello'
            });
        });

        it('throw network error', async () => {
            const transport = new FetchTransport({ url: 'https://example.com' });

            const error = new Error('Failed to fetch');

            const func = () => Promise.reject(error);
            const mockedFetch = jest.fn(func);
            global.fetch = mockedFetch;

            try {
                await transport.log({ message: 'Hello', [MESSAGE]: 'Hello', [LEVEL]: { name: 'info', priority: 0 } });
                expect(true).toBeFalsy();
            } catch (err) {
                expect(err).toEqual(error);
            }
        });

        it('throw invalid response error', async () => {
            const transport = new FetchTransport({ url: 'https://example.com' });

            const func = () => Promise.resolve(new Response('Invalid response', { status: 404, statusText: '' }));
            const mockedFetch = jest.fn(func);
            global.fetch = mockedFetch;

            try {
                await transport.log({ message: 'Hello', [MESSAGE]: 'Hello', [LEVEL]: { name: 'info', priority: 0 } });
            } catch (err) {
                expect(err).toEqual(new Error('Failed to fetch "https://example.com" with status 404'));
            }
        });
    });
});
