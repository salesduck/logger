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
            const mockedLog = jest.fn();
            console.log = mockedLog;

            const expected = new ConsoleTransport();

            expected.log({ message: 'Hello', [MESSAGE]: 'Hello', [LEVEL]: { name: 'info', priority: 1 } });

            expect(mockedLog).toHaveBeenCalledWith('Hello');
        });

        it('with custom method', () => {
            const mockedLog = jest.fn();

            const expected = new ConsoleTransport({ method: mockedLog });

            expected.log({ message: 'Hello', [MESSAGE]: 'Hello', [LEVEL]: { name: 'info', priority: 1 } });

            expect(mockedLog).toHaveBeenCalledWith('Hello');
        });
    });

    describe('log ::', () => {
        it('send message to console by log method', () => {
            const mockedLog = jest.fn();
            console.log = mockedLog;

            const expected = new ConsoleTransport();

            expected.log({ message: 'Hello', [MESSAGE]: 'Hello', [LEVEL]: { name: 'info', priority: 1 } });

            expect(mockedLog).toHaveBeenCalledWith('Hello');
        });
    });
});
