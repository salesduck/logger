import { LogMessage, FormatterLog } from '@salesduck/symbols-logs';
import { ILogFormat } from '@project/ILogFormatter';

export abstract class Formatter<TOptions = unknown> implements ILogFormat {
    protected readonly options: TOptions;

    constructor(options?: TOptions) {
        this.options = options;
    }

    abstract format(log: LogMessage): FormatterLog;
}
