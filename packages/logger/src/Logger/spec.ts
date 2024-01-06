import { FormatterLog, MESSAGE, LEVEL } from '@salesduck/symbols-logs';
import { Transport } from '@salesduck/transport-logs';

import { Test } from './mock';

class TestTransport extends Transport {
    log(message: FormatterLog): Promise<void> {
        return Promise.resolve();
    }
}

describe('Logger', () => {
    const transport = new TestTransport({ level: 2 });

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
