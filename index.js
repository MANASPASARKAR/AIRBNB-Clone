if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js")
const port = 8090;


const session = require("express-session");
const MongoStore = require("connect-mongo").default;
const flash = require("connect-flash");


const userRouter = require("./routes/user.js");
const listingRouter = require("./routes/listing.js")
const reviewRouter = require("./routes/review.js")


const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));



let dburl = process.env.MONGODB_URL;
async function main() {
    await mongoose.connect(dburl)
}

main()
    .then(() => {
        console.log("connected to db");
    })
    .catch(err => { console.log(err) });



const store = MongoStore.create({
    mongoUrl: dburl,
    crypto: {
        secret: process.env.SECRET
    },  
    touchAfter: 24 * 60 * 60,
})

store.on("error", (err) => {
    console.log("SESSION STORE ERROR ", err);
})

const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true
    }
}


app.use(session(sessionOptions));
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currentUser = req.user;
    res.locals.MAP_API_KEY = process.env.MAP_API_KEY;
    next();
})

//root
app.get("/", (req, res) => {
    res.redirect("/listings");
})

// app.get("/demoUser", async (req, res) => {
//     let fakeUser = new User({
//         username: "demoUser",
//         email: "demoUser@gmail.com"
//     });

//     let regUser = await User.register(fakeUser, "password");
//     res.send(regUser);
// })


app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

//err handler
app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
});


app.use((err, req, res, next) => {

    let { status = 500, message } = err;

    res.status(status).render("error.ejs", { message });
})


app.listen(port, () => {
    console.log("Server Listening on port 8090");
})