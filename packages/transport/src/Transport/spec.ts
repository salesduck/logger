import { FormattedLogMessage } from '@salesduck/symbols-logs';
import { DefaultFormatter } from '@salesduck/format-logs';

import { Transport } from '.';

class Test extends Transport {
    log(message: FormattedLogMessage): Promise<void> {
        return Promise.resolve();
    }
}

describe('Transport', () => {
    describe('constructor ::', () => {
        it('set default level to very high', () => {
            const expected = new Test();

            expect(expected.getLevel()).toBe(99);
        });

        it('set default formatter', () => {
            const expected = new Test();

            expect(expected.getFormat()).toEqual(new DefaultFormatter());
        });

        it('set custom level', () => {
            const expected = new Test({ level: 1 });

            expect(expected.getLevel()).toBe(1);
        });

        it('set custom formatter', () => {
            const formatter = new DefaultFormatter();
            const expected = new Test({ formatter });

            expect(expected.getFormat()).toBe(formatter);
        });
    });
});
