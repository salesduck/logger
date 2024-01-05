import { MESSAGE, LEVEL } from '@salesduck/symbols-logs';

import { JsonFormat } from '.';

describe('JsonFormat', () => {
    const level = { name: 'debug', priority: 1 };

    describe('format ::', () => {
        it('use default serializer', () => {
            const format = new JsonFormat();

            const message = { message: 'Hello', [LEVEL]: level };

            const expected = format.format(message);

            expect(expected[MESSAGE]).toBe(JSON.stringify(message));
            expect(expected.message).toBe('Hello');
        });

        it('use custom serializer', () => {
            const format = new JsonFormat({ serializer: () => 'true' });

            const message = { message: 'Hello', [LEVEL]: level };

            const expected = format.format(message);

            expect(expected[MESSAGE]).toBe('true');
        });
    });
});
