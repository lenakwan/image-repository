//Import all of the controller commands here for routing.
//the goal is to have it do api.get(/, fileimported)
const express = require("express");
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
let cors = require('cors');
let itemController = require('./controller/itemController');

const api = express.Router();

api.use(bodyParser.urlencoded({
    extended: false
}))
// parse application/json
api.use(bodyParser.json())
api.use(cors());


//fix routing to stop displaying CANNOT GET /
api.get('/', (req, res) => res
    .send({
        message: 'Hello, this is the API that I made for the shopify Summer 2021 Intern Challenge! If you need help with using this API please contact me at lenakwan@gmail.com'
    }));

api.post('/item', itemController.addValidItem);

api.get('/items', itemController.getAllPublicItems);

api.get('/items:user_id', itemController.validUserItems);

api.put('/items', itemController.editValidItem);

api.delete('/items:user_id', itemController.validDeleteAll);

api.delete('/items', itemController.validDeleteSpecific);

module.exports = api;