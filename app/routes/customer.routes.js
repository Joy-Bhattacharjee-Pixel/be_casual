module.exports = app => {
    /* importing customer controller */
    const customer = require("../controllers/customer.controller");

    /* importing endpoint */
    const endpoints = require('../endpoints/endpoints');

    /* defining route */
    var router = require("express").Router();

    /* fetching all categories */
    router.get("/all", customer.allcustomers);

    /* fetching customer based on id */
    router.get("/", customer.findcustomer);

    /* update existing customer */
    router.post("/update", customer.updatecustomer);

    /* using customer endpoint with router */
    app.use(endpoints.customer, router);
}