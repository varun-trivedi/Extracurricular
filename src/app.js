const path = require("path");
const nodemailer = require("nodemailer");
const express = require("express");
require("./db/mongoose");
const User = require("./models/user");
const VenueRequest = require("./models/venueRequests");
const VenueBooking = require("./models/venueBookings");
const ClubApplication = require("./models/clubApplication");
const ClubMembers = require("./models/clubMembers");
const hbs = require("hbs");
const { getEventListeners } = require("events");
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

app.get("/homepage/:name&:lastName&:rollNo&:email&:mobileNo&:role",(req,res)=>{
    res.render("homepage",{
        description :"HomePage",
        name : req.params.name,
        lastName:req.params.lastName,
        rollNo:req.params.rollNo,
        email:req.params.email,
        role:req.params.role,
        mobileNo:req.params.mobileNo

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
//return all requests
app.get("/bookvenue",async (req,res)=>{
    try{
        const users = await VenueRequest.find({approved: false});
        if(users.length == 0)
            res.status(404).send();
        else
            res.status(201).send(users);
            
    }catch(e){
        res.status(500).send(e);
    }

})
//rendering venue approval page when required
app.get("/venue_approval",(req,res)=>{
    res.render("venue_approval",{
        description:"Approve Venue Applications"
    })
})

app.get("/bookvenue/:_id&:email",async (req,res)=>{ 
    try{
        const count = await VenueRequest.deleteOne({ _id: req.params._id }); // returns {deletedCount: 1} 
        if(count.deletedCount == 1)
        {
            const msg = {
                from: "varuntrivedi180302@gmail.com",
                to:req.params.email,
                subject:"Venue Booked.",
                text: "Your requested Venue has successfully been booked, Please check 'bookings' section for more details"
            };
            nodemailer.createTransport({
                service:"gmail",
                auth:{
                    user:"varuntrivedi180302@gmail.com",
                    pass:"wcrmqidixowlzdyu"
                },
                port:465,
                host:'smtp.gmail.com'
            })
            .sendMail(msg,(err )=>{
                if(err){
                    console.log("error");
                }
                else{
                    console.log("Email sent");
                }
            })
            res.status(201).send(count);
        }    
        else
            res.status(404).send();
    }
    catch(e){
        res.status(500).send(e);
    }
})
//saving venue booking
app.post("/venue_approval",(req,res) =>{
    const venuebooking = new VenueBooking(req.body);
    venuebooking.save().then(()=>{
        res.send(venuebooking);
    }).catch((e) =>{
        res.status(400).send(e);
    })
})
//load club application page
app.get("/club_request",(req,res)=>{
    res.render("club_request",{
        description:"Send Club Request"
    })
})
//store application in database
app.post("/club_request",(req,res) =>{
    //console.log("here");
    const clubrequest = new ClubApplication(req.body);
    clubrequest.save().then(()=>{
        res.send(clubrequest);
    }).catch((e) =>{
        res.status(400).send(e);
    })
})
app.get("/club_request/:rollNo&:clubName",async (req,res)=>{
    try{
        const users = await ClubApplication.find({rollNo:req.params.rollNo,clubName:req.params.clubName});
        if(users.length == 0)
            res.status(404).send([]);
        else
            res.status(201).send(users);
            
    }catch(e){
        res.status(500).send(e);
    }
    
})
//load club approval page
app.get("/club_approval/",(req,res)=>{
    res.render("club_approval",{
        description:"Send Club Request",
        role:req.query.role
    })
})
//fetch pending applications for a particular club
app.get("/approveClub/:clubname",async (req,res)=>{
    try{
        const applications = await ClubApplication.find({clubName : req.params.clubname});
        if(applications.length == 0)
            res.status(404).send();
        else
            res.status(201).send(applications);
            
    }catch(e){
        res.status(500).send(e);
    }

})
//adding to Club Members
app.post("/approveClub",(req,res) =>{
    const member = new ClubMembers(req.body);
    member.save().then(()=>{
        res.send(member);
    }).catch((e) =>{
        res.status(400).send(e);
    })
})
//deleting application upon decision
app.get("/approve_club/:_id&:email",async (req,res)=>{ 
    try{
        const count = await ClubApplication.deleteOne({ _id: req.params._id }); // returns {deletedCount: 1} 
        if(count.deletedCount == 1)
        {
            const msg = {
                from: "varuntrivedi180302@gmail.com",
                to:req.params.email,
                subject:"Club Application Accepted!",
                text: "Your Club Application has been accepted!"
            };
            nodemailer.createTransport({
                service:"gmail",
                auth:{
                    user:"varuntrivedi180302@gmail.com",
                    pass:"wcrmqidixowlzdyu"
                },
                port:465,
                host:'smtp.gmail.com'
            })
            .sendMail(msg,(err )=>{
                if(err){
                    console.log("error");
                }
                else{
                    console.log("Email sent");
                }
            })
            res.status(201).send(count);
        }    
        else
            res.status(404).send();
    }
    catch(e){
        res.status(500).send(e);
    }
})


//starting app

app.listen(port,()=>{
    console.log("Server is up on port 3000");
})