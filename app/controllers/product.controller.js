/* importing db details */
const db = require('../models/index.js');

/* preparing product collection */
const products = db.collection("products");

/* fetching all products */
exports.allproducts = async (request, response) => {
    try {
        /* trying to fetch all products from db */
        const snapshot = await products.get();

        /* looping through the docs and adding in the products variable */
        const allproducts = snapshot.docs.map(doc => doc.data());

        /* sending response to the customer */
        response.send({ status: 1, products: allproducts });
    } catch (error) {
        /* when some error occurs */
        response.send({ status: 1, products: [] });
    }
}

/* fetching products based on category */
exports.products = async (request, response) => {
    /* request category id from query */
    const categoryid = request.query.id;

    try {
        /* trying to fetch products based on category id from db */
        const snapshot = await products.where("category_id", "==", categoryid).get();

        /* looping through the docs and adding in the products variable */
        const tempproducts = snapshot.docs.map(doc => doc.data());

        /* sending response to the customer */
        response.send({ status: 1, products: tempproducts });
    } catch (error) {
        /* when some error occurs */
        response.send({ status: 1, error: error || "We have faced some issue", products: [] });
    }
}

/* add product to db */
exports.addproduct = async (request, response) => {
    /* request body from url */
    const requestbody = request.body;

    /* creating a random id for product id */
    const productid = `Product-${Math.floor(Math.random() * 100000)}`;

    /* preparing request body */
    const body = {
        id: productid,
        name: requestbody.name,
        details: requestbody.details,
        category: requestbody.category,
        categoryid: requestbody.categoryid,
        image: requestbody.image,
        price: requestbody.price,
        discount: requestbody.discount,
        total_price: requestbody.total_price
    };

    /* trying to add this product in the database */
    try {
        await products.add(body);

        /* when adding successful return the response to user */
        response.send({ status: 1, message: "Product added successfully", product: body });
    } catch (error) {
        /* when some error occurs */
        response.send({ status: 0, message: error || "We have faced some issue", product: null });
    }
}

/* update product */
exports.updateproduct = async (request, response) => {
    /* separating request body */
    const requestbody = request.body;

    /* updating product id */
    const productid = requestbody.id;

    /* updating product based on the product id */
    /* we will need doc id of the respective product to update it */
    try {
        /* finding out all the docs with this product id - in actual case there will be only 1 object present */
        const snapshot = await products.where("id", "==", productid).get();

        /* checking if the product id is correct or not */
        if (snapshot.docs.length == 0) {
            /* no product present with this product id */
            response.send({ status: 0, message: `No product present with ${productid}` });
        }
        else {
            /* separating the 0th product from the doc list */
            const firstproduct = snapshot.docs[0];

            /* seprating doc id from this product */
            const docid = firstproduct.id;

            /* updating this product with this doc id */
            try {
                const dbresponse = await products.doc(docid).update(requestbody);

                /* sending response back to user */
                response.send({ status: 1, message: "product updated successfully", product: requestbody });
            } catch (error) {
                /* some error occurs during product update */
                response.send({ status: 0, message: error || "Error occured during product update", product: null });
            }
        }

    } catch (error) {
        /* error occurs during finding product */
        response.send({ status: 0, message: error || "Error occured during product search", product: null });
    }
}