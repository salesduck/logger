import { Transport, TransportOptions } from '@salesduck/transport-logs';
import { FormattedLogMessage, MESSAGE } from '@salesduck/symbols-logs';

export type ConsoleTranportOptions = TransportOptions & {
    /**
     * You can determine which method to send
     */
    method?: (message: string) => void;
};

export class ConsoleTransport extends Transport<ConsoleTranportOptions> {
    /**
     * NOTE: If you pass method: undefined, it will be overwritten default function
     */
    constructor(options?: ConsoleTranportOptions) {
        // NOTE: why console.log? Because supported on every platform
        super({ method: console.log, ...options });
    }

    log(message: FormattedLogMessage): Promise<void> {
        this.options.method(message[MESSAGE]);

        return Promise.resolve();
    }
}
