import { LogMessage, FormatterLog, MESSAGE } from '@salesduck/symbols-logs';
import { Formatter } from '@salesduck/format-logs';

export type LogStashFormatterOptions = {
    serializer: (data: unknown) => string;
};

export class LogStashFormat extends Formatter<LogStashFormatterOptions> {
    constructor(options: LogStashFormatterOptions = { serializer: JSON.stringify }) {
        super({
            ...options,
            serializer: options.serializer
        });
    }

    format(log: LogMessage): FormatterLog {
        const { message, timestamp, ...other } = log;

        const logstash = {};

        if (log.message) {
            logstash['@message'] = message;
        }

        if (log.timestamp) {
            logstash['@timestamp'] = timestamp;
        }

        logstash['@fields'] = other;

        return {
            ...log,
            [MESSAGE]: this.options.serializer(logstash)
        };
    }
}
