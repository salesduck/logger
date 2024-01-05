import { SysLogger } from '.';

const expected = new SysLogger();

describe('SysLogger', () => {
    const mockedLog = jest.fn();
    expected.log = mockedLog;

    it('emer', () => {
        expected.emer({ message: 'Hello' });

        expect(mockedLog).toHaveBeenCalledWith({ name: 'emergency', priority: 0 }, { message: 'Hello' });
    });

    it('alert', () => {
        expected.alert({ message: 'Hello' });

        expect(mockedLog).toHaveBeenCalledWith({ name: 'alert', priority: 1 }, { message: 'Hello' });
    });

    it('crit', () => {
        expected.crit({ message: 'Hello' });

        expect(mockedLog).toHaveBeenCalledWith({ name: 'critical', priority: 2 }, { message: 'Hello' });
    });

    it('error', () => {
        expected.error({ message: 'Hello' });

        expect(mockedLog).toHaveBeenCalledWith({ name: 'error', priority: 3 }, { message: 'Hello' });
    });

    it('warn', () => {
        expected.warn({ message: 'Hello' });

        expect(mockedLog).toHaveBeenCalledWith({ name: 'warning', priority: 4 }, { message: 'Hello' });
    });

    it('notice', () => {
        expected.notice({ message: 'Hello' });

        expect(mockedLog).toHaveBeenCalledWith({ name: 'notice', priority: 5 }, { message: 'Hello' });
    });

    it('info', () => {
        expected.info({ message: 'Hello' });

        expect(mockedLog).toHaveBeenCalledWith({ name: 'info', priority: 6 }, { message: 'Hello' });
    });

    it('debug', () => {
        expected.debug({ message: 'Hello' });

        expect(mockedLog).toHaveBeenCalledWith({ name: 'debug', priority: 7 }, { message: 'Hello' });
    });
});
