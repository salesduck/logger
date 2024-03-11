import { ILogFormat, DefaultFormatter } from '@salesduck/format-logs';
import { FormattedLogMessage, LogLevel } from '@salesduck/symbols-logs';
import { ILogTransport } from '@project/ILogTransport';

export type TransportOptions = {
    /**
     * Defines the logging level to which
     * the transport responds
     */
    level?: number;

    /**
     * Formats data for the current transport
     */
    formatter?: ILogFormat;

    /**
     * Decides whether to support sending a message
     */
    usingStrategy?: (logLevel: number, transportLevel: number) => boolean;
};

export const FilterLimitUsingTransportStrategy = (logLevel: number, transportLevel: number) => logLevel <= transportLevel;

export const OnlyOneLevelUsingTransportStrategy = (logLevel: number, transportLevel: number) => logLevel === transportLevel;

export abstract class Transport<TOptions extends TransportOptions = TransportOptions> implements ILogTransport {
    /**
     * Used to configure transport
     */
    public readonly options: TOptions;

    constructor(options?: TOptions) {
        this.options = {
            // NOTE: by default use very low level
            level: 99,
            formatter: new DefaultFormatter(),
            usingStrategy: FilterLimitUsingTransportStrategy,
            ...options
        };
    }

    canUse(logLevel: LogLevel): boolean {
        return this.options.usingStrategy(logLevel.priority, this.options.level);
    }

    getFormat(): ILogFormat {
        return this.options.formatter;
    }

    /**
     * Use this method to fix log in system
     */
    abstract log(message: FormattedLogMessage): Promise<void>;
}
