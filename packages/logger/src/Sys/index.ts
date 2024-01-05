import { Log } from '@salesduck/symbols-logs';
import { Logger } from '@project/Logger';

export interface ISysLogger {
    emer(log: Log): void;
    alert(log: Log): void;
    crit(log: Log): void;
    error(log: Log): void;
    warn(log: Log): void;
    notice(log: Log): void;
    info(log: Log): void;
    debug(log: Log): void;
}

export enum SysLogLevels {
    EMERGENCY,
    ALERT,
    CRITICAL,
    ERROR,
    WARNING,
    NOTICE,
    INFO,
    DEBUG
}

/**
 * Logger base on log levels from rfc5424
 *
 * For more details https://datatracker.ietf.org/doc/html/rfc5424
 */
export class SysLogger extends Logger implements ISysLogger {
    /**
     * System is unusable
     */
    emer(log: Log): void {
        return this.log({ name: 'emergency', priority: SysLogLevels.EMERGENCY }, log);
    }

    /**
     * Action must be taken immediately
     */
    alert(log: Log): void {
        return this.log({ name: 'alert', priority: SysLogLevels.ALERT }, log);
    }

    /**
     * Critical conditions
     */
    crit(log: Log): void {
        return this.log({ name: 'critical', priority: SysLogLevels.CRITICAL }, log);
    }

    /**
     * Error conditions
     */
    error(log: Log): void {
        return this.log({ name: 'error', priority: SysLogLevels.ERROR }, log);
    }

    /**
     * Warning conditions
     */
    warn(log: Log): void {
        return this.log({ name: 'warning', priority: SysLogLevels.WARNING }, log);
    }

    /**
     * Normal but significant condition
     */
    notice(log: Log): void {
        return this.log({ name: 'notice', priority: SysLogLevels.NOTICE }, log);
    }

    /**
     * Informational messages
     */
    info(log: Log): void {
        return this.log({ name: 'info', priority: SysLogLevels.INFO }, log);
    }

    /**
     * Debug-level messages
     */
    debug(log: Log): void {
        return this.log({ name: 'debug', priority: SysLogLevels.DEBUG }, log);
    }
}
