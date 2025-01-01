const express = require("express");
const mongoose = require("mongoose");
const router = express.Router({ mergeParams: true }); // Merge parameters
const wrapAsync = require("../utils/wrapAsync");
const { reviewSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const RentalVehicle = require("../models/listing.js");
const Review = require('../models/review.js');
const { isLoggedIn } = require("../middleware.js");
const reviewController = require("../controller/review.js");

// Validate review schema
const validateReviewSchema = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        throw new ExpressError(400, `Validation Error: ${error.details[0].message}`);
    } else {
        next();
    }
};

// Add a review
router.post('/',isLoggedIn, validateReviewSchema, wrapAsync(reviewController.createReview));

// Delete a review
router.delete("/:reviewId", wrapAsync(reviewController.destroyReview));

module.exports = router;
