// ==============================
// Validate Tank Profile
// ==============================

function validateTankProfile(tankProfile) {
    if (!tankProfile.tankName ||!tankProfile.tankLength ||!tankProfile.tankWidth || !tankProfile.tankHeight ||!tankProfile.tankVolume){
        return {
            isValid: false,
            message: "Tank name,length, width, and volume are required."
        }
    }
    if(tankProfile.tankLength <= 0 ||tankProfile.tankWidth <= 0 ||tankProfile.tankHeight <= 0 || tankProfile.tankVolume <= 0){
        return{
            isValid: false,
            message: "Tank measurements must be greater than 0."
        }
    }
    return{
        isValid: true,
        message: ""
    }
}