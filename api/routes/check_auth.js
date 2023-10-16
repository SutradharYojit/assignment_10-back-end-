const express = require('express');
const router = express();
const userCtrl = require('../controller/check_user_ctrl')
const fireStore = require('../config/config')
const admin = require('firebase-admin');

router.post('/signUp', userCtrl.register);

router.post('/login', userCtrl.login);

router.get('/user', (req, res, next) => {
    const userId = req.body.userId;
    fireStore.collection("Users").where('uid', "==", userId).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // Access the document data
            const data = doc.data();
            console.log(data);
        });
    })
        .catch((error) => {
            console.error('Error querying Firestore:', error);
        });

})

module.exports = router;