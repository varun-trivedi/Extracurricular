const path = require("path");
const express = require("express");
const hbs = require("hbs");
const app = express();
//const port = process.env.PORT || 3000

//defining paths for express config
const viewsPath = path.join(__dirname,"../templates/views");
const partialsPath = path.join(__dirname,"../templates/partials");

app.use(express.static(path.join(__dirname,"../public")));

app.set("view engine","hbs");
app.set("views",viewsPath);
hbs.registerPartials(partialsPath);
app.get("",(req,res)=>{
    res.render("index",{
        name :"HomePage"
    });
})
app.get("/technical",(req,res)=>{
    res.render("technical",{
        description:"Technical Page"
    })
})
app.listen(3000,()=>{
    console.log("Server is up on port 3000");
})