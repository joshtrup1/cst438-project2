var Item = require("../models/item")


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
    Item.find()
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
    Item.remove({_id: req.params.itemId}).then(() => {
        res.json({message: "we deleted it"});
    })
    .catch((err) => {
        res.send(err);
    });
};

module.exports = router;