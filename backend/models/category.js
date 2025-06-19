const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new mongoose.Schema({
    productType: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'active' 
    },
    seller: {
        type: Schema.Types.ObjectId,
        ref: "user"
    }
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
