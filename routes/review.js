const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js")
const { validateReview, isLoggedin, isReviewAuthor } = require("../middleware.js")


//post reviews
router.post("/", isLoggedin, validateReview, wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);

    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    console.log(newReview.author);
    listing.reviews.push(newReview);  

    await newReview.save();
    await listing.save();

    console.log("New review saved");
    req.flash("success", "Review added");
    res.redirect(`/listings/${id}`);
}));


//DELETE REVIEW
router.delete("/:reviewId", isLoggedin, isReviewAuthor, wrapAsync(async (req, res) => {

    let { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);

    req.flash("success", "Review deleted");
    res.redirect(`/listings/${id}`);
}));

module.exports = router;