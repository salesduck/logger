import { MESSAGE, LEVEL } from '@salesduck/symbols-logs';

import { DefaultFormatter } from '.';

describe('DefaultFormatter', () => {
    describe('format ::', () => {
        it('add message symbol with message value', () => {
            const format = new DefaultFormatter();

            const message = { message: 'Hello', [LEVEL]: { name: 'debug', priority: 1 } };

            const expected = format.format(message);

            expect(expected[MESSAGE]).toBe(message.message);
        });
    });
});
