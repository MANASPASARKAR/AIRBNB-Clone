// require("dotenv").config();


const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js")
const port = 8090;
const listings = require("./routes/listing.js")
const reviews = require("./routes/review.js")
const session = require("express-session")


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")))

// mongoose.connect(process.env.MONGODB_URI)
//   .then(() => console.log("MongoDB Atlas connected"))
//   .catch(err => console.log(err));


async function main() {
    mongoose.connect("mongodb://127.0.0.1:27017/wanderlust")
}

main()
    .then(() => {
        console.log("connected to db");
    })
    .catch(err => { console.log(err) });


app.use("/listings", listings)
app.use("/listings/:id/reviews", reviews)

const sessionOptions = {
    secret: "MySuperSecretCode",
    resave: false,
    saveUninitialized: true
}

app.use(session(sessionOptions))

//root
app.get("/", (req, res) => {
    res.redirect("/listings");

})

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