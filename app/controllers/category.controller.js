/* importing db details */
const db = require('../models/index.js');

/* preparing category collection */
const categories = db.collection("categories");

/* fetching all categories */
exports.categories = async (request, response) => {
    try {
        /* trying to fetch all categories from db */
        const snapshot = await categories.get();

        /* looping through the docs and adding in the categories variable */
        const allcategories = snapshot.docs.map(doc => doc.data());

        /* sending response to the customer */
        response.send({ status: 1, categories: allcategories });
    } catch (error) {
        /* when some error occurs */
        response.send({ status: 1, categories: [] });
    }
}

/* add new category */
exports.addcategory = async (request, response) => {
    /* request body variable */
    const body = request.body;

    /* creating a random id for category id */
    const categoryid = `Category-${Math.floor(Math.random() * 100000)}`;

    /* separating ctageoyr details from the request body */
    const requestbody = {
        id: categoryid,
        enable: true,
        name: body.name,
        details: body.details,
        image: body.image
    }

    /* uploading category to db using try-catch */
    try {
        await categories.add(requestbody);

        /* after successful upload returning response */
        response.send({ status: 1, message: "Category uploaded successfully", category: requestbody });
    } catch (error) {
        /* when some error occurs */
        response.send({ status: 0, message: error || "We have faced some issue", category: null });
    }
}

/* update category */
exports.updatecategory = async (request, response) => {
    /* separating request body */
    const requestbody = request.body;

    /* updating category id */
    const categoryid = requestbody.id;

    /* updating category based on the category id */
    /* we will need doc id of the respective category to update it */
    try {
        /* finding out all the docs with this category id - in actual case there will be only 1 object present */
        const snapshot = await categories.where("id", "==", categoryid).get();

        console.log(categoryid);

        /* checking if the category id is correct or not */
        if (snapshot.docs.length == 0) {
            /* no category present with this category id */
            response.send({ status: 0, message: `No category present with ${categoryid}` });
        }
        else {
            /* separating the 0th category from the doc list */
            const firstcategory = snapshot.docs[0];

            /* seprating doc id from this category */
            const docid = firstcategory.id;

            /* updating this category with this doc id */
            try {
                const dbresponse = await categories.doc(docid).update(requestbody);

                /* sending response back to user */
                response.send({ status: 1, message: "Category updated successfully", category: requestbody });
            } catch (error) {
                /* some error occurs during category update */
                response.send({ status: 0, message: error || "Error occured during category update", category: null });
            }
        }

    } catch (error) {
        /* error occurs during finding category */
        response.send({ status: 0, message: error || "Error occured during category search", category: null });
    }
}