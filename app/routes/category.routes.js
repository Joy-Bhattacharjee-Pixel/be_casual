module.exports = app => {
    /* importing category controller */
    const category = require("../controllers/category.controller");

    /* importing endpoint */
    const endpoints = require('../endpoints/endpoints');

    /* defining route */
    var router = require("express").Router();

    /* fetching all categories */
    router.get("/all", category.categories);

    /* creating new category - admin operation */
    router.post("/add", category.addcategory);

    /* update existing category - admin operation */
    router.post("/update", category.updatecategory);

    /* using category endpoint with router */
    app.use(endpoints.category, router);
}