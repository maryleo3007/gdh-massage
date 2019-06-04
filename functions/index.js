const functions = require('firebase-functions');
const admin = require('firebase-admin');
// const cors = require('cors')({ origin: true });
admin.initializeApp();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.users_countReserved = functions.https.onRequest((req, res) => {
    /* Instead use the admin */
    if (req.method !== "POST") {
        res.status(400).send('Please send a POST request');
        return;
    }
    
    const ref = admin.database().ref('users');

    ref.on("value", function(snapshot) {
        snapshot.forEach(function(child) {
            child.ref.update({
                countReservedMonth: 0
            });
        });
        res.send(snapshot.val());
    });
  });

// exports.httpPrueba = functions.https.onRequest((req, res) => {

//     return Promise.resolve()
//         .then(() => {

//             if (req.method !== "POST") {
//                 res.status(400).send('Please send a POST request');
//                 return;
//             }


//             let dbCon = admin.database().ref('users');
//             dbCon.once("value", function(snapshot) {
//                 snapshot.forEach(function(child) {
//                     child.ref.update({
//                         countReservedMonth: '1'
//                     });
//                 });
//             });

//         })
//         .then((response) => {

//             res.end();

//         })
//         .catch((err) => {
//             console.error(err);
//             return Promise.reject(err);
//         });

// });