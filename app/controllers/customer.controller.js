/* importing db details */
const db = require('../models/index.js');

/* preparing customer collection */
const customers = db.collection("customers");

/* fetch all customer details */
exports.allcustomers = async (request, response) => {
    try {
        /* trying to fetch all customers from db */
        const snapshot = await customers.get();

        /* looping through the docs and adding in the customers variable */
        const allcustomers = snapshot.docs.map(doc => doc.data());

        /* sending response to the customer */
        response.send({ status: 1, message: "All customers fetched successfully", customers: allcustomers });
    } catch (error) {
        /* when some error occurs */
        response.send({ status: 1, message: error || "We have faced some issue", customers: [] });
    }
}

/* fetching customer based on id */
exports.findcustomer = async (request, response) => {
    /* request customer id from query */
    const customerid = request.query.id;

    try {
        /* trying to fetch customer based on customer id from db */
        const snapshot = await customers.where("id", "==", customerid).get();

        /* looping through the docs and adding in the customer variable */
        const tempcustomer = snapshot.docs.map(doc => doc.data());

        if (tempcustomer.length == 0) {
            /* no customer found with this id */
            response.send({ status: 0, message: `No customer found with ${customerid}`, customer: null });
        } else {
            /* customer found with this id */
            /* separating first customer */
            const firstcustomer = tempcustomer[0];

            /* sending response back to user */
            response.send({ status: 1, message: `Customer found successfully with ${customerid}`, customer: firstcustomer });
        }

    } catch (error) {
        /* when some error occurs */
        response.send({ status: 0, error: error || "We have faced some issue", customer: [] });
    }
}

/* update customer */
exports.updatecustomer = async (request, response) => {
    /* separating request body */
    const requestbody = request.body;

    /* updating customer id */
    const customerid = requestbody.id;

    /* updating customer based on the customer id */
    /* we will need doc id of the respective customer to update it */
    try {
        /* finding out all the docs with this customer id - in actual case there will be only 1 object present */
        const snapshot = await customers.where("id", "==", customerid).get();

        /* checking if the customer id is correct or not */
        if (snapshot.docs.length == 0) {
            /* no customer present with this customer id */
            response.send({ status: 0, message: `No customer present with ${customerid}` });
        }
        else {
            /* separating the 0th customer from the doc list */
            const firstcustomer = snapshot.docs[0];

            /* seprating doc id from this customer */
            const docid = firstcustomer.id;

            /* updating this customer with this doc id */
            try {
                const dbresponse = await customers.doc(docid).update(requestbody);

                /* sending response back to user */
                response.send({ status: 1, message: "customer updated successfully", customer: requestbody });
            } catch (error) {
                /* some error occurs during customer update */
                response.send({ status: 0, message: error || "Error occured during customer update", customer: null });
            }
        }

    } catch (error) {
        /* error occurs during finding customer */
        response.send({ status: 0, message: error || "Error occured during customer search", customer: null });
    }
}