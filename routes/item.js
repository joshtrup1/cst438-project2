var express = require('express');
var router = express.Router();
// var db = require('../models');
var helpers = require('../helper/items');



router.route('/')
    .get(helpers.getItems)
    .post(helpers.createItem)


router.route('/:itemId')
    .get(helpers.getItemById)
    .put(helpers.updateItem)
    .delete(helpers.deleteItem)

router.route('/user')
    .get(helpers.getUsers)

router.route('/user/:userId')
    .get(helpers.getUserById)




module.exports = router;