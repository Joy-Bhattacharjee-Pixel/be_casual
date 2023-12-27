module.exports = app =>{
    /* importing product controller */
    const product = require("../controllers/product.controller");

    /* importing endpoint */
    const endpoints = require('../endpoints/endpoints');

    /* defining route */
    var router = require("express").Router();

    /* fetching all products */
    router.get("/all", product.allproducts);

    /* fetching products based on category id */
    router.get("/fetch", product.products);

    /* add products in db */
    router.post("/add", product.addproduct);

    /* update products based on product id in db */
    router.post("/update", product.updateproduct);

    /* using product endpoint with router */
    app.use(endpoints.product, router);
}