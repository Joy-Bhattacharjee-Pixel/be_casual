/* importing express */
const express = require("express");

/* using express */
const app = express();

/* importing cors - this is used for security */
const cors = require('cors');

/* using express json */
app.use(express.json());

/* using cors in the app */
app.use(cors());

/* this is used for POST call */
app.use(express.urlencoded({ extended: true }));

/* this is created for base url response */
app.get("/", (req, res) => {
    res.json({ message: "Welcome to MartKart app" });
});

/* authentication route */
require("./app/routes/authetication.routes")(app); 

/* category route */
require("./app/routes/category.routes")(app); 

/* product route */
require("./app/routes/product.routes")(app); 

/* customer route */
require("./app/routes/customer.routes")(app); 

/* order route */
require("./app/routes/order.routes")(app); 

/* extablishing PORT */
const PORT = process.env.PORT || 8081;

/* listening to the PORT */
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});