// ==============================
// Parameter Configuration
// ==============================

const parameterConfig = {
  temperature: {
    label: "Temperature",
    unit: "°C",
    fullLabel: "Temperature (°C)"
  },

  ph: {
    label: "pH",
    unit: "",
    fullLabel: "pH"
  },

  ammonia: {
    label: "Ammonia",
    unit: " ppm",
    fullLabel: "Ammonia (ppm)"
  },

  nitrite: {
    label: "Nitrite",
    unit: " ppm",
    fullLabel: "Nitrite (ppm)"
  },

  nitrate: {
    label: "Nitrate",
    unit: " ppm",
    fullLabel: "Nitrate (ppm)"
  }
};


// ==============================
// Tank Health Rules
// ==============================

const healthRules = {
  temperature: {
    warningMin: 22,
    warningMax: 26,
    criticalMin: 20,
    criticalMax: 28
  },

  ammonia: {
    warning: 0,
    critical: 1
  },

  nitrate: {
    warning: 20,
    critical: 40
  },

  nitrite: {
    warning: 0,
    critical: 1
  }
};
// ==============================
// Maintenance Rules
// ==============================

const maintenanceRules = {
  waterChangeDays: 7
};