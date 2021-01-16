const db = require('../database');

addItem = async (item_name, image, item_category, quantity, private, price, discount, user_id) => {
    return await db.pool.query(`INSERT INTO items (item_name, image, item_category, list_date, quantity, private
        , price, discount, img_id, fk_user_id) VALUES('${item_name}', '${image}', '${item_category}', current_timestamp, '${quantity}'
        , '${private}', '${price}', '${discount}', nextval('items_img_id_seq'), '${user_id}')`);
}

getUserItems = (user_id) => {
    return db.pool.query({
        text: "Select * from items where fk_user_id = $1",
        values: [user_id]
    });
}

getPublicItems = () => {
    return db.pool.query("Select * from items where private = false");
}

deleteUserItems = (user_id) => {
    return db.pool.query({
        text: "DELETE FROM items WHERE fk_user_id = $1",
        values: [user_id]
    });
}

//Require user_id so users cannot delete each other's items, should add jwt later for authentication
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