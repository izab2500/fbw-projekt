/**
 * Fetch all countries with their currencies from the Restcountries API.
 * The result is sorted alphabetically by country name.
 * 
 * @returns {Promise<Object[]>} Promise that resolves to an array of country objects
 * @throws {Error} If the request fails or the response is not OK
 */
export async function getCountriesCurrencies() {
    const url = "https://restcountries.com/v3.1/all?fields=name,currencies";
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Failed to fetch countries`);

        const data = await res.json();
        return data.sort((a, b) => a.name.common.localeCompare(b.name.common)
        );

    } catch (err) {
        throw err;
    }
}