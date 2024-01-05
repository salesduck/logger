import { FormatterLog } from '@salesduck/symbols-logs';
import { Transport } from '@salesduck/transport-logs';

import { Test } from './mock';

class TestTransport extends Transport {
    log(message: FormatterLog): Promise<void> {
        return Promise.resolve();
    }
}

describe('Logger', () => {
    describe('log ::', () => {
        const transport = new TestTransport({ level: 2 });

        const logger = new Test({ transports: [transport] });

        const func = () => Promise.resolve();

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
});
