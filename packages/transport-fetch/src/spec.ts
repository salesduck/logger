import { MESSAGE, LEVEL } from '@salesduck/symbols-logs';

import { FetchTransport } from '.';

describe('FetchTransport', () => {
    describe('log ::', () => {
        it('use default init data', () => {
            const transport = new FetchTransport({ url: 'https://example.com' });

            const func = () => Promise.resolve(new Response());
            const mockedFetch = jest.fn(func);
            global.fetch = mockedFetch;

            transport.log({ message: 'Hello', [MESSAGE]: 'Hello', [LEVEL]: { name: 'info', priority: 0 } });

            expect(mockedFetch).toHaveBeenCalledWith('https://example.com', {
                method: 'POST',
                body: 'Hello'
            });
        });

        it('use custom init data', () => {
            const headers = { 'content-type': 'application/json' };

            const transport = new FetchTransport({
                url: 'https://example.com',
                init: { headers }
            });

            const func = () => Promise.resolve(new Response());
            const mockedFetch = jest.fn(func);
            global.fetch = mockedFetch;

            transport.log({ message: 'Hello', [MESSAGE]: 'Hello', [LEVEL]: { name: 'info', priority: 0 } });

            expect(mockedFetch).toHaveBeenCalledWith('https://example.com', {
                headers,
                method: 'POST',
                body: 'Hello'
            });
        });

        // TODO: почему-то по тесту обработчик вообще не вызывается
        it.skip('handle onError', () => {
            const onError = jest.fn();

            const transport = new FetchTransport({ url: 'https://example.com', onError });

            const error = new Error('Something went wrong');

            const func = () => Promise.reject(error);
            const mockedFetch = jest.fn(func);
            global.fetch = mockedFetch;

            transport.log({ message: 'Hello', [MESSAGE]: 'Hello', [LEVEL]: { name: 'info', priority: 0 } });

            expect(onError).toHaveBeenCalledWith(error);
        });

        // TODO: почему-то по тесту обработчик вообще не вызывается
        it.skip('handle onResponse', () => {
            const onResponse = jest.fn();

            const transport = new FetchTransport({ url: 'https://example.com', onResponse });

            const response = new Response();

            const func = () => Promise.resolve(response);
            const mockedFetch = jest.fn(func);
            global.fetch = mockedFetch;

            transport.log({ message: 'Hello', [MESSAGE]: 'Hello', [LEVEL]: { name: 'info', priority: 0 } });

            expect(onResponse).toHaveBeenCalledWith(response);
        });
    });
});
