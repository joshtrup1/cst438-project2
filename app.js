const express = require("express");
const session = require("express-session");
var mongoose = require("mongoose");
var passport = require("passport");
var bodyParser = require('body-parser');
var localStrategy = require('passport-local');
var passportLocalMongoose = require("passport-local-mongoose");
var flash = require('connect-flash');
var router = express.Router();

//npm install ejs body-parser mongoose passport passport 
var uri = "mongodb://sampop:Project2@cluster0-shard-00-00-hnxfk.mongodb.net:27017,cluster0-shard-00-01-hnxfk.mongodb.net:27017,cluster0-shard-00-02-hnxfk.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority";
var localHost = "mongodb://localhost:27017/Project2SamJoshEricRoy"
mongoose.connect(uri,{useNewUrlParser: true, useUnifiedTopology: true });

const app = express();


var itemRoutes = require('./routes/item')
//test



var User = require('./models/user');
var Item = require('./models/item');


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(require('express-session')({

    secret: "application secret shhhh",
    resave: false,
    saveUninitialized: false
}));

passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/public/',express.static(__dirname + '/public/'));


app.use(passport.initialize());
app.use(passport.session());


// render home page
app.get("/", function(req, res){
    res.render("index");
 });
 app.use('/api/items',itemRoutes);
 
 // render create account page
app.get('/createAccount', function(req,res) {
    res.render('createAccount'); 
});

// create new account 
app.post("/createAccount",(req,res)=> {
    req.body.username;
    req.body.password;
    User.register(new User({username:req.body.username}),req.body.password,(err,user) =>{
        if(err) {
            console.log(err);

            return res.render("createAccount");
        }
        passport.authenticate("local")(req,res,() => {
            res.redirect('/login');
            console.log(req.body.username
                +  " " + req.body.password);
            console.log(user);
            
        });

    });
});


//login

app.get("/login",(req,res) => {
    res.render("login")
    User.find(function(err,users) {
        if(err) {
            console.log(err);
        }
        // console.log(users);
    })
});


app.post('/login',passport.authenticate("local",{

    successRedirect: "/lightsabers",
    failureRedirect: "/login"
}),(req,res)=> {

});



function isLoggedIn(req,res,next) {
    console.log("CALL")
    if(req.isAuthenticated()) {
        console.log("logged in ");
        return next();

    }
    res.redirect("/login");
    console.log("error loggin in");
}


//logout 

app.get("/logout",(req,res)=> {
    req.logout();
    res.redirect('/');
});


//lightsabers


//render new item page
app.get("/newItem",(req,res)=> {
    res.render("newItem");
    
});


// create new item 
app.post('/newItem', async (req,res) => {
    const item = new Item({
        color:req.body.color,
        price:req.body.price, 
        link:req.body.link
    })
    
    try{
        const newItem = await item.save()
        res.redirect('lightsabers')
    } catch {
        res.render('newItem', {
            item: item,
            errorMessage:'Error creating item'
        })
    }
    
}) 



//render update item page
app.get("/updateItem",(req,res)=> {
    res.render("updateItem");
    
});


// render shopping cart page
app.get("/cart",(req,res)=> {
    res.render("cart");
    
});


app.get('/createLightsaber',(req,res)=> {
    req.flash('')
    res.render("newItem",{user:req.User});
    console.log("user is with us");
    console.log(req.user)
});

app.get('/updateItem',(req,res)=> {
    res.render("updateItem");

});

app.get('/createLightsaber',(req,res)=> {
    res.render("newItem",{user:req.User});
    console.log("user is with us");
    console.log(req.user)
});

app.get('/updateItem',(req,res)=> {
    res.render("updateLightsaber");

});

app.get('/deleteLightsaber',(req,res)=> {
    res.render("updateLightsaber");

});






//API Routes============================

// app.get('/lightsaber',isLoggedIn,(req,res) => {
//     res.flash("username",req.user);
//     Item.find()
//     .then((items) => {
//         res.json(items);
    
//     })
//     .catch((err) => {
//         res.send(err);
//     })
//     res.render("lighsabers",{items:items,user:req.user});
//     // res.render("lightsabers");
// })

// app.get('/lightsaber/:id',isLoggedIn,(req,res) => {
//     res.flash("username",req.user);
//     Item.find()
//     .then((items) => {
//         res.json(items);
    
//     })
//     .catch((err) => {
//         res.send(err);
//     })
//     res.render("lighsabers",{items:items,user:req.user});
//     // res.render("lightsabers");
// })

// app.post('/lightsaber',(req,res) => {
//     Item.create(req.body)
//     .then(function(newTodo) {
//         // console.log(newTodo);
//         res.status(201).json(newTodo);
//         console.log("Done");
//     })
//     .catch((err) => {
//         res.send(err);
//     })
// })

// app.put('/lightsaber/:itemID',(req,res) => {
//     Item.findOneAndUpdate({_id: req.params.todoId},req.body,{new:true})
//     .then((todo) => {
//         res.json(todo);
//     })
//     .catch((err) => {
//         res.send(err);
//     });
// });

// app.delete("/lightsaber/:itemID",(req,res) => {
//     Item.remove({_id: req.params.todoId}).then(() => {
//         res.json({message: "we deleted it"});
//     })
//     .catch((err) => {
//         res.send(err);
//     });
// })


//SERVER PORT
const port = process.env.PORT || 3012; //new port server name 


app.listen(port,process.env.IP,() => {
    console.log(`http://localhost:${port}`);
})

