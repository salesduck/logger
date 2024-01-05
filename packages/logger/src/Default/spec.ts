import { DefaultLogger } from '.';

const expected = new DefaultLogger();

describe('DefaultLogger', () => {
    const mockedLog = jest.fn();

    expected.log = mockedLog;

    it('fatal', () => {
        expected.fatal({ message: 'Hello' });

        expect(mockedLog).toHaveBeenCalledWith({ name: 'fatal', priority: 0 }, { message: 'Hello' });
    });

    it('error', () => {
        expected.error({ message: 'Hello' });

        expect(mockedLog).toHaveBeenCalledWith({ name: 'error', priority: 1 }, { message: 'Hello' });
    });

    it('warn', () => {
        expected.warn({ message: 'Hello' });

        expect(mockedLog).toHaveBeenCalledWith({ name: 'warn', priority: 2 }, { message: 'Hello' });
    });

    it('info', () => {
        expected.info({ message: 'Hello' });

        expect(mockedLog).toHaveBeenCalledWith({ name: 'info', priority: 3 }, { message: 'Hello' });
    });

    it('debug', () => {
        expected.debug({ message: 'Hello' });

        expect(mockedLog).toHaveBeenCalledWith({ name: 'debug', priority: 4 }, { message: 'Hello' });
    });

    it('trace', () => {
        expected.trace({ message: 'Hello' });

        expect(mockedLog).toHaveBeenCalledWith({ name: 'trace', priority: 5 }, { message: 'Hello' });
    });
});
