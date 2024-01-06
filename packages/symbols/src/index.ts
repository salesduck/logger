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
 * Log data passed to any log method
 */
export type Log = Meta & {
    message: string;
};

/**
 * Log data passed to universal log method
 */
export type LogMessage = Log & {
    [LEVEL]: LogLevel;
};

/**
 * Log data returned from log formatters
 */
export type FormatterLog = LogMessage & {
    [MESSAGE]: string;
};
