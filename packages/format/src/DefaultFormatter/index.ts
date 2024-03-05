import { LogMessage, FormattedLogMessage, MESSAGE } from '@salesduck/symbols-logs';
import { Formatter } from '@project/Formatter';

export class DefaultFormatter extends Formatter {
    format(log: LogMessage): FormattedLogMessage {
        return {
            ...log,
            [MESSAGE]: log.message
        };
    }
}
