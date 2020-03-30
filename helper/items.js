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
    Item.findById(req.params.itemId)
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
        res.json({message: "items with id has been deleted"});
    })
    .catch((err) => {
        res.send(err);
    });
};

exports.getUsers = (req,res) => {
    User.find().then((users) => {
        res.json(users);
    })
    .catch((err) => {
        res.send(err);
    });
};

exports.getBySearch = (req,res) => {
    // { title: { $eq: title } }
    let result = req.query
    Item.find({color: req.query.color,price:req.query.price}).exec((err,item) => {
        if(err) {
            res.json({
                status:"error",
                data:err
            })
        }
        else {
            res.json(item)
        }
    });
};

exports.getUserById = (req,res) => {
    
    User.findById(req.params.userId).then((user) => {
        res.json(user);
    })
    .catch((err) => {
        res.send(err);
    });
};


exports.addItemToUsersCart = (req,res) => {
    User.findByIdAndUpdate(req.params.userId).then((user) => {
        user.itemsInCart.push(req.params.itemId)
        res.json(user);
    })
    .catch((err) => {
        res.send(err);
    });
};


module.exports = exports;