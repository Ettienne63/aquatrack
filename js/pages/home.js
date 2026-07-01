// ==============================
//  Load Data
// ==============================

const readings = loadReadings();
const maintenance = loadMaintenance();

// ==============================
//  Helper Functions
// ==============================

function deleteReading(selectedId) {
  const confirmed = confirm("Are you sure you want to delete the reading?");

  if (!confirmed) {
    return;
  }

  const updatedReadings = readings.filter(function (reading) {
    return reading.readingId !== selectedId;
  });

  saveReadings(updatedReadings);
  window.location.reload();
}

// ==============================
//  Display Dashboard Alerts
// ==============================
function displayDashboardAlerts(latestReading) {
  const dashboardAlertsElement = document.getElementById("dashboard-alerts");
  const dashboardAlerts = getDashboardAlerts(latestReading, maintenance);

  dashboardAlertsElement.innerHTML = dashboardAlerts.map(function (alert) {
    return `<div> *${alert} </div>`
  })
    .join("")
}

function displayEmptyDashboardAlerts() {
  const dashboardAlertsElement = document.getElementById("dashboard-alerts");

  dashboardAlertsElement.innerHTML =

    `<div>No Alerts yet. Add your first reading to start monitoring your tank.</div>`;
}
// ==============================
//  Display Tank Health
// ==============================
function displayTankHealth(latestReading) {
  const healthStatus = getTankHealthStatus(latestReading);
  const healthBadge = document.getElementById("tank-health-badge");
  const healthReasons = document.getElementById("tank-health-reasons");

  healthBadge.textContent = healthStatus.label;
  healthBadge.className = healthStatus.className;

  healthReasons.innerHTML = healthStatus.reasons
    .map(function (reason) {
      return `<div>* ${reason}</div>`;
    })
    .join("");
}
// ===============================
//  Display Health Recommendations
// ===============================
function displayTankHealthRecommendations(latestReading) {
  const tankRecommendationElement = document.getElementById("tank-health-recommendations");
  const healthRecommendations = getTankHealthRecommendations(latestReading);

  tankRecommendationElement.innerHTML = healthRecommendations
    .map(function (recommendation) {
      return `<div>Recommended: ${recommendation}</div>`;
    })
    .join("");
}
// ==============================
//  Tank Status Display
// ==============================
function displayLatestReading(latestReading) {

  document.getElementById("latest-temperature").textContent =
    latestReading.temperature + "°C";

  document.getElementById("latest-ph").textContent =
    latestReading.ph;

  document.getElementById("latest-ammonia").textContent =
    latestReading.ammonia + " ppm";

  document.getElementById("latest-nitrite").textContent =
    latestReading.nitrite + " ppm";

  document.getElementById("latest-nitrate").textContent =
    latestReading.nitrate + " ppm";

  document.getElementById("latest-date").textContent =
    latestReading.recordedDate;

  document.getElementById("latest-notes").textContent =
    latestReading.notes || "No notes";
}

// ==============================
//  Display Action Buttons
// ==============================
function displayLatestActions(latestReading) {
  const latestActions = document.getElementById("latest-reading-actions");

  latestActions.innerHTML = `
    <button
      class="btn btn-sm btn-danger"
      id="delete-latest-reading-btn"
      data-id="${latestReading.readingId}">
      Delete Latest
    </button>

    <a
      href="edit-reading.html?id=${latestReading.readingId}"
      class="btn btn-sm btn-primary">
      Edit Latest
    </a>
  `;
}

// ==============================
//  Setup Latest Delete Button
// ==============================

function setupLatestDeleteButton() {
  const deleteLatestButton =
    document.getElementById("delete-latest-reading-btn");

  deleteLatestButton.addEventListener("click", function () {
    const selectedId = Number(deleteLatestButton.dataset.id);
    deleteReading(selectedId);
  });
}

// ==============================
//  Tank Status Section
// ==============================

