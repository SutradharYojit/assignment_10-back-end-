const express = require('express');
const router = express();
const fireStore = require('../config/config')


router.post('/addToCart', async (req, res, next) => {
    const data = req.body;
    await fireStore.collection("Cart").add(data).then(() => {
        return res.status(201).json({ success: true, message: 'Cart added successfully' });
    });
});


router.get('/getCart', async (req, res, next) => {
    const productData = await fireStore.collection('Cart').get();
    return res.status(200).json({ sucess: true, data: productData.docs.map((doc) => ({ id: doc.id, ...doc.data() })) });
});


router.post('/updateCart', async (req, res, next) => {
    const id = req.body.id;
    const quantity = req.body.quantity;

    const snapShot = await fireStore.collection("Cart").doc(id).update({quantity:quantity}).then(() => {
        return res.status(201).json({ success: true, message: "data update successfully" });
    });
})

router.post('/deleteCart', async (req, res, next) => {
    const id = req.body.id;

    await fireStore.collection("Cart").doc(id).delete().then((value) => {
        console.log(value);
        return res.status(201).json({ success: true, message: "data delete successfully" });
    });
})


router.post('/placedToOrder', async (req, res, next) => {
    const data = req.body;
    await fireStore.collection("CartHistory").add(data).then(() => {
        return res.status(201).json({ success: true, message: 'Cart added successfully' });
    });
});

module.exports = router;