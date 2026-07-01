// ==============================
// Validate Reading
// ==============================

function validateReading(reading) {
  if (!reading.temperature || !reading.ph || !reading.recordedDate) {
    return {
      isValid: false,
      message: "Temperature, pH, and Date are required."
    };
  }

  if (
    Number(reading.ammonia) < 0 ||
    Number(reading.nitrite) < 0 ||
    Number(reading.nitrate) < 0
  ) {
    return {
      isValid: false,
      message: "Water parameters cannot be negative."
    };
  }

  return {
    isValid: true,
    message: ""
  };
}