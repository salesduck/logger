import { Transport, TransportOptions } from '@salesduck/transport-logs';
import { FormattedLogMessage, MESSAGE } from '@salesduck/symbols-logs';

export type FetchTransportOptions = TransportOptions & {
    url: URL | string;
    init?: RequestInit;
};

export class FetchTransport extends Transport<FetchTransportOptions> {
    constructor(options: FetchTransportOptions) {
        super({
            ...options,
            init: { method: 'POST', ...options.init }
        });
    }

    async log(message: FormattedLogMessage): Promise<void> {
        const response = await fetch(this.options.url, {
            ...this.options.init,
            body: message[MESSAGE]
        });

        if (!response.ok) throw new Error(`Failed to fetch "${this.options.url.toString()}" with status ${response.status}`);
    }
}
