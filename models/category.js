const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    productType: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'active' 
    }
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
