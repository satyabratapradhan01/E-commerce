const express = require('express')
const app = express();
const port = 8080;
const mongoose = require('mongoose');
const Path = require('path');
const cookieParser = require('cookie-parser')
const methodOverride = require('method-override');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ExpressError = require("./utils/ExpressError.js");
const wrapAsync = require("./utils/wrapAsync.js")

const Item = require('./models/item.js');
const adminUser = require('./models/user.js');
const Category = require('./models/category.js');
const { hash } = require('crypto');

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(Path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(cookieParser());



main().then((res) => {
    console.log("connection successful");
})
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/e-commerce');
}

// home page
app.get("/item", async (req, res) => {
    let items = await Item.find();
    res.render("home", { items });
});

//add new product
app.get("/item/new", (req, res) => {
    res.render("./admin/addNewProduct");
});

//add item
app.post("/items", wrapAsync((req, res) => {

    let { img, title, description, price } = req.body;
    let newItem = new Item({
        img: img,
        title: title,
        description: description,
        price: price
    })
    newItem.save();
    res.redirect("/item");

}));

//show all product
app.get("/item/allitem", async (req, res) => {
    let items = await Item.find();
    res.render("./admin/productManagement", { items });
})

//item edit
app.get("/item/:id/edit", async (req, res) => {
    let { id } = req.params;
    let item = await Item.findById(id);
    res.render("./admin/editProduct", { item });
})


// Update Product
app.put("/item/:id",wrapAsync( async (req, res) => {
    let { id } = req.params;
    const { productImage, productTitle, productDescription, productPrice } = req.body;
    let UpdateItem = await Item.findByIdAndUpdate(
        id,
        {
            img: productImage,
            title: productTitle,
            description: productDescription,
            price: productPrice,
        },
        { runValidaters: true, new: true }
    );
    // console.log(UpdateItem)
    res.redirect("/item/allitem")
}));

//item delete
app.get("/item/:id/delete", async (req, res) => {
    let { id } = req.params;
    let item = await Item.findById(id);
    res.render("./admin/deleteProduct", { item });
})

//DELETE PRODUCT
app.delete("/item/:id", async (req, res) => {
    let { id } = req.params;
    let deleteItem = await Item.findByIdAndDelete(id);
    res.redirect("/item/allitem")
})

//Admin login and sign up

app.get("/admin", async (req, res) => {
    const User = await  adminUser.find();
  
    res.render('./admin/adminLogin', {User});
})

app.get("/signup", (req, res) => {
    res.render('./admin/adminSignup');
})
//Admin sign up
app.post("/adminCreate", (req, res) => {
    const { username, email, password } = req.body;
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hars) => {
            const adminCreate = await adminUser.create({
                username,
                email,
                password: hars
            })

            let token = jwt.sign({ email }, "password");
            res.cookie("token", token);
            res.redirect("/admin");
        })
    })


})

//Admin login

app.post("/adminLogin", async (req, res) => {
    let user = await adminUser.findOne({ email: req.body.email });
    if (!user) return res.send("somting is worng")

    bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (result) {
            let token = jwt.sign({ email: user.emai }, "password");
            res.cookie("token", token);
            res.render('./admin/adminDashbord.ejs');
        }
        else res.send("somthing is wrong");
    })
})

//  product category
app.get('/category', async (req, res) => {
    const User = await  adminUser.find();
    

    res.render('./admin/productCategory.ejs', {User} );
})

app.post('item/:id/productCategory', (req, res) => {
    const {id} = req.params;
    console.log(id)
    let { productType, status } = req.body;
    let newCatagory = new Category({
        productType: productType,
        status: status
    })

    newCatagory.save();
    res.send('your product is save.....')
})







app.use((req, res, next) => {
    next(new ExpressError(404, "page Not Found"));
})

app.use((err, req, res, next) => {
    let { status = 500, message = "Somting went worng" } = err;
    res.status(status).render('error.ejs', { message });
})

app.listen(port, () => {
    console.log(`app listing port no ${port}`)
})