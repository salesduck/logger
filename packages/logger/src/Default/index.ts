import { Log } from '@salesduck/symbols-logs';
import { Logger } from '@project/Logger';

export interface ILogger<TLog extends Log = Log> {
    fatal(log: TLog): void;
    error(log: TLog): void;
    warn(log: TLog): void;
    info(log: TLog): void;
    debug(log: TLog): void;
    trace(log: TLog): void;
}

export enum LogLevels {
    FATAL,
    ERROR,
    WARN,
    INFO,
    DEBUG,
    TRACE
}

/**
 * Logger base on most used log levels.
 */
export class DefaultLogger<TLog extends Log = Log> extends Logger<TLog> implements ILogger<TLog> {
    /**
     * Use when one or more key business functionalities
     * are not working and the whole system doesn’t
     * fulfill the business functionalities.
     */
    fatal(log: TLog): void {
        return this.log({ name: 'fatal', priority: LogLevels.FATAL }, log);
    }

    /**
     * Use when one or more functionalities are not
     * working, preventing some functionalities
     * from working correctly.
     */
    error(log: TLog): void {
        return this.log({ name: 'error', priority: LogLevels.ERROR }, log);
    }

    /**
     * Use when unexpected behavior happened
     * inside the application, but it is continuing
     * its work and the key business features
     * are operating as expected.
     */
    warn(log: TLog): void {
        return this.log({ name: 'warn', priority: LogLevels.WARN }, log);
    }

    /**
     * Use when event happened, the event is purely
     * informative and can be ignored
     * during normal operations.
     */
    info(log: TLog): void {
        return this.log({ name: 'info', priority: LogLevels.INFO }, log);
    }

    /**
     * Use this log level for events considered
     * to be useful during software debugging when
     * more granular information is needed.
     */
    debug(log: TLog): void {
        return this.log({ name: 'debug', priority: LogLevels.DEBUG }, log);
    }

    /**
     * Use when  describing events showing step
     * by step execution of your code that can be
     * ignored during the standard operation, but
     * may be useful during extended
     * debugging sessions.
     */
    trace(log: TLog): void {
        return this.log({ name: 'trace', priority: LogLevels.TRACE }, log);
    }
}