if (readings.length > 0) {
  const latestReading = getLatestReadingByDate(readings);

  displayDashboardAlerts(latestReading)

  displayTankHealth(latestReading)

  displayTankHealthRecommendations(latestReading)

  displayLatestReading(latestReading)

  displayLatestActions(latestReading)

  setupLatestDeleteButton()

} else {
  const emptyTankStatusActions =
    document.getElementById("empty-tank-status-actions");

  emptyTankStatusActions.innerHTML = `
    <a href="add-reading.html" class="btn btn-primary btn-sm">
      Add your first reading
    </a>
  `;

  displayEmptyDashboardAlerts()
}

// ==============================
//  Recent Readings Setup
// ==============================

const recentReadingsContainer = document.getElementById("recent-readings");
const searchInput = document.getElementById("search-readings");
const sortSelect = document.getElementById("sort-readings");

const recentReadings =
  getReadingsSortedByDate(readings).slice(1, 4);


// ==============================
//  Recent Readings Display
// ==============================

function displayRecentReadings(readingsToDisplay) {
  recentReadingsContainer.innerHTML = "";

  if (readingsToDisplay.length === 0) {
    recentReadingsContainer.innerHTML = `
      <div class="list-group-item text-muted">
        <p class="mb-2">
          No recent readings yet. Add at least two readings to start seeing history.
        </p>

        <a href="add-reading.html" class="btn btn-primary btn-sm">
          Add more readings
        </a>
      </div>
    `;

    return;
  }

  readingsToDisplay.forEach(function (reading) {
    const readingItem = document.createElement("div");

    readingItem.className = "list-group-item";

    readingItem.innerHTML = `
  <div class="d-flex justify-content-between align-items-start mb-3">
    <div>
      <h3 class="h6 mb-1">${reading.recordedDate}</h3>
      <p class="text-muted small mb-0">${reading.notes || "No notes"}</p>
    </div>

    <div class="d-flex gap-2">
      <a
        href="edit-reading.html?id=${reading.readingId}"
        class="btn btn-sm btn-primary">
        Edit
      </a>

      <button
        class="btn btn-sm btn-danger delete-reading-btn"
        data-id="${reading.readingId}">
        Delete
      </button>
    </div>
  </div>

  <div class="row g-3">
    <div class="col-md-4 col-6">
      <div class="text-muted small">Temperature</div>
      ${reading.temperature}°C
    </div>

    <div class="col-md-4 col-6">
      <div class="text-muted small">pH</div>
      ${reading.ph}
    </div>

    <div class="col-md-4 col-6">
      <div class="text-muted small">Ammonia</div>
      ${reading.ammonia} ppm
    </div>

    <div class="col-md-4 col-6">
      <div class="text-muted small">Nitrite</div>
      ${reading.nitrite} ppm
    </div>

    <div class="col-md-4 col-6">
      <div class="text-muted small">Nitrate</div>
      ${reading.nitrate} ppm
    </div>
  </div>
`;
    recentReadingsContainer.appendChild(readingItem);
  });
}


// ==============================
//  Search + Sort Recent Readings
// ==============================

function updateReadingsList() {
  const searchText = searchInput.value.toLowerCase();
  const sortValue = sortSelect.value;

  let readingsToDisplay = [...recentReadings];

  if (sortValue === "newest") {
    readingsToDisplay.sort(function (a, b) {
      return new Date(b.recordedDate) - new Date(a.recordedDate);
    });
  }

  if (sortValue === "oldest") {
    readingsToDisplay.sort(function (a, b) {
      return new Date(a.recordedDate) - new Date(b.recordedDate);
    });
  }

  readingsToDisplay = readingsToDisplay.filter(function (reading) {
    return (
      String(reading.recordedDate).toLowerCase().includes(searchText) ||
      String(reading.temperature).toLowerCase().includes(searchText) ||
      String(reading.ph).toLowerCase().includes(searchText) ||
      String(reading.ammonia).toLowerCase().includes(searchText) ||
      String(reading.nitrite).toLowerCase().includes(searchText) ||
      String(reading.nitrate).toLowerCase().includes(searchText) ||
      String(reading.notes || "").toLowerCase().includes(searchText)
    );
  });

  displayRecentReadings(readingsToDisplay);
}


