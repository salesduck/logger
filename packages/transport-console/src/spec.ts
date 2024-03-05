import { MESSAGE, LEVEL } from '@salesduck/symbols-logs';
import { Transport } from '@salesduck/transport-logs';

import { ConsoleTransport } from '.';

describe('ConsoleTransport', () => {
    describe('constructor ::', () => {
        it('extend Transport', () => {
            const expected = new ConsoleTransport();

            expect(expected).toBeInstanceOf(Transport);
        });

        it('with default method', () => {
            const expected = new ConsoleTransport();

            expect(expected.options.method).toBe(console.log);
        });

        it('with custom method', () => {
            const method = () => {};

            const expected = new ConsoleTransport({ method });

            expect(expected.options.method).toBe(method);
        });
    });

    describe('log ::', () => {
        it('send message to console by log method', async () => {
            const mockedLog = jest.fn();
            console.log = mockedLog;

            const expected = new ConsoleTransport();

            await expected.log({ message: 'Hello', [MESSAGE]: 'Hello', [LEVEL]: { name: 'info', priority: 1 } });

            expect(mockedLog).toHaveBeenCalledWith('Hello');
        });
    });
});
