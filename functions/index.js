const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });
const fs = require('fs');
const UUID = require('uuid-v4');

const gcconfig = {
	projectId: 'footiosplaces-1557725622585',
	keyFilename: 'footiosplaces.json'
};

const gcs = require('@google-cloud/storage')(gcconfig);

admin.initializeApp({
	credential: admin.credential.cert(require('./footiosplaces.json'))
});

// NOTE!!!
// IF YOU MODIFY THE CLOUD FUNCTION YOU HAVE TO RUN `firebase deploy` AGAIN...
exports.storeImage = functions.https.onRequest((request, response) => {
	return cors(request, response, () => {
		/* Check if either we have no authrization or not the authorization we want */
		if (!request.headers.authorization || !request.headers.authorization.startsWith('Bearer ')) {
			console.log('No token present');
			response.status(403).json({ error: 'Unauthorized' });
			return;
		}
		let idToken;
		idToken = request.headers.authorization.split('Bearer ')[1];
		admin.auth().verifyIdToken(idToken).then((decodedToken) => {
			const body = JSON.parse(request.body);
			fs.writeFileSync('/tmp/uploaded-image.jpg', body.image, 'base64', (err) => {
				console.log(err);
				return response.status(500).json({ error: err });
			});
			const bucket = gcs.bucket('footiosplaces-1557725622585.appspot.com');
			const uuid = UUID();

			return bucket.upload(
				'/tmp/uploaded-image.jpg',
				{
					uploadType: 'media',
					destination: '/places/' + uuid + '.jpg',
					resumable: false,
					metadata: {
						metadata: {
							contentType: 'image/jpeg',
							firebaseStorageDownloadTokens: uuid
						}
					}
				},
				(err, file) => {
					if (!err) {
						/* 201 Created
						The request has succeeded and a new resource has been created as a result of it. 
						This is typically the response sent after a POST request, or after some PUT requests. */
						return response.status(201).json({
							imageUrl:
								'https://firebasestorage.googleapis.com/v0/b/' +
								bucket.name +
								'/o/' +
								encodeURIComponent(file.name) +
								'?alt=media&token=' +
								uuid
						});
					} else {
						console.log(err);
						/* 500 Internal Server Error
						The server has encountered a situation it doesn't know how to handle. */
						return response.status(500).json({ error: err });
					}
				}
			);
		})
		.catch(error => {
			console.log("Token is invalid");
			/* 
			403 Forbidden
			The client does not have access rights to the content, 
			i.e. they are unauthorized, so server is rejecting to give proper response. 
			Unlike 401, the client's identity is known to the server.
			*/
			response.status(403).json({error: "Unauthorized"})
		})
	});
});
// 'footiosplaces-1557725622585'
// footiosplaces.json
// footiosplaces-1557725622585.appspot.com

// : if request.auth != null ;

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

// cloud funcs: on demand code repos we can execute and target from outside...
// like a restful api,
// i.e. an http request.
// Note: cloud functions run on firebase. After writing them (or modify them)
// we have to run `firebase deploy`. This will upload them on Firebase.
/* 
So we will be able to send the request to some url of our definition
and when we do this, then a specific cloud function will run and execute code and there, 
we can write code to accept an image, 
then do something with it and mainly store it in storage 
which we can access from within the cloud function,
since that runs not on our client but on firebase.

* install google-tools && firebase init etc.
google-tools: that's just a cli that makes it easy to put this project 
under control of firebase. 
It just makes it very convenient to write and deploy a cloud functions here.
Note: We must write (here with Firebase's backend) cloud funcs with Node.js!

Steps in cloud func:
1. Use the request,
2. Extract the image,
3. Store the image in the Firebase cloud storage,
4. Return a response, when done.

To do the above steps we need an sdk 
to store data to Firebase: 
Go to functions and
install @google-cloud/storage && cors
cors: is required to allow access to our function from other origins,
so from apps not running on the same server as our firebase app does
and this of course will be the case,
our app will run on a native device.

In the cors func we can extract the image and store it.
There we parse the request.body of the firebase obj.
Then we need to save this file to cloud storage.
But first we temporarily save it here 
and then forwared it to firebase storage.

fs.writeFileSync() will write the file
and block the execution untill it's done.
Then (1st arg) it will store the file to the address we provide.
2nd arg: the file.
3d arg: the format.
4th arg: error func
- status(500): failed on the server.

Then we store it in Firebase storage.
To have access files, we need some configuration: check `gcs`.
With gcs.bucket we target a bucket.
Name of bucket is 1st arg.
Then upload() bucket.
Set the path and the config (2nd arg).
3d arg: a func that will be executed once upload is done.
If the func doesn't return an error then:
"I want to return a response with the link to the file 
which would allow us to view the file because
that is what I want to store in the database thereafter,
we could also reach out to the database from within here 
but I want to do it in two separate steps".

status(201): a file is created

with `imageUrl` we directly access the image 
without having general access rights

-----
 
from firebase storage rules: if request.auth != null 
*/
