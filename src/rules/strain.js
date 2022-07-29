export const dealStrain = (strainSum, isViolent) => {
    return {
        fatigue: isViolent ? Math.floor(strainSum / 2) : 0,
        damage: isViolent ? Math.ceil(strainSum / 2) : strainSum
    }
}