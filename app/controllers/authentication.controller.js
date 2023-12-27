/* importing db details */
const db = require('../models/index.js');

/* preparing customer collection */
const customers = db.collection("customers");

/* authenticating customer using email & password */
exports.login = async (request, response) => {
    try {
        /* request body email */
        const email = request.body.email;

        /* request body password */
        const password = request.body.password;

        /* all snapshots from customer collection with this query */
        const snapshot = await customers.where("email", "=", email).where("password", "=", password).limit(1).get();

        /* looping through snapshot list and adding every customer */
        const customer = snapshot.docs.map(doc => doc.data());

        if (customer.length == 0) {
            /* when no customer available with this email and password combination */
            response.send({
                "status": 0,
                "message": "Invalid Credentials",
                "customer": null
            });
        } else {
            /* sending response back to customer */
            response.send({
                "status": 1,
                "message": "Customer found successfully",
                "customer": customer[0]
            });
        }
    } catch (error) {
        /* when some error occurs */
        response.send({
            "status": 0,
            "message": error || "We have faced some issue",
            "customer": null
        });
    }
}

/* registerting customer with details */
exports.register = async (request, response) => {
    /* creating a random number for customer id */
    const customerid = Math.floor(Math.random() * 100000);

    /* preparing request body */
    const body = {
        "id": `Customer-${customerid}`,
        "name": request.body.name,
        "email": request.body.email,
        "password": request.body.password,
        "social_login": false
    };

    try {
        /* registering customer with this body */
        const snapshot = await customers.add(body);

        /* sending response back to the customer */
        response.send({
            "status": 1,
            "message": "Customer registration successful",
            "customer": body
        });
    } catch (error) {
        /* when some error occurs */
        response.send({
            "status": 0,
            "message": error || "We have faced some issue",
            "customer": null
        });
    }
}

