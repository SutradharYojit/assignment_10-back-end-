const express = require('express');
const router = express();
const fireStore = require('../config/config');

router.post('/addProduct', async (req, res, next) => {
    const data = req.body;
    const timeStamp = Date.now();
    console.log(timeStamp);
    await fireStore.collection('Product').add({ ...data, timeStamp: timeStamp }).then((value) => {
        console.log(value.id);
        return res.status(201).json({ sucess: true, message: "Product added successfully" });
    });
});

router.get('/getProduct', async (req, res, next) => {
    const productData = await fireStore.collection('Product').get();
    return res.status(200).json({ sucess: true, data: productData.docs.map((doc) => ({ id: doc.id, ...doc.data() })) });
});

router.post('/updateProduct', async (req, res, next) => {
    const id = req.body.id;
    delete req.body.id;
    const update = req.body;

    const snapShot = await fireStore.collection("Product").doc(id).update(update).then(() => {
        return res.status(201).json({ success: true, message: "data update successfully" });
    });
})


router.post('/deleteProduct', async (req, res, next) => {
    const data = req.body;

    await firebase.collection("Products").doc(data.id).delete().then((value) => {
        console.log(value);
        return res.status(201).json({ success: true, message: "data delete successfullt" });
    });
})


module.exports = router;