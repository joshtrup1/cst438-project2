var express = require('express');
var router = express.Router();
// var db = require('../models');
var helpers = require('../helpers/item');



router.route('/')
    .get(helpers.getItems)
    .post(helpers.createItem)


router.route('/:itemId')
    .get(helpers.getItemById)
    .put(helpers.updateItem)
    .delete(helpers.deleteItem)


module.exports = router;