import { LogMessage, FormattedLogMessage, MESSAGE } from '@salesduck/symbols-logs';
import { Formatter } from '@project/Formatter';

export class DefaultFormatter extends Formatter<unknown> {
    format(log: LogMessage): FormattedLogMessage {
        return {
            ...log,
            [MESSAGE]: log.message
        };
    }
}
