import {
    Chart,
    Colors,
    LineController,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Tooltip,
    Legend
} from 'chart.js';

Chart.register(
    Colors,
    LineController,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend
);

/**
 * Create and render a linechart with datasets using Chart.js.
 * 
 * @param {HTMLCanvasElement} canvasEl - The canvas element where the chart will be drawn
 * @param {Array<number|string>} xaxis - Array of years for the x-axis
 * @param {Array<number>} currenciesArr - Array with historical currency rates (10-years)
 * @param {string} label - Label for the dataset
 * @returns {Chart} The created Chart.js instance
 */
export function linechart(canvasEl, xaxis, currenciesArr, label) {
    return new Chart(canvasEl, {
        type: 'line',
        data: {
            labels: xaxis,
            datasets: [
                {
                    label,
                    data: currenciesArr,
                    borderColor: '#CC7000',
                    backgroundColor: 'rgba(154, 112, 172, 0.2)',
                    tension: 0.3,
                    pointBackgroundColor:"lightgreen",
                    pointBorderColor:"lightgreen",
                    pointBorderWidth:7,
                },
            ],
        },
        options: {
            animation: false,
            responsive: true,
            maintainAspectRatio: false,
            aspectRatio:2,
            scales: {
                x: {
                    grid: { display: false },
                    ticks: {
                        padding: 5,
                    },
                    title: {
                        display: true,
                        text: 'Year',
                        padding: { top: 10, bottom: 10 }
                    }
                },
                y: { 
                    grid: { display: false },
                    ticks: {
                        padding: 5
                    },
                    title: {
                        display: true,
                        text: 'Currency rate',
                        padding: { top: 10, bottom: 10 }
                    }
                }
            },
            plugins: {
                legend: {
                    position:"top",
                    padding:{bottom:20},
                    labels: { font: { size: 14, weight: "bold" } },
                }, tooltip: {
                    intersect: true,
                }
            }
        }
    });
}