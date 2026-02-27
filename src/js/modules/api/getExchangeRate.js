/**
 * Fetch the latest exchange rate between two currencies from the API.
 * 
 * @param {string} fromCurrency - Base currency code
 * @param {string} toCurrency - Target currency code
 * @returns {Promise<Object>} Promise that resolves to the exchange rate data
 * @throws {Error} If the request fails or the response is not OK
 */
export async function getExchangeRate(fromCurrency, toCurrency) {
    const url = `https://api.frankfurter.dev/v1/latest?from=${fromCurrency}&to=${toCurrency}`;
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Failed to get exchange rates`);
        return await res.json();

    } catch (err) {
        throw err;
    }
}