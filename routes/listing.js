const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");

const Listing = require("../models/listing.js");
const { isLoggedin, isOwner, validateListing } = require("../middleware.js");




// app.use(flash());

//index route
router.get("/", wrapAsync(async (req, res) => {

    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });

}));


//new listings route
router.get("/new", isLoggedin, (req, res) => {

    res.render("listings/new.ejs");
})

router.post("/", isLoggedin, validateListing, wrapAsync(async (req, res, next) => {
    let newListing = new Listing(req.body);
    newListing.owner = req.user._id;
    await newListing.save();
    console.log("saved to db successfully");

    req.flash("success", "New Listing created");
    res.redirect("/listings");
})
)


//show details route
router.get("/:id", wrapAsync(async (req, res) => {

    let { id } = req.params;
    let detailListing = await Listing.findById(id).populate({path: "reviews", populate: {path: "author"}}).populate("owner");
    if (!detailListing) {
        req.flash("error", "Listing not found");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { detailListing });

}));


//edit route
router.get("/:id/edit", isLoggedin, isOwner, wrapAsync(async (req, res) => {

    let { id } = req.params;
    let editListing = await Listing.findById(id);
    if (!editListing) {
        req.flash("error", "Listing not found");
        return res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { editListing });
}));

router.put("/:id", isLoggedin, isOwner, validateListing, wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body }) // destructure
    req.flash("success", "Listing updated");
    res.redirect(`/listings/${id}`);
}));

//delete route
router.delete("/:id", isLoggedin, isOwner, wrapAsync(async (req, res) => {

    let { id } = req.params;
    req.flash("success", "Listing deleted");
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");

}));

module.exports = router;