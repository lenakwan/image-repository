const itemModel = require('../model/itemModel');

// Add item to database, body requires item_name, image_text, item_category, quantity, private, price, discount, user_id
addValidItem = async (req, res) => {
    let user_id = 1; //hardcoding user before I implement login
    if (!user_id) {
        res.status(402).json('Unauthorized User, login required.')
    } else {
        let body = req.body;
        itemModel.addItem(body.item_name, body.image_text, body.item_category, body.quantity, body.private, body.price, body.discount, user_id).then( (data) => {
            res.status(200).json('New Entry Created for' + body.item_name);
        }).
        catch(e => res.status(500).json({message:e.message}));
    }
}


getAllPublicItems = async (req, res) => {
    let data = await itemModel.getPublicItems();
    data.then(([data,meta]) => {
        res.status(200).json(data);
    }).
    catch(e => res.status(500).json({message:e.message}));
}

module.exports = {
    addValidItem: addValidItem,
    getAllPublicItems: getAllPublicItems
}