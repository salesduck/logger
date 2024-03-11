import { FormattedLogMessage, LogLevel } from '@salesduck/symbols-logs';
import { ILogFormat } from '@salesduck/format-logs';

/**
 * Defines a common transport interface that will allow
 * information to be delivered to the consumer
 */
export interface ILogTransport {
    /**
     * Allows you to check whether the transport can
     * process a message with this level
     */
    canUse(logLevel: LogLevel): boolean;

    /**
     * Returns the format in which the transport will send data
     */
    getFormat(): ILogFormat;

    /**
     * Use this method to fix log in system
     */
    log(message: FormattedLogMessage): Promise<void>;
}
