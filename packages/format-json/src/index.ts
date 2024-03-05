import { LogMessage, FormattedLogMessage, MESSAGE } from '@salesduck/symbols-logs';
import { Formatter } from '@salesduck/format-logs';

export type JsonFormatterOptions = {
    serializer: (data: unknown) => string;
};

export class JsonFormat extends Formatter<JsonFormatterOptions> {
    /**
     * NOTE: If you pass serializer: undefined, it will be overwritten default function
     */
    constructor(options?: JsonFormatterOptions) {
        super({
            serializer: JSON.stringify,
            ...options
        });
    }

    format(log: LogMessage): FormattedLogMessage {
        return {
            ...log,
            [MESSAGE]: this.options.serializer(log)
        };
    }
}
