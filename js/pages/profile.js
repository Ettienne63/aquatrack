const currentTankProfile = loadTankProfile()

displayTankProfile(currentTankProfile)

populateTankProfileForm(currentTankProfile)

const profileForm = document.getElementById("profile-form");

profileForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const tankName = document.getElementById("tankName").value;
    const tankLength = Number(document.getElementById("tankLength").value)
    const tankWidth = Number(document.getElementById("tankWidth").value)
    const tankHeight = Number(document.getElementById("tankHeight").value)
    const tankVolume = Number(document.getElementById("tankVolume").value)
    const creationDate = document.getElementById("creationDate").value
    const tankType = document.getElementById("tankType").value

    const tankProfile = {
        tankName,
        tankLength,
        tankWidth,
        tankHeight,
        tankVolume,
        creationDate,
        tankType
    }
    const validation = validateTankProfile(tankProfile)

    if (!validation.isValid) {
        alert(validation.message)
        return
    }

    saveTankProfile(tankProfile)
    window.location = "profile.html"
})


function displayTankProfile(tankProfile) {
    if (!tankProfile.tankName) {
        return;
    }

    document.getElementById("display-tank-name").textContent =
        tankProfile.tankName;

    document.getElementById("display-tank-size").textContent =
        `${tankProfile.tankLength}cm x ${tankProfile.tankWidth}cm x ${tankProfile.tankHeight}cm`;

    document.getElementById("display-tank-volume").textContent =
        `${tankProfile.tankVolume}L`;

    document.getElementById("display-creation-date").textContent =
        tankProfile.creationDate;

    document.getElementById("display-tank-type").textContent =
        tankProfile.tankType || "No type selected";

}

function populateTankProfileForm(tankProfile) {
    if (!tankProfile.tankName) {
        return;
    }
    document.getElementById("tankName").value = tankProfile.tankName;

    document.getElementById("tankLength").value = tankProfile.tankLength;

    document.getElementById("tankWidth").value = tankProfile.tankWidth;

    document.getElementById("tankHeight").value = tankProfile.tankHeight;

    document.getElementById("tankVolume").value = tankProfile.tankVolume;

    document.getElementById("creationDate").value = tankProfile.creationDate;

    document.getElementById("tankType").value = tankProfile.tankType;

}





