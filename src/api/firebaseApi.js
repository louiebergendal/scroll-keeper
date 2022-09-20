import {
	ref as fbRef,
	getDatabase,
	push,
	remove,
	update,
	get
} from "firebase/database";

// creates new object at path with UID
export const pushDataToCollection = (refString, data) => {
	const reference = createRefs(refString)
	push(reference, data)
}

// updates provided data keys at path
export const updateData = (refString, data) => {
	console.log('ping!');
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


/* 

N00b: 687sdasd7asdt78tsadfvs5sd
VV: 87324vghhj34hjv3454356hvh
mitt användarID: Bil08FdFEqaUDaglypPHiSwnAl13

how to implement a listener (in store):
onValue(createRefs(refString), (snapshot) => {
	"variable" = snapshot.val()
})


*/