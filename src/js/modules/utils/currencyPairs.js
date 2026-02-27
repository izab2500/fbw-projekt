/**
 * Get the currency codes for two selected countries.
 *
 * @param {string} firstSelectCountry - Name of the first country selected
 * @param {string} secondSelectCountry - Name of the second country selected
 * @param {Object[]} arr - Array of country objects with currencies
 * @returns {Object} An object with firstCurrency and secondCurrency codes
 */
export function currencyPairs(firstSelectCountry, secondSelectCountry, arr) {
    const currencyPairObj = {};
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].name.common === firstSelectCountry) {
            currencyPairObj.firstCurrency = Object.keys(arr[i].currencies)[0];
        } if (arr[i].name.common === secondSelectCountry) {
            currencyPairObj.secondCurrency = Object.keys(arr[i].currencies)[0];
        }

        if ((currencyPairObj.firstCurrency && currencyPairObj.secondCurrency)) break;
    }
    return currencyPairObj
}