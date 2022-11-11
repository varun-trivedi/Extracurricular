const path = require("path");
const express = require("express");
require("./db/mongoose");
const User = require("./models/user");
const VenueRequest = require("./models/venueRequests");
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

//validating user login details
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
//rendering landing page and other pages when needed
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
//showing the addUser page and adding the user to the database
app.get("/addUser",(req,res)=>{
    res.render("addUser",{
        description:"Add new user here"
    })
})
app.post("/addUsers",(req,res) =>{
    //console.log("here");
    const user = new User(req.body);
    user.save().then(()=>{
        res.send(user);
    }).catch((e) =>{
        res.status(400).send(e);
    })
})
//showing admin login page(can be combined with user login)
app.get("/admin_login",(req,res)=>{
    res.render("admin_login",{
        description:"Admin Login Page",
    })
})
//validating admin password
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
//Displaying Admin Control Panel
app.get("/admin_homepage",(req,res)=>{
    res.render("admin_homepage",{
        description:"Welcome Admin!",
    })
})

//submitting a venue request
app.get("/venue_booking",(req,res)=>{
    res.render("venue_booking",{
        description:"Submit Venue Application Request"
    })
})
app.post("/bookvenue",(req,res) =>{
    const venuerequest = new VenueRequest(req.body);
    venuerequest.save().then(()=>{
        res.send(venuerequest);
    }).catch((e) =>{
        res.status(400).send(e);
    })
})

//starting app

app.listen(port,()=>{
    console.log("Server is up on port 3000");
})