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
        description:"Login Page"
    })
})

app.get("/homepage",(req,res)=>{
    res.render("homepage",{
        description :"HomePage",
        name : req.query.name

    });
})
app.get("/technical",(req,res)=>{
    res.render("technical",{
        description:"Technical Page",
        message : req.query.message
    })
})
app.get("/cultural",(req,res)=>{
    res.render("cultural",{
        description:"Cultural Page",
        message : req.query.message
    })
})
app.get("/sports",(req,res)=>{
    res.render("sports",{
        description:"Sports Page",
        message : req.query.message
    })
})

app.listen(3000,()=>{
    console.log("Server is up on port 3000");
})