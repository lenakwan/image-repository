const itemModel = require('../model/itemModel');

// Add item to database, body requires item_name, image_text, item_category, quantity, private, price, discount, user_id
addValidItem = async (req, res) => {
        let body = req.body;
        itemModel.addItem(body.item_name, body.image_text, body.item_category, body.quantity, body.private, body.price, body.discount, body.user_id).then((data) => {
            res.status(200).json('New Entry Created for' + body.item_name);
        }).
        catch(e => res.status(500).json({
            message: e.message
        }));
    
}


validPublicItems = async (req, res) => {
    itemModel.getPublicItems().then((data) => {
        res.status(200).json(data.rows);
    }).
    catch(e => res.status(500).json({
        message: e.message
    }));
}

validUserItems = async (req, res) => {
    let user_id = req.params.user_id;
    if (!user_id) {
        res.status(401).json('Unauthorized Request.')
    } else {
        itemModel.getUserItems(user_id).then((data) => {
            res.status(200).json(data.rows).catch(e => res.status)
        }).catch(e => res.status(500).json({
            message: e.message
        }));
    }

}
validDeleteAll = async (req, res) => {
    let user_id = req.params.user_id;
    if (!user_id) {
        res.status(401).json('Unauthorized User, delete failed.')
    } else {
        itemModel.deleteUserItems(user_id).then((data) => {
            res.status(200).json('Items Deleted from Database');
        }).catch(e => res.status(404).json({
            message: e.message
        }));
    }
}

validDeleteSpecific = async (req, res) => {
    let user_id = 1; //hard code user before implementing login
    let body = req.body;
    itemModel.deleteSpecificItem(user_id, body.img_id).then((data) => {
        res.status(200).json('User Item Deleted from Database');
    }).catch(e => res.status(404).json({
        message: e.message
    }));
}

editValidItem = async (req, res) => {
    let user_id = 1; //hard code before implementing login
    let body = req.body;
    itemModel.updateItem(user_id, body.image, body.img_id, body.quantity, body.discount, body.item_name, body.item_category, body.price, body.private).then((data) => {
        res.status(200).json('Item Edited from Database');
    }).catch(e => res.status(404).json({
        message: e.message
    }));
}



module.exports = {
    addValidItem: addValidItem,
    validPublicItems: validPublicItems,
    validDeleteAll: validDeleteAll,
    validDeleteSpecific: validDeleteSpecific,
    editValidItem: editValidItem,
    validUserItems: validUserItems
}