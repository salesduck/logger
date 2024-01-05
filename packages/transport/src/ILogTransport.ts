import { FormatterLog } from '@salesduck/symbols-logs';
import { ILogFormat } from '@salesduck/format-logs';

/**
 * Defines a common transport interface that will allow
 * information to be delivered to the consumer
 */
export interface ILogTransport {
    /**
     * Return the current log level
     */
    getLevel(): number;

    /**
     * Return the current log format
     */
    getFormat(): ILogFormat;

    /**
     * Use this method to fix log in system
     */
    log(message: FormatterLog): void;
}
