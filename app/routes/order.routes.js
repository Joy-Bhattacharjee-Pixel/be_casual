module.exports = app =>{
    /* importing order controller */
    const order = require("../controllers/order.controller");

    /* importing endpoint */
    const endpoints = require('../endpoints/endpoints');

    /* defining route */
    var router = require("express").Router();

    /* fetching all orders from db */
    router.get("/all", order.allorders);

    /* fetching orders for a single customer */
    router.get("/customerorder", order.customerorder);

    /* updating order based on order id */
    router.post("/update", order.updateorder);

    /* using order endpoint with router */
    app.use(endpoints.order, router);
}