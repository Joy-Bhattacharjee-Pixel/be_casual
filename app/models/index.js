/* importing firebase admin */
const admin = require('firebase-admin');

/* imporing service json */
const serviceAccount = require("../config/service.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

/* exporting db from this page to reuse */
module.exports = admin.firestore();