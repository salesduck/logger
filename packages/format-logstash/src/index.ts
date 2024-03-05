import { LogMessage, FormattedLogMessage, MESSAGE, LEVEL } from '@salesduck/symbols-logs';
import { Formatter } from '@salesduck/format-logs';

export type LogstashFormatterOptions = {
    serializer: (data: unknown) => string;
};

export class LogstashFormat extends Formatter<LogstashFormatterOptions> {
    /**
     * NOTE: If you pass serializer: undefined, it will be overwritten default function
     */
    constructor(options?: LogstashFormatterOptions) {
        super({
            serializer: JSON.stringify,
            ...options
        });
    }

    format(log: LogMessage): FormattedLogMessage {
        const { message, timestamp, ...other } = log;

        const logstash = {};

        if (message) {
            logstash['@message'] = message;
        }

        if (timestamp) {
            logstash['@timestamp'] = timestamp;
        }

        other.level = log[LEVEL].name;

        logstash['@fields'] = other;

        return {
            ...log,
            [MESSAGE]: this.options.serializer(logstash)
        };
    }
}
