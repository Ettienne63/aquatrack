// ==============================
// Select Elements
// ==============================

const readingForm = document.getElementById("reading-form");
const maintenanceForm = document.getElementById("maintenance-form");


// ==============================
// Add New Reading
// ==============================

readingForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const temperature = document.getElementById("temperature").value;
  const ph = document.getElementById("ph").value;
  const ammonia = document.getElementById("ammonia").value;
  const nitrite = document.getElementById("nitrite").value;
  const nitrate = document.getElementById("nitrate").value;
  const recordedDate = document.getElementById("recordedDate").value;
  const notes = document.getElementById("notes").value;


  const reading = {
    readingId: Date.now(),
    temperature,
    ph,
    ammonia,
    nitrite,
    nitrate,
    recordedDate,
    notes
  };

// ==============================
// Validations
// ==============================

const validation = validateReading(reading)

if(!validation.isValid){
  alert(validation.message);
  return;
}

  const readings = loadReadings();
  readings.push(reading);
  saveReadings(readings);
  window.location.href = "index.html";


});

// ==============================
// Add Maintenance Details
// ==============================

maintenanceForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const maintenanceDate = document.getElementById("last-water-change-input").value;

  if (!maintenanceDate) {
    return;
  }

  const maintenance = {
    lastWaterChangeDate: maintenanceDate
  };

  saveMaintenance(maintenance);

  window.location.href = "index.html";
});