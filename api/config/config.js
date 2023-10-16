// Firebase config file to connect with firebase
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const serviceAccount = require('./assignment-10-32165-firebase-adminsdk-n2ptd-14ae3f7b4d.json')

initializeApp({
    credential: cert(serviceAccount),
});

const db = getFirestore();

module.exports = db;