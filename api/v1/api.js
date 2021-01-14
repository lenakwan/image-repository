//Import all of the controller commands here. 
//the goal is to have it do api.get(/, fileimported)
const express = require("express");
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser'); 
const landingpage = require('./index');
let cors = require('cors');

const api = express.Router();

api.use(bodyParser.urlencoded({ extended: false })) 
// parse application/json
api.use(bodyParser.json()) 
api.use(cors());

api.post('/', landingpage.landingResponse);

module.exports= api;