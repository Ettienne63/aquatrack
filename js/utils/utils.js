// ==============================
// Parameter Values
// ==============================

function getParameterValues(readings, parameter) {
    return readings.map(function (reading) {
        return Number(reading[parameter]);
    });
}
// ==============================
// Get Fish Tank Health Status
// ==============================
function getTankHealthStatus(reading) {
    const temperature = Number(reading.temperature);
    const ammonia = Number(reading.ammonia);
    const nitrate = Number(reading.nitrate);
    const nitrite = Number(reading.nitrite);

    const reasons = [];

    if (
        ammonia >= healthRules.ammonia.critical ||
        nitrite >= healthRules.nitrite.critical ||
        nitrate >= healthRules.nitrate.critical ||
        temperature < healthRules.temperature.criticalMin ||
        temperature > healthRules.temperature.criticalMax
    ) {
        if (ammonia >= healthRules.ammonia.critical) {
            reasons.push("Ammonia is critically high");
        }

        if (nitrite >= healthRules.nitrite.critical) {
            reasons.push("Nitrite is critically high");
        }

        if (nitrate >= healthRules.nitrate.critical) {
            reasons.push("Nitrate is critically high");
        }

        if (
            temperature < healthRules.temperature.criticalMin ||
            temperature > healthRules.temperature.criticalMax
        ) {
            reasons.push("Temperature is outside the critical range");
        }

        return {
            label: "Critical",
            className: "badge text-bg-danger",
            reasons
        };
    }

    if (
        ammonia > healthRules.ammonia.warning ||
        nitrite > healthRules.nitrite.warning ||
        nitrate > healthRules.nitrate.warning ||
        temperature < healthRules.temperature.warningMin ||
        temperature > healthRules.temperature.warningMax
    ) {
        if (ammonia > healthRules.ammonia.warning) {
            reasons.push("Ammonia is above safe levels");
        }

        if (nitrite > healthRules.nitrite.warning) {
            reasons.push("Nitrite is above safe levels");
        }

        if (nitrate > healthRules.nitrate.warning) {
            reasons.push("Nitrate is above recommended levels");
        }

        if (
            temperature < healthRules.temperature.warningMin ||
            temperature > healthRules.temperature.warningMax
        ) {
            reasons.push("Temperature is outside the ideal range");
        }

        return {
            label: "Warning",
            className: "badge text-bg-warning",
            reasons
        };
    }

    return {
        label: "Healthy",
        className: "badge text-bg-success",
        reasons: ["All readings are within the safe range"]
    };
}


// ==============================
// Calculate Stats
// ==============================

function calculateStats(values) {
    const totalValue = values.reduce(function (total, value) {
        return total + value;
    }, 0);

    const average = totalValue / values.length;
    const highest = Math.max(...values);
    const lowest = Math.min(...values);

    return {
        average,
        highest,
        lowest
    };
}


// ==============================
// Sort Readings By Date
// ==============================

function getReadingsSortedByDate(readings) {
    return [...readings].sort(function (a, b) {
        return new Date(b.recordedDate) - new Date(a.recordedDate);
    });
}


// ==============================
// Get Latest Reading
// ==============================

function getLatestReadingByDate(readings) {
    return getReadingsSortedByDate(readings)[0];
}


// ==============================
// Get Parameter Trend
// ==============================

function getParameterTrend(readings, parameter) {
    const sortedReadings = getReadingsSortedByDate(readings);

    if (sortedReadings.length < 2) {
        return {
            label: "Not enough Data",
            icon: "-",
            difference: null
        };
    }

    const latestReading = sortedReadings[0];
    const previousReading = sortedReadings[1];

    const latestValue = Number(latestReading[parameter]);
    const previousValue = Number(previousReading[parameter]);

    const difference = latestValue - previousValue;
    const absoluteDifference = Math.abs(difference);

    if (latestValue > previousValue) {
        return {
            label: "Increasing",
            icon: "↑",
            difference: absoluteDifference
        };
    }

    if (latestValue < previousValue) {
        return {
            label: "Decreasing",
            icon: "↓",
            difference: absoluteDifference
        };
    }

    return {
        label: "Stable",
        icon: "→",
        difference: 0
    };
}


// ==============================
// Tank Health Recommendations
// ==============================

function getTankHealthRecommendations(reading) {
    const temperature = Number(reading.temperature);
    const ammonia = Number(reading.ammonia);
    const nitrate = Number(reading.nitrate);
    const nitrite = Number(reading.nitrite);

    const recommendations = [];

    if (ammonia > healthRules.ammonia.warning) {
        recommendations.push("Test ammonia again soon and consider a partial water change.");
    }

    if (nitrite > healthRules.nitrite.warning) {
        recommendations.push("Nitrite is unsafe. Consider a partial water change and avoid overfeeding.");
    }

    if (nitrate > healthRules.nitrate.warning) {
        recommendations.push("Nitrate is rising. Consider a partial water change.");
    }

    if (
        temperature < healthRules.temperature.warningMin ||
        temperature > healthRules.temperature.warningMax
    ) {
        recommendations.push("Temperature is outside the ideal range. Check your heater settings.");
    }

    if (recommendations.length === 0) {
        recommendations.push("No recommendations right now. Tank readings look good.");
    }

    return recommendations;
}

// ==============================
// Dashboard Alerts
// ==============================

function getDashboardAlerts(latestReading, maintenance) {
    
    const temperature = Number(latestReading.temperature);
    const ammonia = Number(latestReading.ammonia);
    const nitrite = Number(latestReading.nitrite);
    const nitrate = Number(latestReading.nitrate);

    const alerts = []

    if (ammonia > healthRules.ammonia.warning) {
        alerts.push("Ammonia is unsafe.")
    }
    if (nitrite > healthRules.nitrite.warning) {
        alerts.push("Nitrite is above the recommended range.")
    }
    if (nitrate > healthRules.nitrate.warning) {

        alerts.push("Nitrate is above the recommended range.");

    }
    if (
        temperature < healthRules.temperature.warningMin ||
        temperature > healthRules.temperature.warningMax
    ) {
        alerts.push("Temperature is outside the ideal range.");
    }

    if (maintenance.lastWaterChangeDate) {
        const daysSinceWaterChange =
            getDaysSinceDate(maintenance.lastWaterChangeDate);

        if (daysSinceWaterChange > maintenanceRules.waterChangeDays) {
            alerts.push("Water change may be overdue.");

        }   

    }

    if (alerts.length === 0) {
        alerts.push("No alerts right now.")
    }
    return alerts
}
// ==============================
// Days Since Date
// ==============================

function getDaysSinceDate(dateString) {
    const date = new Date(dateString);
    const today = new Date();

    const timeDifference = today - date;

    return Math.floor(
        timeDifference / (1000 * 60 * 60 * 24)
    );
}