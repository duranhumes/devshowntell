import * as uuid from 'uuid/v4'

/**
 * Returns the value from a promise and an error if it exists.
 *
 * @param {promise} promise
 *
 * @returns {array} [value, error]
 */
interface CustomError extends Error {
    code: string | number
}
export async function promiseWrapper<E = CustomError>(
    promise: Promise<any>
): Promise<[any | undefined, undefined | E]> {
    try {
        return [await promise, undefined]
    } catch (e) {
        return [undefined, e]
    }
}

/**
 * Boils uuid string down to only numbers and letters
 *
 * @returns string
 */
export function formattedUUID() {
    return uuid().replace(/[^a-z0-9]/gi, '')
}

/**
 * Check if object is empty
 *
 * @param {object} obj
 *
 * @returns boolean
 */
export function isEmpty(obj: object) {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            return false
        }
    }

    return true
}
