/**
 * Create an array of the last 10 years for the Chart.js x-axis.
 * The array starts from 9 years ago up to the current year.
 * 
 * @returns {number[]} Array of year numbers.
 */
export function xAxisChart() {
    const currentYear = new Date().getFullYear();
    const arr = [];
    for (let i = 9; i >= 0; i--) {
        arr.push(currentYear - i);
    }
    return arr
}