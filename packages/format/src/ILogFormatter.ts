import { LogMessage, FormatterLog } from '@salesduck/symbols-logs';

export interface ILogFormat {
    /**
     * Generates the format of the message that
     * will be sent to the transport in special
     * symbol without change source data
     */
    format(log: LogMessage): FormatterLog;
}
