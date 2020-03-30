var mongoose = require('mongoose');


itemSchema = new mongoose.Schema({
    color: String,
    price: String,
    link: String,
    isAvailable: {
        type: Boolean,
        default: true
    }

})

var Item = mongoose.model("Item",itemSchema);

module.exports = Item;

