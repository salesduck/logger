import { LogMessage, FormatterLog, MESSAGE } from '@salesduck/symbols-logs';
import { Formatter } from '@project/Formatter';

export class DefaultFormatter extends Formatter {
    format(log: LogMessage): FormatterLog {
        return {
            ...log,
            [MESSAGE]: log.message
        };
    }
}
