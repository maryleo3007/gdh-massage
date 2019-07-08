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

exports.users_blockedAssist = functions.https.onRequest((req, res) => {
    /* Instead use the admin */
    if (req.method !== "POST") {
        res.status(400).send('Please send a POST request');
        return;
    }

    var todayBlockedDate = ''; var today = new Date(); var dd = today.getDate();
    var mm = today.getMonth() + 1; var yyyy = today.getFullYear();
    
    if (dd < 10) { dd = '0' + dd;}
    if (mm < 10) { mm = '0' + mm;}
  
    todayBlockedDate = yyyy + '-' + mm +  '-' + dd;
    var fechaInicio = new Date(todayBlockedDate).getTime();
    
    const ref = admin.database().ref('users');

    ref.on("value", function(snapshot) {
        snapshot.forEach(function(child) {
            var objeto = child.val()
            child.ref.update({
                countAgendas: 0,
                countReserved: 0,
                messageEvent: '',
                reserved: false
            })

            if (objeto.userBlockedAssist) {
                console.log(objeto.mail)
                
                var fechaBloqueo = new Date(objeto.dateBlocked).getTime();
                
                if ((fechaInicio-fechaBloqueo)/(1000*60*60*24) > 7) {
                    child.ref.update({
                        userBlockedAssist: false
                    });
                }
            }
        });
        res.send(snapshot.val());
    });
  });

exports.updateTurns_T1 = functions.https.onRequest((req,res)=> {
    const refTherapist1 = admin.database().ref('terapeuta1');

    refTherapist1.on("value", function(snapshot) {
        snapshot.forEach(function(child) {
            child.ref.update({
                available: true,
                confirm: false,
                userName: '',
                count: 0
            });
        });
        res.send(snapshot.val());
    });
  });

exports.updateTurns_T2 = functions.https.onRequest((req,res)=> {
    const refTherapist2 = admin.database().ref('terapeuta2');

    refTherapist2.on("value", function(snapshot) {
        snapshot.forEach(function(child) {
            child.ref.update({
                available: true,
                confirm: false,
                userName: '',
                count: 0
            });
        });
        res.send(snapshot.val());
    });
  });

exports.updateTurns_T3 = functions.https.onRequest((req,res)=> {
    const refTherapist3 = admin.database().ref('terapeuta3');

    refTherapist3.on("value", function(snapshot) {
        snapshot.forEach(function(child) {
            child.ref.update({
                available: true,
                confirm: false,
                userName: '',
                count: 0
            });
        });
        res.send(snapshot.val());
    });
  });