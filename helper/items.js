var Item = require("../models/item")

var User = require("../models/user")


exports.getItems = (req,res) => {
    Item.find()
    .then((items) => {
        res.json(items);
    })
    .catch((err) => {
        res.send(err);
    })

};

exports.createItem = (req,res) => {
    Item.create(req.body)
    .then(function(newItem) {
        
        // console.log(newTodo);
        res.status(201).json(newTodo);
        console.log("Done");
    })
    .catch((err) => {
        res.send(err);
    })
};

exports.getItemById = (req,res) => {
    Item.find({_id: req.params.itemId})
    .then((items) => {
        res.json(items);
    
    })
    .catch((err) => {
        res.send(err);
    })
    // res.render("lightsabers");
}

exports.updateItem = (req,res) => {
    Item.findOneAndUpdate({_id: req.params.itemId},req.body,{new:true})
    .then((todo) => {
        res.json(todo);
    })
    .catch((err) => {
        res.send(err);
    });
};

exports.deleteItem = (req,res) => {
    Item.deleteOne({_id: req.params.itemId}).then(() => {
        res.json({message: "we deleted it"});
    })
    .catch((err) => {
        res.send(err);
    });
};

//Search Query

exports.getItemByColor = (req,res) => {
    Item.find({color: req.params.color}).then(() => {
        res.json(items);
    })
    .catch((err) => {
        res.send(err);
    });
};

exports.addItemToUserCart = (req,res) => {
    User.find({_id: req.params.userId}).then((user) => { 
        Item.find({_id: req.params.itemId}).then((item) => {
            user.itemsInCart.push(item);
            res.json(user,item);
        })
        .catch((err) => {
            res.send(err);
        });
    });
};

exports.removeItemFromCart = (req,res) => {
    User.find({_id: req.params.userId}).then((user) => { 
        Item.find({_id: req.params.itemId}).then((item) => {
            user.itemsInCart.pull(item);
            res.json({users:user,items:item});
        })
        .catch((err) => {
            res.send(err);
        });
    });
};


module.exports = exports;