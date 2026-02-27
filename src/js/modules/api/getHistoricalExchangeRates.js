import { formatNumber } from "../utils/formatNumber";
/**
 * Fetch historical exchange rates between two currencies over a range of years.
 * Returns arrays for base and reversed rates for each year.
 * 
 * @param {number} startYear - The first year of the range
 * @param {number} endYear - The last year of the range
 * @param {string} fromCurrency - Base currency code (e.g. "USD")
 * @param {string} toCurrency - Target currency code (e.g. "EUR")
 * @returns {Promise<Object>} Promise that resolves to an object with:
 *   - historicalRates: array of rates from fromCurrency to toCurrency
 * @throws {Error} If the request fails or response is not OK
 */
export async function getHistoricalExchangeRates(startYear, endYear, fromCurrency, toCurrency) {
    const url = `https://api.frankfurter.dev/v1/${startYear}-01-01..${endYear}-12-31?from=${fromCurrency}&to=${toCurrency}`;
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Failed to fetch exchange rate range for: ${fromCurrency}/${toCurrency}`)
        const { rates } = await res.json();
        let year = startYear;
        const arr = [];
        Object.entries(rates).forEach(date => {
            if (date[0].startsWith(year.toString())) {
                arr.push(formatNumber(Object.values(date[1])[0]))
                year++
            }
        })
        return {
            historicalRates: arr,
        }
    } catch (err) {
        throw err;

    }
}