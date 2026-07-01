// ==============================
// Get Reading ID From URL
// ==============================

const params = new URLSearchParams(window.location.search);
const readingId = Number(params.get("id"));


// ==============================
// Load Readings
// ==============================

const readings = loadReadings();

const readingToEdit = readings.find(function (reading) {
  return reading.readingId === readingId;
});


// ==============================
// Validate Reading Exists
// ==============================

if (!readingToEdit) {
  console.log("No reading found for ID:", readingId);

  window.location.href = "index.html";
}


// ==============================
// Populate Form
// ==============================

document.getElementById("temperature").value =
  readingToEdit.temperature;

document.getElementById("ph").value =
  readingToEdit.ph;

document.getElementById("ammonia").value =
  readingToEdit.ammonia;

document.getElementById("nitrite").value =
  readingToEdit.nitrite;

document.getElementById("nitrate").value =
  readingToEdit.nitrate;

document.getElementById("recordedDate").value =
  readingToEdit.recordedDate;

document.getElementById("notes").value =
  readingToEdit.notes;


// ==============================
// Select Elements
// ==============================

const readingForm = document.getElementById("reading-form");


// ==============================
// Save Updated Reading
// ==============================

readingForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const updatedReading = {
    readingId: readingId,

    temperature: document.getElementById("temperature").value,
    ph: document.getElementById("ph").value,
    ammonia: document.getElementById("ammonia").value,
    nitrite: document.getElementById("nitrite").value,
    nitrate: document.getElementById("nitrate").value,
    recordedDate: document.getElementById("recordedDate").value,
    notes: document.getElementById("notes").value
  };

  // ==============================
  // Validations
  // ==============================

  const validation = validateReading(updatedReading)

  if (!validation.isValid) {
    alert(validation.message);
    return;
  }

  const updatedReadings = readings.map(function (reading) {
    if (reading.readingId === readingId) {
      return updatedReading;
    }
    return reading;
  });

  saveReadings(updatedReadings);

  window.location.href = "index.html";
});

