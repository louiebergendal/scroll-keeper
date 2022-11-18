import {
	getStorage,
	ref as storageRef,
	uploadBytesResumable,
	getDownloadURL
} from "firebase/storage"

import firebase from "firebase/app";
import "firebase/storage";
import { firebaseConfig } from "../config.js"

firebase.apps && !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : "";

export default FirebaseStorage = firebase.storage();

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

export const uploadAndGetUrl = (refString, file, metadata) => {
	uploadTask = uploadFile(refString, file, metadata)
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
			console.log('File available at', downloadURL)
		})
	})
}
