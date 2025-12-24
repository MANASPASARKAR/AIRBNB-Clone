const Listing = require("../models/listing.js");
const axios = require("axios");

//index
module.exports.index = async (req, res) => {

    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });

}


//new listing
module.exports.newListingForm = (req, res) => {
    res.render("listings/new.ejs");
}

module.exports.postListing = async (req, res, next) => {
    const geoResponse = await axios.get(
        `https://api.maptiler.com/geocoding/${encodeURIComponent(req.body.location)}.json?key=${process.env.MAP_API_KEY}`
    );
    const geoData = geoResponse.data.features[0];

    const newListing = new Listing(req.body);

    newListing.geometry = {
        type: "Point",
        coordinates: geoData.geometry.coordinates.map(Number)
    };

    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        newListing.image = { url, filename };
    }

    newListing.owner = req.user._id;
    await newListing.save();
    console.log("saved to db successfully");
    req.flash("success", "New Listing created");
    res.redirect("/listings");
}



//show listing
module.exports.showListing = async (req, res) => {

    let { id } = req.params;
    let detailListing = await Listing.findById(id).populate({ path: "reviews", populate: { path: "author" } }).populate("owner");
    if (!detailListing) {
        req.flash("error", "Listing not found");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { detailListing });

}


//edit Listing
module.exports.editListingForm = async (req, res) => {

    let { id } = req.params;
    let editListing = await Listing.findById(id);
    if (!editListing) {
        req.flash("error", "Listing not found");
        return res.redirect("/listings");
    }

    let origImage = editListing.image.url;
    origImage = origImage.replace("/upload", "/upload/w_250");
    res.render("listings/edit.ejs", { editListing, origImage });
}

module.exports.putEditedListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);

    if (listing.location !== req.body.location) {
        const geoResponse = await axios.get(
            `https://api.maptiler.com/geocoding/${encodeURIComponent(req.body.location)}.json?key=${process.env.MAP_API_KEY}`
        );
        const geoData = geoResponse.data.features[0];

        listing.geometry = {
            type: "Point",
            coordinates: geoData.geometry.coordinates.map(Number)
        };
    }
    Object.assign(listing, req.body); // destructure

    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };

    }

    await listing.save();
    req.flash("success", "Listing updated");
    res.redirect(`/listings/${id}`);
}


//delete Listing
module.exports.deleteListing = async (req, res) => {

    let { id } = req.params;
    req.flash("success", "Listing deleted");
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");

}
