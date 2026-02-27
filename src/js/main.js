//scss - all partials
import "../scss/main.scss";
//es6 modules
import {getCountriesCurrencies} from "./modules/api/getCountriesCurrencies";
import {getSupportedCurrencies} from "./modules/api/getSupportedCurrencies";
import {setCountriesSelects} from "./modules/ui/forms/setCountriesSelects";
import { swapSelectElements } from "./modules/ui/swapSelectElements";
import { currencyPairs } from "./modules/utils/currencyPairs";
import { getExchangeRate } from "./modules/api/getExchangeRate";
import { xAxisChart } from "./modules/utils/xAxisChart";
import { getHistoricalExchangeRates } from "./modules/api/getHistoricalExchangeRates";
import { linechart } from "./modules/ui/charts/linechart";
import { generateTable } from "./modules/utils/generateTable";
import { formatNumber } from "./modules/utils/formatNumber";

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

//enter an amount - only allow integers and floats with two decimals
const input = document.querySelector("#amount");
input.addEventListener("input", function (evt) {
    const value = evt.target.value.trim();
    if (value === "") {
        input.value = 1;
        return
    } if (!Number(value)) {
        input.value = value.slice(0, -1)
        return
    } if (Number(value) && value.includes(".")) {
        const arr = input.value.split(".");
        arr[1].length > 2 ? input.value = arr.join(".").slice(0, -1) : input.value = arr.join(".")
    }
})

//swap select elements
const swapBtn = document.querySelector("#swap-btn");
swapBtn.addEventListener("click", swapSelectElements);

//references regarding currency value pairs
const amount = document.querySelector("#amount");
const currencyValuesDiv = document.querySelector("#exchange-rate");
const exchangeRateError = document.querySelector("#exchange-rate-error");
const samecurrencyError = document.querySelector("#same-currency-error");
const convertBtn = document.querySelector("#convert-btn");
//references regarding linechart and table
const xAxisArr = xAxisChart();
const linechartCanvas = document.querySelector("#linechart");
const chartError = document.querySelector("#chart-error");
const spinner = document.querySelector("#spinner-chart");
const table = document.querySelector("#table");

let myLineChart = null;
async function initConvert() {
    //error messages
    samecurrencyError.hidden = true;
    samecurrencyError.textContent = "";
    exchangeRateError.hidden = true;
    exchangeRateError.textContent = "";
    //From select <---> To select OR To select <---> From select
    const firstCountry = document.querySelector("#parent-from-to > div:first-child >select");
    const secondCountry = document.querySelector("#parent-from-to > div:nth-child(3) >select");
    const currenciesPairObj = currencyPairs(firstCountry.value, secondCountry.value, supportedCountriesArr)
    const { firstCurrency, secondCurrency } = currenciesPairObj;

    //display currency rates e.g. 1 Sek = 0.11 USD
    try {
        if (firstCurrency === secondCurrency) {
            samecurrencyError.hidden = false;
            samecurrencyError.textContent = "Choose countries with different currencies";
            return
        }
        const { rates } = await getExchangeRate(firstCurrency, secondCurrency)
        currencyValuesDiv.textContent = `${amount.value} ${firstCurrency} = ${formatNumber((Number(amount.value) * rates[secondCurrency]))} ${secondCurrency} `

    } catch (err) {
        exchangeRateError.hidden = false;
        exchangeRateError.textContent = `${err}`;
        currencyValuesDiv.textContent = "";
    }
    //display linechart and generate hidden table for assistive technology users
    try {
        //error message
        chartError.hidden = true;
        chartError.textContent = "";
        //
        linechartCanvas.style.display = "none";
        spinner.hidden = false
        const startYear = xAxisArr[0];
        const endYear = xAxisArr[xAxisArr.length - 1];
        const label = `${firstCurrency} / ${secondCurrency}`;
        const { historicalRates } = await getHistoricalExchangeRates(startYear, endYear, firstCurrency, secondCurrency);
        if (myLineChart) myLineChart.destroy();
        myLineChart = linechart(linechartCanvas, xAxisArr, historicalRates, label)
        linechartCanvas.style.display = "block";
        //table corresponding to linegraph data for as tech users (visibility:hidden)
        generateTable(table, firstCurrency, secondCurrency, xAxisArr, historicalRates)
    } catch (err) {
        chartError.hidden = false;
        chartError.textContent = `${err}`;
        //hide table from DOM:assistive technology to not intrepret wrong data
        table.hidden = true
    } finally {
        spinner.hidden = true

    }

}

initConvert();

convertBtn.addEventListener("click", initConvert);