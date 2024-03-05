/**
 * Used to transfer the result without
 * losing the original data
 */
export const MESSAGE = Symbol.for('message');

/**
 * Used for set level without affect
 * when convert data to string
 */
export const LEVEL = Symbol.for('level');

/**
 * Priority levels
 *
 * fatal <- error <- warn <- info <- debug <- trace
 *
 * For more details see https://datatracker.ietf.org/doc/html/rfc5424
 */
export type LogLevel = { name: string; priority: number };

/**
 * Additional information passed with log
 */
export type Meta = Record<string, unknown>;

/**
 * Used to typify methods of the logger itself
 * Like info, warn, error
 */
export type Log<TLog extends Meta = Meta> = TLog & {
    message: string;
};

/**
 * Used as input to the formatter
 */
export type LogMessage<TLog extends Meta = Meta> = Log<TLog> & {
    [LEVEL]: LogLevel;
};

/**
 * Used as a result of the formatter and transport input data
 */
export type FormattedLogMessage<TLog extends Meta = Meta> = LogMessage<TLog> & {
    [MESSAGE]: string;
};
