const itemModel = require('../model/itemModel');

// Add item to database, body requires item_name, image_text, item_category, quantity, private, price, discount, user_id
addValidItem = async (req, res) => {
    let user_id = 1; //hardcoding user before I implement login
    if (!user_id) {
        res.status(402).json('Unauthorized User, login required.')
    } else {
        let body = req.body;
        itemModel.addItem(body.item_name, body.image_text, body.item_category, body.quantity, body.private, body.price, body.discount, user_id).then(res.json({
                status: 200,
                success: true,
                message: "New Item added to Database."
            }))
            .catch(err => {
                res.json({
                    status: 404,
                    succes: false,
                    message: err
                });
                console.log(err);
            })
    }
}


getAllPublicItems = async (req, res) => {
    itemModel.getPublicItems().then(res.json({
        status: 200,
        success: true,
        message: "New Item added to Database."
    }))
    .catch(err => {
        res.json({
            status: 404,
            succes: false,
            message: err
        });
    })
}

module.exports = {
    addValidItem: addValidItem,
    getAllPublicItems: getAllPublicItems
}