/**
 * Fetch the list of supported currencies from the Frankfurter API.
 * 
 * @returns {Promise<Object>} Promise that resolves to an object containing currency codes and their rates
 * @throws {Error} If the request fails or the response is not OK
 */
export async function getSupportedCurrencies() {
    const url = "https://api.frankfurter.dev/v1/latest";
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Failed to fetch supported currencies`)
        return res.json();
    } catch (err) {
        throw err;
    }
}