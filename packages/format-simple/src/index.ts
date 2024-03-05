import { LogMessage, FormattedLogMessage, MESSAGE, LEVEL } from '@salesduck/symbols-logs';
import { Formatter } from '@salesduck/format-logs';

export type SimpleFormatterOptions = {
    serializer: (data: unknown) => string;
};

export class SimpleFormat extends Formatter<SimpleFormatterOptions> {
    constructor(options: SimpleFormatterOptions = { serializer: JSON.stringify }) {
        super({
            ...options,
            serializer: options.serializer
        });
    }

    format(log: LogMessage): FormattedLogMessage {
        const { message, [LEVEL]: level, ...other } = log;

        const serialized = (Object.keys(other).length && ` ${this.options.serializer(other)}`) || '';

        return {
            ...log,
            [MESSAGE]: `[${level.name.toUpperCase()}]: ${message}${serialized}`
        };
    }
}