// ==============================
//  Maintenance Display
// ==============================

const lastWaterChangeElement = document.getElementById("last-water-change");
const daysLastWaterChangeElement =
  document.getElementById("days-last-water-change");

if (maintenance.lastWaterChangeDate) {
  const daysSinceWaterChange =
    getDaysSinceDate(maintenance.lastWaterChangeDate);

  lastWaterChangeElement.textContent =
    maintenance.lastWaterChangeDate;

  daysLastWaterChangeElement.textContent =
    daysSinceWaterChange;
}

// ==============================
//  Stats Overview
// ==============================

const statsSelect = document.getElementById("stats-parameter");

function updateStatsOverview() {
  const selectedParameter = statsSelect.value;

  document.getElementById("total-reading").textContent = readings.length;

  if (readings.length === 0) {
    document.getElementById("average-stat-title").textContent =
      `Average ${parameterConfig[selectedParameter].fullLabel}`;

    document.getElementById("highest-stat-title").textContent =
      `Highest ${parameterConfig[selectedParameter].fullLabel}`;

    document.getElementById("lowest-stat-title").textContent =
      `Lowest ${parameterConfig[selectedParameter].fullLabel}`;

    document.getElementById("average-reading").textContent = "No data";
    document.getElementById("highest-reading").textContent = "No data";
    document.getElementById("lowest-reading").textContent = "No data";

    return;
  }

  const values = getParameterValues(readings, selectedParameter);
  const totalReadings = readings.length;
  const stats = calculateStats(values);

  document.getElementById("average-stat-title").textContent =
    `Average ${parameterConfig[selectedParameter].fullLabel}`;

  document.getElementById("highest-stat-title").textContent =
    `Highest ${parameterConfig[selectedParameter].fullLabel}`;

  document.getElementById("lowest-stat-title").textContent =
    `Lowest ${parameterConfig[selectedParameter].fullLabel}`;

  document.getElementById("average-stat-label").textContent =
    `Your average ${parameterConfig[selectedParameter].fullLabel} is: `;

  document.getElementById("highest-stat-label").textContent =
    `Your highest ${parameterConfig[selectedParameter].fullLabel} was: `;

  document.getElementById("lowest-stat-label").textContent =
    `Your lowest ${parameterConfig[selectedParameter].fullLabel} was: `;

  document.getElementById("total-reading").textContent = totalReadings;

  document.getElementById("average-reading").textContent =
    stats.average.toFixed(1);

  document.getElementById("highest-reading").textContent =
    stats.highest;

  document.getElementById("lowest-reading").textContent =
    stats.lowest;
}


// ==============================
//  Parameter Trend
// ==============================

const trendSelect = document.getElementById("trend-parameter");
const parameterTrendElement = document.getElementById("parameter-trend");

function updateParameterTrend() {
  const selectedParameter = trendSelect.value;

  const trend = getParameterTrend(readings, selectedParameter);

  if (trend.difference === null) {
    parameterTrendElement.textContent =
      `${parameterConfig[selectedParameter].fullLabel}: ${trend.label}`;

    return;
  }

  parameterTrendElement.textContent =
    `${parameterConfig[selectedParameter].fullLabel}: ${trend.icon} ${trend.label} by ${trend.difference.toFixed(1)}${parameterConfig[selectedParameter].unit}`;
}


// ==============================
//  Initialize Page
// ==============================

updateReadingsList();
updateStatsOverview();
updateParameterTrend();


// ==============================
//  Event Listeners
// ==============================

searchInput.addEventListener("input", updateReadingsList);

sortSelect.addEventListener("change", updateReadingsList);

recentReadingsContainer.addEventListener("click", function (event) {
  if (!event.target.classList.contains("delete-reading-btn")) {
    return;
  }

  const selectedId = Number(event.target.dataset.id);
  deleteReading(selectedId);
});

statsSelect.addEventListener("change", updateStatsOverview);

trendSelect.addEventListener("change", updateParameterTrend);