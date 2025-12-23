const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedin, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");

//index route
router.get("/", wrapAsync(listingController.index));


//new listings route
router.get("/new", isLoggedin, listingController.newListingForm);
router.post("/", isLoggedin, validateListing, wrapAsync(listingController.postListing));


//show details route
router.get("/:id", wrapAsync(listingController.showListing));


//edit route
router.get("/:id/edit", isLoggedin, isOwner, wrapAsync(listingController.editListingForm));
router.put("/:id", isLoggedin, isOwner, validateListing, wrapAsync(listingController.putEditedListing));

//delete route
router.delete("/:id", isLoggedin, isOwner, wrapAsync(listingController.deleteListing));


module.exports = router;