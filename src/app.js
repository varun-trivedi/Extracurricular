const path = require("path");
const express = require("express");
require("./db/mongoose");
const User = require("./models/user");
const hbs = require("hbs");
const app = express();
const port = process.env.PORT || 3000

//defining paths for express config
const viewsPath = path.join(__dirname,"../templates/views");
const partialsPath = path.join(__dirname,"../templates/partials");

app.use(express.json(),[express.static(path.join(__dirname,"../public"))]);

app.set("view engine","hbs");
app.set("views",viewsPath);
hbs.registerPartials(partialsPath);

app.post("/addUsers",(req,res) =>{
    //console.log("here");
    const user = new User(req.body);
    user.save().then(()=>{
        res.send(user);
    }).catch((e) =>{
        res.status(400).send(e);
    })
})
app.get("/users/:name&:password",async (req,res)=>{
    try{
        const users = await User.find({name : req.params.name,password:req.params.password});
        if(users.length == 0)
            res.status(404).send();
        else
            res.status(201).send(users);
            
    }catch(e){
        res.status(500).send(e);
    }

})
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
    })
})
app.get("/cultural",(req,res)=>{
    res.render("cultural",{
        description:"Cultural Page",
    })
})
app.get("/sports",(req,res)=>{
    res.render("sports",{
        description:"Sports Page",
    })
})
app.get("/addUser",(req,res)=>{
    res.render("addUser",{
        description:"Add new user here"
    })
})
app.get("/admin_login",(req,res)=>{
    res.render("admin_login",{
        description:"Admin Login Page",
    })
})
app.get("/admin_login/:password",async (req,res)=>{
    try{
         if(req.params.password == "varun123")
             res.send({
                message:"ok"
             });
         else
             {
                res.status(404).send();
             }
            
    }catch(e){
        res.status(500).send(e);
    }

})
app.get("/admin_homepage",(req,res)=>{
    res.render("admin_homepage",{
        description:"Welcome Admin!",
    })
})

app.listen(port,()=>{
    console.log("Server is up on port 3000");
})