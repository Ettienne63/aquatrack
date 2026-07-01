// ==============================
// Reading Storage
// ==============================

function loadReadings() {
  return JSON.parse(localStorage.getItem("readings")) || [];
}

function saveReadings(readings) {
  localStorage.setItem(
    "readings",
    JSON.stringify(readings)
  );
}


// ==============================
// Maintenance Storage
// ==============================

function loadMaintenance() {
  return JSON.parse(localStorage.getItem("maintenance")
  ) || {};
}

function saveMaintenance(maintenance) {
  localStorage.setItem(
    "maintenance",
    JSON.stringify(maintenance)
  );
}

// ==============================
// Tank Profile Storage
// ==============================

function loadTankProfile() {
  return JSON.parse(localStorage.getItem("tankProfile")) || {}
}

function saveTankProfile(tankProfile){
  localStorage.setItem("tankProfile",JSON.stringify(tankProfile))
}