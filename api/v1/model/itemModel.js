const db = require('../database');

addItem= async (item_name, image_text, item_category, quantity, private, price, discount, user_id)=> {
    return await db.pool.query(`INSERT INTO items (item_name, item_category, list_date, quantity, private
        , price, discount, img_id, fk_user_id) VALUES('${item_name}', '${image_text}', '${item_category}', current_timestamp, '${quantity}'
        , '${private}', '${price}', '${discount}', nextval('items_img_id_seq'), '${user_id}')`);
}

getUserItems = (user_id) =>{
    return db.pool.query("Select image_text from items where fk_user_id ='" + user_id +"'");
}

getPublicItems = () => {
    return db.pool.query("Select image_text from items where private = false");
}


module.exports = {
    addItem: addItem,
    getUserItems:getUserItems,
    getPublicItems:getPublicItems
}

