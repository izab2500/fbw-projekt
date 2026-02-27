/**
 * Returns a formatted string representing a number:
 * - integer part: 0 || > 0
 * - decimal part: first occurrence of a number and > 0 || 0 (subsequent decimal)
 * @param {number} num - A integer or float
 * @returns {string} A string representing a number
 * 
 * @example
 * 100
 * 1111.11
 * 22.000023
 * 0.0011
 * 0.11
 * 
 */

export function formatNumber(num) {
    const [int, dec] = num.toString().split(".")
    let decimal = null;
    for (let i = 0; i < dec?.length; i++) {
        if (Number(dec[i]) > 0) {
            decimal = dec.slice(0, dec.indexOf(dec[i]) + 1) + (dec[i + 1] || 0)
            break;
        }
    }
    return !decimal ? int : `${int || 0}.${decimal}`
    
}