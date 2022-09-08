import {
	ref as fbRef,
	getDatabase,
	onValue,
	set,
	update,

} from 'firebase/database'





export const retrieveData = (refString) => {
	const db = getDatabase()
	const reference = fbRef(db, refString)
	onValue(reference, (snapshot) => { return snapshot.val() })
}


export const writeCharacterData = (refString) => {
	const db = getDatabase()
	const reference = fbRef(db, refString)

	// loopa igenom keys
	// uppdatera de keys som matchar?

	onValue(reference, (snapshot) => { return snapshot.val() })
}

