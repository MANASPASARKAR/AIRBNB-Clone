const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedin, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require('multer')
const { storage } = require("../cloudConfig.js");

const upload = multer({ storage })


//index route
router.route("/")
    .get(wrapAsync(listingController.index))
    .post(
        isLoggedin,
        upload.single('listing[image]'),
        validateListing,
        wrapAsync(listingController.postListing)
    )

//new listings route
router.get("/new", isLoggedin, listingController.newListingForm);


//show details route
router.route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(isLoggedin, isOwner, upload.single("listing[image]"), validateListing, wrapAsync(listingController.putEditedListing))
    .delete(isLoggedin, isOwner, wrapAsync(listingController.deleteListing));


//edit route
router.get("/:id/edit", isLoggedin, isOwner, wrapAsync(listingController.editListingForm));



module.exports = router;