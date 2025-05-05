const mongoose = require("mongoose");

const itemSchema = ({
    img: {
        type: String,
        require: true
    },
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    price:{
        type: Number,
        require: true
    }
})


const Item = mongoose.model("Item", itemSchema);

module.exports = Item;