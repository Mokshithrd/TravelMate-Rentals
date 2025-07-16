// routes/payment.js
const express = require('express');
const router = express.Router({ mergeParams: true });
const Vehicle = require('../models/listing'); // Assuming your vehicle model is named 'listing'
const { isLoggedIn } = require('../middleware'); // Assuming you have this middleware
const ExpressError = require('../utils/ExpressError');
const wrapAsync = require('../utils/wrapAsync');

// Route to prepare payment details and render the payment page
router.post('/:vehicleId/prepare-payment', isLoggedIn, wrapAsync(async (req, res, next) => {
    const { vehicleId } = req.params;
    // Changed pricePerDay to pricePerHour in destructuring
    const { pickupDate, pickupTime, dropoffDate, pricePerHour, vehicleBrand, vehicleModel } = req.body;

    // 1. Basic Input Validation
    if (!pickupDate || !pickupTime || !dropoffDate || !pricePerHour || !vehicleBrand || !vehicleModel) {
        req.flash('error', 'Missing booking details. Please provide all required information.');
        return res.redirect(`/listing/${vehicleId}`);
    }

    const pickupDateTime = new Date(`${pickupDate}T${pickupTime}`);
    // For dropoff, we need to consider the full end of the day if only date is provided,
    // or assume it's also at the same time as pickup if no dropoff time is given.
    // For per-hour calculation, it's crucial to have a precise dropoff time.
    // Assuming dropoffDate implies dropoff at the *same time* as pickup if no dropoff time input,
    // but typically a dropoff time input would also be present for hourly rates.
    // For simplicity, let's assume dropoffDate implies dropoff at the *end of that day* (23:59:59)
    // or you add a dropoffTime input in your EJS.
    // For now, let's just use the dropoffDate as the start of that day.
    // A more accurate approach would be to also have a 'dropoffTime' input.
    const dropoffDateTime = new Date(dropoffDate);
    // If you want to include the full last day, you might set it to end of day:
    // dropoffDateTime.setHours(23, 59, 59, 999);

    // More robust date/time validation
    if (isNaN(pickupDateTime.getTime()) || isNaN(dropoffDateTime.getTime())) {
        req.flash('error', 'Invalid date or time format provided.');
        return res.redirect(`/listing/${vehicleId}`);
    }

    if (pickupDateTime < new Date()) {
        req.flash('error', 'Pickup date and time cannot be in the past.');
        return res.redirect(`/listing/${vehicleId}`);
    }

    if (dropoffDateTime < pickupDateTime) { // Changed to < for strict check
        req.flash('error', 'Dropoff date must be after pickup date.');
        return res.redirect(`/listing/${vehicleId}`);
    }

    // 2. Calculate Total Price (based on hours)
    const timeDiffMs = Math.abs(dropoffDateTime.getTime() - pickupDateTime.getTime());
    // Calculate total hours, rounding up to ensure full hour charge for any part of an hour
    const totalHours = Math.ceil(timeDiffMs / (1000 * 60 * 60)); // Convert milliseconds to hours
    const totalPrice = totalHours * parseFloat(pricePerHour);

    // 3. Store booking details in session for the payment page
    req.session.bookingDetails = {
        vehicleId,
        pickupDate,
        pickupTime,
        dropoffDate,
        vehicleBrand,
        vehicleModel,
        pricePerHour: parseFloat(pricePerHour), // Changed to pricePerHour
        totalPrice,
        totalHours, // Changed from days to totalHours
        user: req.user._id
    };

    res.redirect('/booking'); // Redirect to the actual payment page (which is /booking due to app.use("/booking", paymentRoutes))
}));

// GET route to render the payment page
router.get('/', isLoggedIn, (req, res) => {
    const bookingDetails = req.session.bookingDetails;

    if (!bookingDetails) {
        req.flash('error', 'No booking details found. Please select a vehicle and dates first.');
        return res.redirect('/listing'); // Redirect to main listings or home
    }

    res.render('payment', { bookingDetails }); // Render the payment.ejs
});

// POST route to simulate payment processing
router.post('/process', isLoggedIn, wrapAsync(async (req, res, next) => {
    const bookingDetails = req.session.bookingDetails;

    if (!bookingDetails) {
        req.flash('error', 'No booking details found for payment processing.');
        return res.redirect('/listing');
    }

    // In a real application, you would integrate with a payment gateway here.
    // For this example, we'll just simulate success.

    // After successful payment, you would typically create the actual booking record in your database.
    // This would involve creating a new instance of your Booking model and saving it.
    // Example (assuming you have a Booking model defined in models/Booking.js):
    /*
    const Booking = require('../models/Booking'); // Make sure this path is correct
    const newBooking = new Booking({
        vehicle: bookingDetails.vehicleId,
        user: bookingDetails.user,
        pickupDateTime: new Date(`${bookingDetails.pickupDate}T${bookingDetails.pickupTime}`),
        dropoffDateTime: new Date(bookingDetails.dropoffDate), // Or include dropoffTime if you add it
        totalPrice: bookingDetails.totalPrice,
        status: 'Confirmed' // Or 'Pending' if further action is needed
    });
    await newBooking.save();
    */

    // Clear booking details from session after processing
    delete req.session.bookingDetails;

    req.flash('success', `Payment successful! Your booking for ${bookingDetails.vehicleBrand} ${bookingDetails.vehicleModel} is confirmed.`);
    res.redirect(`/listing/${bookingDetails.vehicleId}`); // Redirect back to the vehicle page
}));

module.exports = router;
