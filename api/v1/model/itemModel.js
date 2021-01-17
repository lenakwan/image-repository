const db = require('../database');

/**
 * Adds an item into the database.
 *
 * @param {string} item_name name of item
 * @param {string} image datauri for item image
 * @param {string} item_category category of item 
 * @param {integer} quantity stock of item
 * @param {boolean} private indicates if object should be published to public
 * @param {integer} price price of item
 * @param {integer} discount intended discount, should range 0-100 
 * @param {integer} user_id user ID 
 */
addItem = async (item_name, image, item_category, quantity, private, price, discount, user_id) => {
    return await db.pool.query(`INSERT INTO items (item_name, image, item_category, list_date, quantity, private
        , price, discount, img_id, fk_user_id) VALUES('${item_name}', '${image}', '${item_category}', current_timestamp, '${quantity}'
        , '${private}', '${price}', '${discount}', nextval('items_img_id_seq'), '${user_id}')`);
}

/**
 * Retrieves all items belonging to this user.
 *
 * @param {integer} user_id user ID 
 */
getUserItems = (user_id) => {
    return db.pool.query({
        text: "Select * from items where fk_user_id = $1",
        values: [user_id]
    });
}

/**
 * Retrieves all items that are set as public.
 *
 * 
 */
getPublicItems = () => {
    return db.pool.query("Select * from items where private = false");
}

/**
 * Deletes all items from user.
 *
 * @param {integer} user_id user ID 
 */
deleteUserItems = (user_id) => {
    return db.pool.query({
        text: "DELETE FROM items WHERE fk_user_id = $1",
        values: [user_id]
    });
}

/**
 * Deletes specific item from database.
 *
 * @param {integer} user_id user ID to verify rights
 * @param {integer} img_id img ID to search for image
 */
deleteSpecificItem = (user_id, img_id) => {
    return db.pool.query({
        text: "DELETE FROM items WHERE fk_user_id = $1 AND img_id = $2",
        values: [user_id, img_id]
    });
}

//string input must be '' for psql, "" does not work for psql
updateItem = (user_id, image, img_id, quantity, discount, item_name, category, price, privacy) => {
    return db.pool.query({
        text: "UPDATE items SET item_name = $1, image = $2, item_category = $3, quantity = $4, private= $5, price = $6, discount = $7 WHERE img_id = $8 AND fk_user_id = $9",
        values: [item_name, image, category, quantity, privacy, price, discount, img_id, user_id]
    });
}



module.exports = {
    addItem: addItem,
    getUserItems: getUserItems,
    getPublicItems: getPublicItems,
    deleteUserItems: deleteUserItems,
    deleteSpecificItem: deleteSpecificItem,
    updateItem: updateItem
}