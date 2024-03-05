import { ILogFormat, DefaultFormatter } from '@salesduck/format-logs';
import { FormattedLogMessage, Log } from '@salesduck/symbols-logs';
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
};

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
            ...options
        };
    }

    getLevel(): number {
        return this.options.level;
    }

    getFormat(): ILogFormat {
        return this.options.formatter;
    }

    /**
     * Use this method to fix log in system
     */
    abstract log(message: FormattedLogMessage): Promise<void>;
}
