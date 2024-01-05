import { LogLevel, Log, LEVEL } from '@salesduck/symbols-logs';
import { ILogTransport } from '@salesduck/transport-logs';

export type LoggerOptions = {
    transports?: ILogTransport[];
};

export abstract class Logger {
    protected options: LoggerOptions;

    constructor(options?: LoggerOptions) {
        this.options = {
            transports: [],
            ...options
        };
    }

    /**
     * Allows you to send a message to a consumer
     * at any level
     *
     * WARNING: It's not recommended to use this method directly.
     * Use methods from logger, like log, warn etc.
     */
    log(level: LogLevel, log: Log): void {
        for (const transport of this.options.transports) {
            // NOTE: Skip transports with lower level
            if (level.priority > transport.getLevel()) continue;

            // NOTE: Send message
            transport.log(
                transport.getFormat().format({
                    ...log,
                    [LEVEL]: level
                })
            );
        }
    }
}
