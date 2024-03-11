import { FormattedLogMessage } from '@salesduck/symbols-logs';
import { DefaultFormatter } from '@salesduck/format-logs';

import { Transport, FilterLimitUsingTransportStrategy, OnlyOneLevelUsingTransportStrategy } from '.';

class Test extends Transport {
    log(message: FormattedLogMessage): Promise<void> {
        return Promise.resolve();
    }
}

describe('Transport', () => {
    describe('constructor ::', () => {
        it('set default level to very high', () => {
            const expected = new Test();

            expect(expected.options.level).toBe(99);
        });

        it('set default formatter', () => {
            const expected = new Test();

            expect(expected.getFormat()).toEqual(new DefaultFormatter());
        });

        it('set default usingStrategy', () => {
            const expected = new Test();

            expect(expected.options.usingStrategy).toBe(FilterLimitUsingTransportStrategy);
        });

        it('set custom level', () => {
            const expected = new Test({ level: 1 });

            expect(expected.options.level).toBe(1);
        });

        it('set custom formatter', () => {
            const formatter = new DefaultFormatter();
            const expected = new Test({ formatter });

            expect(expected.getFormat()).toBe(formatter);
        });
    });

    describe('FilterLimitUsingTransportStrategy ::', () => {
        it('filter correct', () => {
            const expected = new Test();

            expect(expected.options.usingStrategy(1, 3)).toBe(true);
            expect(expected.options.usingStrategy(3, 3)).toBe(true);
            expect(expected.options.usingStrategy(4, 3)).toBe(false);
        });
    });

    describe('OnlyOneLevelUsingTransportStrategy ::', () => {
        it('filter correct', () => {
            const expected = new Test({ usingStrategy: OnlyOneLevelUsingTransportStrategy });

            expect(expected.options.usingStrategy(1, 3)).toBe(false);
            expect(expected.options.usingStrategy(3, 3)).toBe(true);
            expect(expected.options.usingStrategy(4, 3)).toBe(false);
        });
    });
});
