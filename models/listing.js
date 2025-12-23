const mongoose = require("mongoose");
const { type } = require("../schema");
const Review = require("./review.js")


const listingSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    image: {
        filename: { type: String, default: "listingimage" },
        url: {
            type: String,
            default: "https://images.unsplash.com/photo-1762545112336-646c69e4888b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            set: (v) => {
                if (!v || v.trim() === "") {
                    return "https://images.unsplash.com/photo-1762545112336-646c69e4888b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
                }
                return v;
            }
        }
    },


    price: {
        type: Number,
        min: 0,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    country: {
        type: String,
        required: true
    },

    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Review",
        }
    ],

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

});

listingSchema.post("findOneAndDelete", async (listing) => {
    if (!listing) return;

    await Review.deleteMany({_id: {$in: listing.reviews}}); 
    console.log("listing reviews deleted");
})

const listing = mongoose.model("listing", listingSchema)
module.exports = listing;