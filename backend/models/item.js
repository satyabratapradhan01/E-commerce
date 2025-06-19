const mongoose = require("mongoose");
const Category = require("./category");
const Schema = mongoose.Schema;


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
    },
    Category: [
        {
            type: Schema.Types.ObjectId,
            ref: "category"
        }
    ],
    seller: {
        type: Schema.Types.ObjectId,
        ref: "user"
    }
});


const Item = mongoose.model("Item", itemSchema);

module.exports = Item;