export const baseValue = 0

export const accountForFate = (fate, strainSum) => {
    strainSum -= fate
    if (strainSum < 0) { 
        strainSum = 0
    }

    fate -= strainSum
    if (fate > 0) {
        fate = 0
    }

    let obj = {
        strainSum,
        fate
    }

    return obj
}