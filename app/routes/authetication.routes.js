module.exports = app =>{
    /* importing auth controller */
    const authentication = require("../controllers/authentication.controller");

    /* importing endpoint */
    const endpoints = require('../endpoints/endpoints');

    /* defining route */
    var router = require("express").Router();

    /* authentication customer with email & password */
    router.post("/login", authentication.login);

    /* registering customer in the database */
    router.post("/register", authentication.register);

    /* using authentication endpoint with router */
    app.use(endpoints.auth, router);
}