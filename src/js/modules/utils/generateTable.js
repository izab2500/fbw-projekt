import { formatNumber } from "./formatNumber";

/**
 * Generates an accessible table corresponding to linegraph data, for historical exchange rates and inserts it into the given table element.
 *
 * The table has:
 * - A caption describing the base and other currency
 * - A header row with years
 * - A row for the base currency with all values = 1
 * - A row for the other currency with the exchange rates for each year
 *
 * @param {HTMLTableElement} tableEl - Table element where the content will be inserted
 * @param {string} baseCurrency - Currency code of the base country
 * @param {string} otherCurrency - Currency code of the other country 
 * @param {Array<number|string>} yearsArr - Array of years to show in the table header
 * @param {Array<number>} ratesArr - Array of exchange rates for the other country
 */

export function generateTable(tableEl, baseCurrency, otherCurrency, yearsArr, ratesArr) {
  // Clear previous content
  tableEl.innerHTML = '';
  // Create caption
  const caption = document.createElement('caption');
  caption.textContent = `Exchange rates for ${baseCurrency}/${otherCurrency} over the last 10 years`;
  tableEl.appendChild(caption);

  // Create thead
  const thead = document.createElement('thead');
  const trHead = document.createElement('tr');

  // Year header col
  const thYear = document.createElement('th');
  thYear.scope = 'col';
  thYear.textContent = 'Year';
  trHead.appendChild(thYear);

  // Year cols
  yearsArr.forEach(y => {
    const th = document.createElement('th');
    th.scope = 'col';
    th.textContent = y;
    trHead.appendChild(th);
  });

  thead.appendChild(trHead);
  tableEl.appendChild(thead);

  // Create tbody
  const tbody = document.createElement('tbody');

  // Base country row (all 1)
  const trBase = document.createElement('tr');
  const thBase = document.createElement('th');
  thBase.scope = 'row';
  thBase.textContent = baseCurrency;
  trBase.appendChild(thBase);

  yearsArr.forEach(() => {
    const td = document.createElement('td');
    td.textContent = 1;
    trBase.appendChild(td);
  });
  tbody.appendChild(trBase);

  // Other country row (rates from array)
  const trOther = document.createElement('tr');
  const thOther = document.createElement('th');
  thOther.scope = 'row';
  thOther.textContent = otherCurrency;
  trOther.appendChild(thOther);

  ratesArr.forEach(r => {
    const td = document.createElement('td');
    td.textContent = formatNumber(r);
    trOther.appendChild(td);
  });
  tbody.appendChild(trOther);

  // Append tbody to table
  tableEl.appendChild(tbody);
}