//scss - all partials
import "../scss/main.scss";
//es6 modules
import {getCountriesCurrencies} from "./modules/api/getCountriesCurrencies";
import {getSupportedCurrencies} from "./modules/api/getSupportedCurrencies";
import {setCountriesSelects} from "./modules/ui/forms/setCountriesSelects";

//set supported country names in select-elements based on supported currencies in frankfurter api
const fromCountries = document.querySelector("#from-country");
const toCountries = document.querySelector("#to-country");
const app = document.querySelector("#app");
const appError = document.querySelector("#app-error");
//array with country names and their corresponding currencies
let supportedCountriesArr;

/**
 * Fetches supported countries and currencies from the APIs,
 * filters the countries to only those with supported currencies,
 * and populates the "from" and "to" select-elements in the form.
 * 
 * If the APIs fail, hides the app and shows an error message.
 * 
 * This function updates the global supportedCountriesArr variable.
 *
 */
async function populateSelectElements() {
    try {
        const countriesCurrenciesArr = await getCountriesCurrencies();
        const { base, rates } = await getSupportedCurrencies();
        const validCurrencies = new Set(Object.keys(rates));
        validCurrencies.add(base);
        supportedCountriesArr = countriesCurrenciesArr.filter(el => validCurrencies.has(Object.keys(el.currencies)[0]));
        setCountriesSelects(supportedCountriesArr, fromCountries, toCountries);

    } catch (err) {
        app.style.display = "none";
        appError.textContent = `${err}`
        return
    }
}

await populateSelectElements();