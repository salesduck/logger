import { LogMessage, FormatterLog, MESSAGE } from '@salesduck/symbols-logs';
import { Formatter } from '@salesduck/format-logs';

export type JsonFormatterOptions = {
    serializer: (data: unknown) => string;
};

export class JsonFormat extends Formatter<JsonFormatterOptions> {
    constructor(options: JsonFormatterOptions = { serializer: JSON.stringify }) {
        super({
            ...options,
            serializer: options.serializer
        });
    }

    format(log: LogMessage): FormatterLog {
        return {
            ...log,
            [MESSAGE]: this.options.serializer(log)
        };
    }
}
