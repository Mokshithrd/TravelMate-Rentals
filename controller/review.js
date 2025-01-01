const RentalVehicle = require("../models/listing.js");
const mongoose = require("mongoose");
const Review = require('../models/review.js');
module.exports.createReview=async (req, res, next) => {
    const { id } = req.params; // Extract 'id' from merged params
    const { rating, comment } = req.body;

    // Find vehicle and add review
    const vehicle = await RentalVehicle.findById(id).populate('reviews');
    if (!vehicle) {
        return next(new ExpressError(404, 'Rental vehicle not found'));
    }

    const review = new Review({  rating: parseInt(req.body.rating, 10), // Convert rating to a number
        comment: req.body.comment, });
    review.author=req.user._id;

    if (!rating || isNaN(parseInt(rating, 10))) {
        req.flash('error', 'Invalid rating. Please provide a valid number.');
        return res.redirect(`/listing/${id}`);
    }
    
    await review.save();

    vehicle.reviews.push(review);
    await vehicle.save();

    req.flash("success","New Review Added!");
         req.flash("error", "An error occurred while processing your request.");

    res.redirect(`/listing/${id}`);
};

module.exports.destroyReview=async (req, res) => {
    const { id, reviewId } = req.params;

    // Remove the review from the vehicle's reviews array
    await RentalVehicle.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    // Delete the review document
    await Review.findByIdAndDelete(reviewId);

    req.flash("success","Review Deleted!");
         req.flash("error", "An error occurred while processing your request.");

    res.redirect(`/listing/${id}`);
};