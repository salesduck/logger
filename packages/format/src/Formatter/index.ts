import { LogMessage, FormattedLog } from '@salesduck/symbols-logs';
import { ILogFormat } from '@project/ILogFormatter';

export abstract class Formatter<TOptions = unknown> implements ILogFormat {
    public readonly options: TOptions;

    constructor(options?: TOptions) {
        this.options = options;
    }

    abstract format(log: LogMessage): FormattedLog;
}
