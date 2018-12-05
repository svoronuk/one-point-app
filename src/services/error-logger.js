/**
 * Here different log methods
 */

export const logError = (msg = 'error logging without entry message', errorCode) => console.error(msg, '--errorCode:', errorCode);

export const logWarning = (msg = 'warning logging without entry message', warnCode) => console.warn(msg, '--warningCode:', warnCode);

export const logDebug = (msg = 'debug logging without entry message') => console.log(msg);