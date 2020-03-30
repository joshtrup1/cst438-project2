var express = require('express');
var router = express.Router();

var helpers = require('../helpers/items');

//http://localhost:1407/api/items/5e8118df2a50ed0bf00ab1555e81/user/5e7c3643134187f54d67e187


router.route('/')
    .get(helpers.getItems)
    .post(helpers.createItem)

router.route('/search')
    .get(helpers.getBySearch)

router.route('/:itemId')
    .get(helpers.getItemById)
    .put(helpers.updateItem)
    .delete(helpers.deleteItem)
    .get(helpers.getBySearch)

router.route('/user')
    .get(helpers.getUsers)

router.route('/user/:userId')
    .get(helpers.getUserById)
    

router.route('/:itemId/user/:userId')
    .get(helpers.addItemToUsersCart)



module.exports = router;