const express = require('express')
const app = express();
const port = 8080;
const Path = require('path');

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(Path.join(__dirname, 'public')));


app.get("/", (req, res) =>{
    res.render("home");
})



app.listen(port, ()=>{
    console.log(`app listing port no ${port}`)
})