import {OrderedMap} from 'immutable'
import {logError} from "./error-logger";

/**
 * Transform JSON to income DataRecord objects
 *
 * @param values
 * @param DataRecord
 * @returns {*}
 */
export function responseJSONToUsers(values, DataRecord) {
    let parsedValues = null;

    try {
        parsedValues = JSON.parse(values)
    } catch (e) {
        logError(e, 1);
        return parsedValues
    }

    return new OrderedMap(
        parsedValues.map((value) => [
            value.userId,
            new DataRecord({...value})
        ])
    )
}

/**
 * Here should be translation...or another place if it will be complex
 *
 * @param messageToTranslate
 * @returns {*}
 */
export function t(messageToTranslate) {

    //@TODO apply any translate
    return messageToTranslate;
}

/**
 * Generate keys for react elements
 *
 * @param rest
 * @returns {string}
 */
export const generateKey = (...rest) => btoa(rest.join(''));