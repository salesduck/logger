import { Transport, TransportOptions } from '@salesduck/transport-logs';
import { FormatterLog, MESSAGE } from '@salesduck/symbols-logs';

export type FetchTransportOptions = TransportOptions & {
    url: URL | string;
    init?: RequestInit;
    onError?: (error: Error) => void;
    onResponse?: (response: Response) => void;
};

export class FetchTransport extends Transport<FetchTransportOptions> {
    constructor(options: FetchTransportOptions) {
        super({
            onError: () => {},
            onResponse: () => {},
            ...options,
            init: { method: 'POST', ...options.init }
        });
    }

    log(message: FormatterLog): void {
        fetch(this.options.url, {
            ...this.options.init,
            body: message[MESSAGE]
        })
            .then(this.options.onResponse)
            .catch(this.options.onError);
    }
}
