import { Transport, TransportOptions } from '@salesduck/transport-logs';
import { FormatterLog, MESSAGE } from '@salesduck/symbols-logs';

export type ConsoleTranportOptions = TransportOptions & {
    /**
     * You can determine which method to send
     */
    method?: (message: string) => void;
};

export class ConsoleTransport extends Transport<ConsoleTranportOptions> {
    constructor(options?: ConsoleTranportOptions) {
        // NOTE: why console.log? Because supported on every platform
        super({ method: console.log, ...options });
    }

    log(message: FormatterLog): void {
        this.options.method(message[MESSAGE]);
    }
}
