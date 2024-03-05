import { LogLevel, Log, Meta, LEVEL } from '@salesduck/symbols-logs';
import { ILogTransport } from '@salesduck/transport-logs';

export type LoggerOptions = {
    onError?: (err: Error) => void;
    transports?: ILogTransport[];
    meta?: Meta;
};

export abstract class Logger<TLog extends Log = Log> {
    public readonly options: LoggerOptions;

    constructor(options?: LoggerOptions) {
        this.options = {
            transports: [],
            onError: () => {},
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
    log(level: LogLevel, log: TLog): void {
        try {
            for (const transport of this.options.transports) {
                // NOTE: Skip transports with lower level
                if (level.priority > transport.getLevel()) continue;

                // NOTE: Send message
                transport.log(
                    transport.getFormat().format({
                        ...log,
                        ...this.options.meta,
                        [LEVEL]: level
                    })
                );
            }
        } catch (err) {
            this.options.onError(err instanceof Error ? err : new Error(String(err)));
        }
    }

    /**
     * Replace additional information for each log
     */
    meta(meta: Meta = this.options.meta): void {
        this.options.meta = meta;
    }
}
