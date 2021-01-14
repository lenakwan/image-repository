//Import all of the controller commands here. 
//the goal is to have it do api.get(/, fileimported)
const express = require("express");
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser'); 
let cors = require('cors');

const api = express.Router();

api.use(bodyParser.urlencoded({ extended: false })) 
// parse application/json
api.use(bodyParser.json()) 
api.use(cors());

//fix routing to stop displaying CANNOT GET /
api.get('/', (req, res) => res
  .send({
    message: 'Hello, this is the API that I made for the shopify Summer 2021 Intern Challenge! If you need help with using this API please contact me at lenakwan@gmail.com'
  }));

  api.get('*', (req, res) => res
  .send({
    message: 'Hello, this is the API that I made for the shopify Summer 2021 Intern Challenge! If you need help with using this API please contact me at lenakwan@gmail.com'
  }));
module.exports= api;