import {
	ref as fbRef,
	getDatabase,
	push,
	remove,
	update,
} from "firebase/database"

// --- DATABASE ---

// creates new object at path with UID
export const pushDataToCollection = (refString, data) => {
	const reference = createRefs(refString)
	const newRef = push(reference, data)
	return newRef
}

// updates provided data keys at path
export const updateData = (refString, data) => {
	const reference = createRefs(refString)
	update(reference, data)
}

// removes data at path
export const removeData = (refString) => {
	const reference = createRefs(refString)
	remove(reference)
}

export const createRefs = (refString) => {
	const db = getDatabase()
	return fbRef(db, refString)
}