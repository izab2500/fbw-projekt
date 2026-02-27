/**
 * Add to the "from" and "to" select-elements with country options that have supported currencies.
 * Sets default selections for Sweden (from) and United States (to).
 * 
 * @param {Object[]} arr - Array of country objects with currency data
 * @param {HTMLSelectElement} fromSelect - The select-element for the "from" country
 * @param {HTMLSelectElement} toSelect - The select-element for the "to" country
 */
export function setCountriesSelects(arr, fromSelect, toSelect) {
    if (!Array.isArray(arr) || arr.length === 0) return;

    arr.forEach(country => {
        const fromOption = document.createElement("option");
        const toOption = document.createElement("option");

        fromOption.value = country.name.common;
        fromOption.textContent = country.name.common;
        toOption.value = country.name.common;
        toOption.textContent = country.name.common;

        if (country.name.common === "Sweden") fromOption.selected = true;
        if (country.name.common === "United States") toOption.selected = true;

        fromSelect.appendChild(fromOption);
        toSelect.appendChild(toOption);
    });
}