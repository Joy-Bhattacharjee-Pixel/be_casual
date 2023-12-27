const { request } = require('http');
const db = require('../models/index.js');

/* preparing order collection */
const orders = db.collection("orders");

/* fetching all orders */
exports.allorders = async (request, response) => {
    try {
        /* trying to fetch all orders from db */
        const snapshot = await orders.get();

        /* looping through the docs and adding in the orders variable */
        const allorders = snapshot.docs.map(doc => doc.data());

        /* sending response to the customer */
        response.send({ status: 1, orders: allorders });
    } catch (error) {
        /* when some error occurs */
        response.send({ status: 1, orders: [] });
    }
}

/* fetching order for single customer */
exports.customerorder = async (request, response) => {
    /* customer id coming from query */
    const customerid = request.query.id;

    try {
        /* performing where query with customer id */
        const snapshot = await orders.where("customerid", "==", customerid).get();

        /* looping through the docs and adding in the orders variable */
        const temporders = snapshot.docs.map(doc => doc.data());

        /* sending response to the customer */
        response.send({ status: 1, message: `Order for customer ${customerid} fetched successfully`, orders: temporders });
    } catch (error) {
        /* when some error occurs */
        response.send({ status: 0, message: error || "We have faced some issue", orders: null });
    }
}

/* update order */
exports.updateorder = async (request, response) => {
    /* separating request body */
    const requestbody = request.body;

    /* updating order id */
    const orderid = requestbody.id;

    /* updating order based on the order id */
    /* we will need doc id of the respective order to update it */
    try {
        /* finding out all the docs with this order id - in actual case there will be only 1 object present */
        const snapshot = await orders.where("id", "==", orderid).get();

        /* checking if the order id is correct or not */
        if (snapshot.docs.length == 0) {
            /* no order present with this order id */
            response.send({ status: 0, message: `No order present with ${orderid}` });
        }
        else {
            /* separating the 0th order from the doc list */
            const firstorder = snapshot.docs[0];

            /* seprating doc id from this order */
            const docid = firstorder.id;

            /* updating this order with this doc id */
            try {
                const dbresponse = await orders.doc(docid).update(requestbody);

                /* sending response back to user */
                response.send({ status: 1, message: "order updated successfully", order: requestbody });
            } catch (error) {
                /* some error occurs during order update */
                response.send({ status: 0, message: error || "Error occured during order update", order: null });
            }
        }

    } catch (error) {
        /* error occurs during finding order */
        response.send({ status: 0, message: error || "Error occured during order search", order: null });
    }
}

/* place order */
exports.placeorder = async (request, response) => {
    /* separating request body */
    const requestbody = request.body;

    /* creating a random id for order id */
    const orderid = `Order-${Math.floor(Math.random() * 100000)}`;

    /* initial order status */
    const orderstatus = "Ordered";

    /* order date */
    const orderdate = Date.now();

    /* preparing the adding object */
    const body = {
        id: orderid,
        customer_id: requestbody.customer_id,
        status: orderstatus,
        orderdate: orderdate,
        totalprice: requestbody.total,
        totaltax: requestbody.totaltax,
        subtotalprice: requestbody.subtotalprice,
        products: requestbody.products
    }

    try {
        /* placing order */
        await orders.add(body);

        /* sending response */
        response.send({ status: 1, message: "Order placed successfully", order: body });
    } catch (error) {
        /* when some error occurs */
        response.send({ status: 1, message: "We have faced some issue", order: null });
    }
}