import { LogMessage, FormattedLog, MESSAGE } from '@salesduck/symbols-logs';
import { Formatter } from '@project/Formatter';

export class DefaultFormatter extends Formatter {
    format(log: LogMessage): FormattedLog {
        return {
            ...log,
            [MESSAGE]: log.message
        };
    }
}
