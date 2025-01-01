const Joi = require('joi');
const review = require('./models/review');

const rentalVehicleSchema = Joi.object({
    type: Joi.string().valid('Car', 'Bike').required(),
    brand: Joi.string().min(1).max(100).required(),
    model: Joi.string().min(1).max(100).required(),
    year: Joi.number().integer().min(2000).max(new Date().getFullYear()).required(),
    description: Joi.string().min(10).max(1000).required(),
    pricePerDay: Joi.number().min(1).required(),
    location: Joi.string().min(2).max(100).required(),
    country: Joi.string().min(2).max(100).required(),
    features: Joi.string().required(),
    availability: Joi.boolean().required(),
    rating: Joi.number().min(0).max(5).optional(),
});

module.exports = { rentalVehicleSchema };

module.exports.reviewSchema=Joi.object({
    rating: Joi.number().required().min(0).max(5), // Validate 'rating'
    comment: Joi.string().required().min(5).max(500),
});
