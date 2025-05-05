const express = require('express')
const app = express();
const port = 8080;
const mongoose = require('mongoose');
const Path = require('path');
const Item = require('./models/item.js');
const methodOverride = require('method-override');

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(Path.join(__dirname, 'public')));
app.use(methodOverride('_method'));



main().then((res) => {
    console.log("connection successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/e-commerce');
}

// home page
app.get("/item", async(req, res) =>{
    let items = await Item.find();
    res.render("home", {items});
});

//add new product
app.get("/item/new", (req, res) => {
    res.render("newItem");
});

//add item
app.post("/items", (req, res) => {
    let {img, title, description, price} = req.body;
    let newItem = new Item({
        img: img,
        title: title,
        description: description,
        price: price
    })
    newItem.save().then((res) => {
        console.log(req.body);
        console.log("chat was saved....");
    }).catch((err) =>{
        console.log(err);
    })
    res.redirect("/item");
})

//show all product

app.get("/item/allitem", async(req, res) =>{
    let items = await Item.find();
    res.render("./admin/productManagement", {items});
})

//item edit
app.get("/item/:id/edit", async(req, res) => {
    let {id} = req.params;
    let item = await Item.findById(id);
    res.render("./admin/editProduct", {item});
})


// Update Product
app.put("/item/:id", async (req, res) => {
    let {id} = req.params;
    const { productImage, productTitle, productDescription, productPrice } = req.body;
    let UpdateItem = await Item.findByIdAndUpdate(
        id,
        {
            img: productImage,
            title: productTitle,
            description: productDescription,
            price: productPrice,
        },
        {runValidaters: true, new: true}
    );
    console.log(UpdateItem)
    res.redirect("/item/allitem")
})

//item delete
app.get("/item/:id/delete", async(req, res) => {
    let {id} = req.params;
    let item = await Item.findById(id);
    res.render("./admin/deleteProduct", {item});
})

//DELETE PRODUCT
app.delete("/item/:id", async (req, res) => {
    let {id} = req.params;
    let deleteItem = await Item.findByIdAndDelete(id);
    res.redirect("/item/allitem")
})


app.listen(port, ()=>{
    console.log(`app listing port no ${port}`)
})