const express = require('express');
const router = express();
const fireStore = require('../config/config')


router.post('/getUser', (req, res, next) => {
    const userId = req.body.userId;
    fireStore.collection("Users").where('uid', "==", userId).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // Access the document data
            const data = doc.data();
            return res.status(201).json({ success: true, data: { ...data, docId: doc.id } });
        });
    })
        .catch((error) => {
            console.error('Error querying Firestore:', error);
        });

})

router.post('/updateUser', (req, res, next) => {
    const id = req.body.id;
    delete req.body.id;
    const update = req.body;

    fireStore.collection("Users").doc(id).update(update).then(() => {
        return res.status(201).json({ success: true, message: "profile  update successfully" });
    });

})

module.exports = router;