const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js")
const { validateReview, isLoggedin, isReviewAuthor } = require("../middleware.js")
const reviewController = require("../controllers/reviews.js");

//post reviews
router.post("/", isLoggedin, validateReview, wrapAsync(reviewController.postReview));

//DELETE REVIEW
router.delete("/:reviewId", isLoggedin, isReviewAuthor, wrapAsync(reviewController.deleteReview));

module.exports = router;