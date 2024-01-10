import { MESSAGE, LEVEL } from '@salesduck/symbols-logs';

import { SimpleFormat } from '.';

describe('SimpleFormat', () => {
    describe('format ::', () => {
        const level = { name: 'debug', priority: 1 };

        it('message without other params', () => {
            const format = new SimpleFormat();

            const expected = format.format({ message: 'Hello', [LEVEL]: level });

            expect(expected[MESSAGE]).toBe('[DEBUG]: Hello');
        });

        it('message with serialized params', () => {
            const format = new SimpleFormat();

            const expected = format.format({
                message: 'Hello',
                [LEVEL]: level,
                param1: 'value1',
                param2: 'value2'
            });

            expect(expected[MESSAGE]).toBe(
                `[DEBUG]: Hello ${JSON.stringify({
                    param1: 'value1',
                    param2: 'value2'
                })}`
            );
        });

        it('message with custom serializer', () => {
            const mock = () => 'true';
            const serializer = jest.fn(mock);

            const format = new SimpleFormat({ serializer });

            const expected = format.format({
                message: 'Hello',
                [LEVEL]: level,
                param1: 'value1',
                param2: 'value2'
            });

            expect(expected[MESSAGE]).toBe('[DEBUG]: Hello true');
        });
    });
});
