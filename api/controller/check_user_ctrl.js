const admin = require('firebase-admin')
const fireStore = require('../config/config')
// function to register the user with the Firebase
register = (req, res, next) => {
    const password = req.body.password;
    const data = req.body;
    delete req.body.password;
    admin.auth().createUser({
        email: data.email,
        password: password
    })
        .then(async (userRecord) => {
            await fireStore.collection("Users").add({ uid: userRecord.uid, username: data.username, email: data.email });
            return res.status(201).json({ success: true, userId: userRecord.uid, data: data, message: 'User created successfully', });
        })
        .catch((error) => {
            console.error('Error creating user:', error);
            return res.status(500).send({ status: false, message: 'Error creating user', errorInfo: error });
        });
}

// function authentication 
login = (req, res, next) => {
    admin.auth().getUserByEmail(req.body.email).then((value) => {
        console.log(value.uid);
        return res.status(201).json({ success: true, message: 'Login successfully',});

    }).catch((error) => {
        return res.status(400).json({ success: false, message: 'Login failed',});

    });
}

module.exports = { register, login }