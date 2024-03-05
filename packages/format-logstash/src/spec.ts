import { MESSAGE, LEVEL } from '@salesduck/symbols-logs';

import { LogstashFormat } from '.';

describe('LogStashFormat', () => {
    const level = { name: 'debug', priority: 1 };

    describe('format ::', () => {
        it('use default serializer', () => {
            const format = new LogstashFormat();

            const message = { message: 'Hello', [LEVEL]: level, hello: 'world' };

            const expected = format.format(message);

            expect(expected).toEqual({
                message: 'Hello',
                hello: 'world',
                [MESSAGE]: JSON.stringify({
                    '@message': 'Hello',
                    '@fields': {
                        hello: 'world',
                        level: 'debug'
                    }
                }),
                [LEVEL]: level
            });
        });

        it('user custom serializer', () => {
            const format = new LogstashFormat({ serializer: () => 'true' });

            const message = { message: 'Hello', [LEVEL]: level };

            const expected = format.format(message);

            expect(expected[MESSAGE]).toBe('true');
        });

        it('with timestamp', () => {
            const format = new LogstashFormat();

            const timestamp = 1704282996;

            const message = { message: 'Hello', [LEVEL]: level, timestamp };

            const expected = format.format(message);

            expect(expected.timestamp).toBe(timestamp);
            expect(expected[MESSAGE]).toBe(
                JSON.stringify({
                    '@message': 'Hello',
                    '@timestamp': timestamp,
                    '@fields': {
                        level: 'debug'
                    }
                })
            );
        });
    });
});
