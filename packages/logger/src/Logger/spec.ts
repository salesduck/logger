import { FormattedLogMessage, MESSAGE, LEVEL } from '@salesduck/symbols-logs';
import { Transport } from '@salesduck/transport-logs';

import { Test } from './mock';

class TestTransport extends Transport {
    log(message: FormattedLogMessage): Promise<void> {
        return Promise.resolve();
    }
}

describe('Logger', () => {
    const transport = new TestTransport({ level: 2 });

    describe('constructor ::', () => {
        it('set default options', () => {
            const expected = new Test();

            expect(expected.options.transports).toEqual([]);
            expect(expected.options.onError).not.toBeUndefined();
        });

        it('set custom options', () => {
            const onError = () => {};

            const expected = new Test({ onError, transports: [transport] });

            expect(expected.options.transports).toEqual([transport]);
            expect(expected.options.onError).toBe(onError);
        });
    });

    const logger = new Test({ transports: [transport] });

    const func = () => Promise.resolve();

    describe('log ::', () => {
        it('use transport by priority', () => {
            const mockedLog = jest.fn(func);

            transport.log = mockedLog;

            logger.log({ name: 'info', priority: 1 }, { message: 'Hello' });

            expect(mockedLog).toHaveBeenCalled();
        });

        it('skip transport by priority', () => {
            const mockedLog = jest.fn(func);

            transport.log = mockedLog;

            logger.log({ name: 'info', priority: 3 }, { message: 'Hello' });

            expect(mockedLog).not.toHaveBeenCalled();
        });

        it('catch transport exception how error', () => {
            const onError = jest.fn();

            const logger = new Test({ onError, transports: [transport] });
            const error = new Error('Hello');

            transport.log = () => {
                throw error;
            };

            logger.log({ name: 'info', priority: 1 }, { message: 'Hello' });

            expect(onError).toHaveBeenCalledWith(error);
        });

        it('catch transport exception how not error instance', () => {
            const onError = jest.fn();

            const logger = new Test({ onError, transports: [transport] });

            transport.log = () => {
                throw 'Hello';
            };

            logger.log({ name: 'info', priority: 1 }, { message: 'Hello' });

            expect(onError).toHaveBeenCalledWith(new Error('Hello'));
        });

        it('merge meta to log data', () => {
            const transport = new TestTransport({ level: 2 });

            const mock = jest.fn();
            transport.log = mock;

            const logger = new Test({ transports: [transport] });

            logger.meta({ size: 0 });

            logger.log({ name: 'test', priority: 0 }, { message: 'hello', size: 12 });

            expect(mock).toHaveBeenCalledWith({
                [LEVEL]: {
                    name: 'test',
                    priority: 0
                },
                [MESSAGE]: 'hello',
                message: 'hello',
                size: 12
            });
        });
    });

    describe('meta ::', () => {
        it('add some meta to logs', () => {
            const mockedLog = jest.fn(func);

            transport.log = mockedLog;

            logger.meta({ hello: 'world' });

            logger.log({ name: 'info', priority: 1 }, { message: 'Hello' });

            expect(mockedLog).toBeCalledWith({
                [MESSAGE]: 'Hello',
                [LEVEL]: {
                    name: 'info',
                    priority: 1
                },
                message: 'Hello',
                hello: 'world'
            });
        });
    });
});
