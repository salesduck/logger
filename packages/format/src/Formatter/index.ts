import { LogMessage, FormattedLogMessage } from '@salesduck/symbols-logs';
import { ILogFormat } from '@project/ILogFormatter';

export abstract class Formatter<TOptions = unknown> implements ILogFormat {
    public readonly options: TOptions;

    constructor(options?: TOptions) {
        this.options = options;
    }

    abstract format(log: LogMessage): FormattedLogMessage;
}
