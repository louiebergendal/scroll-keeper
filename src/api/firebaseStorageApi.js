import {
	getStorage,
	ref as storageRef,
	uploadBytesResumable,
	getDownloadURL
} from "firebase/storage"

const createStorageRefs = (refString) => {
	const storage = getStorage()
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

/**
* Use this to upload a file to storage bucket. urlReturnHandler is a
* callback function that handles the returned URL when the download is complete.
* the function does not return the URL, it is handled with a callback.
* @param refString string to file structure position, including path to user dir
* @param file file from upload input (e.target?.form[0]?.files[0])
* @param metadata metadata {contentType: file.type}
* @param urlReturnHandler callback function(url: string): any
*/
export const uploadAndGetUrl = (refString, file, metadata, urlReturnHandler) => {
	const uploadTask = uploadFile(refString, file, metadata)
	uploadTask.on('state_changed',
	(snapshot) => {
		const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
		console.log('Upload is ' + progress + '% done')
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
			urlReturnHandler(downloadURL)
		})
	})
}