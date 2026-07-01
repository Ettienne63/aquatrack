// ==============================
// Load Data
// ==============================
const chartReadings = loadReadings();

// ==============================
// Select Elements
// ==============================

const chartParameterSelect = document.getElementById("chart-parameter")
const readingsChartCanvas = document.getElementById("readings-chart")
const chartEmptyState = document.getElementById("chart-empty-state")


// ==============================
// Create Chart
// ==============================

let readingsChart = null;

// ==============================
// Update Chart
// ==============================

function updateReadingsChart() {

    if(chartReadings.length === 0){
        readingsChartCanvas.classList.add("d-none");
        chartEmptyState.classList.remove("d-none");
        return
    }
    const selectedParameter = chartParameterSelect.value;

    const sortedChartReadings = getReadingsSortedByDate(chartReadings).reverse()
    

    const labels = sortedChartReadings.map(function (reading) {
        return reading.recordedDate;
    });

    const values = getParameterValues(sortedChartReadings,selectedParameter)

    if (readingsChart !== null) {
        readingsChart.destroy();
    }

    readingsChart = new Chart(readingsChartCanvas, {
        type: "line",
        data: {
            labels: labels,
            datasets: [
                {
                    label: parameterConfig[selectedParameter].fullLabel,
                    data: values,
                    tension: 0.3
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true
                },
                tooltip:{
                    callbacks:{
                        label: function (context){
                            return parameterConfig[selectedParameter].fullLabel + ": " +
                             context.raw + 
                             parameterConfig[selectedParameter].unit
                        }
                    }
                }
            }
        }
    });
}
// ==============================
// Initialize Chart
// ==============================
updateReadingsChart();

// ==============================
// Listen For User Input
// ==============================

chartParameterSelect.addEventListener("change", updateReadingsChart)