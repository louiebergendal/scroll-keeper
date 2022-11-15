// SLÅ IHOP UTILS I CHARACTERISTICS MED DEN HÄR?

export function getRandomKey() { return Math.random().toString(36).substring(0, 16) }

export const equals = (a, b) => a.length === b.length && a.every((v, i) => v === b[i])

