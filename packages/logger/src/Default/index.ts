import { Log } from '@salesduck/symbols-logs';
import { Logger } from '@project/Logger';

export interface ILogger {
    fatal(log: Log): void;
    error(log: Log): void;
    warn(log: Log): void;
    info(log: Log): void;
    debug(log: Log): void;
    trace(log: Log): void;
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
export class DefaultLogger extends Logger implements ILogger {
    /**
     * Use when one or more key business functionalities
     * are not working and the whole system doesn’t
     * fulfill the business functionalities.
     */
    fatal(log: Log): void {
        return this.log({ name: 'fatal', priority: LogLevels.FATAL }, log);
    }

    /**
     * Use when one or more functionalities are not
     * working, preventing some functionalities
     * from working correctly.
     */
    error(log: Log): void {
        return this.log({ name: 'error', priority: LogLevels.ERROR }, log);
    }

    /**
     * Use when unexpected behavior happened
     * inside the application, but it is continuing
     * its work and the key business features
     * are operating as expected.
     */
    warn(log: Log): void {
        return this.log({ name: 'warn', priority: LogLevels.WARN }, log);
    }

    /**
     * Use when event happened, the event is purely
     * informative and can be ignored
     * during normal operations.
     */
    info(log: Log): void {
        return this.log({ name: 'info', priority: LogLevels.INFO }, log);
    }

    /**
     * Use this log level for events considered
     * to be useful during software debugging when
     * more granular information is needed.
     */
    debug(log: Log): void {
        return this.log({ name: 'debug', priority: LogLevels.DEBUG }, log);
    }

    /**
     * Use when  describing events showing step
     * by step execution of your code that can be
     * ignored during the standard operation, but
     * may be useful during extended
     * debugging sessions.
     */
    trace(log: Log): void {
        return this.log({ name: 'trace', priority: LogLevels.TRACE }, log);
    }
}
