import {
	getStorage,
	ref as storageRef,
	uploadBytesResumable,
	getDownloadURL
} from "firebase/storage"
import { initializeApp } from "firebase/app"
import { firebaseConfig } from "../config.js"

const storageApp = initializeApp(firebaseConfig)

export const storage = getStorage(storageApp);

const createStorageRefs = (refString) => {
	const storage = getStorage();
	return storageRef(storage, refString)
}

const uploadFile = (
	refString,
	file,
	metadata = {contentType: 'image/jpeg'}
) => {
	const ref = createStorageRefs(refString)
	return uploadBytesResumable(ref, file, metadata)
}

export const uploadAndGetUrl = (refString, file, metadata, callback) => {
	const uploadTask = uploadFile(refString, file, metadata)
	uploadTask.on('state_changed',
	(snapshot) => {
		const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
		console.log('Upload is ' + progress + '% done');
		switch (snapshot.state) {
			case 'paused':
				console.log('Upload is paused')
				break
			case 'running':
				console.log('Upload is running')
				break
		}
	}, 
	(error) => {
	  // https://firebase.google.com/docs/storage/web/handle-errors
	  switch (error.code) {
		case 'storage/unauthorized':
		  	// User doesn't have permission to access the object
			break
		case 'storage/canceled':
		  	// User canceled the upload
		 	break
		case 'storage/unknown':
		  	// Unknown error occurred, inspect error.serverResponse
			break
	  }
	}, 
	() => {
		// Upload completed successfully
		getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
			console.log("downloadURL: ", downloadURL)
			callback(downloadURL)
		})
	})
}
