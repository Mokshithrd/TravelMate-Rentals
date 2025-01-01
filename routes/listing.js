const express = require('express');
const router = express.Router();
const multer = require('multer');
const { storage } = require('../cloudConfig'); // Ensure destructuring matches the export
const upload = multer({ storage }); // Create multer instance with Cloudinary storage

// Middleware and Controller Imports
const wrapAsync = require('../utils/wrapAsync');
const { rentalVehicleSchema } = require('../schema.js');
const ExpressError = require('../utils/ExpressError.js');
const listingController = require('../controller/listing.js');
const { isLoggedIn } = require('../middleware.js');

// Validation Middleware
const validateSchema = (req, res, next) => {
  const { error } = rentalVehicleSchema.validate(req.body);

  if (error) {
    throw new ExpressError(400, `Validation Error: ${error.details[0].message}`);
  } else {
    next();
  }
};

// Routes
router
  .route('/')
  .get(wrapAsync(listingController.index))
  .post(isLoggedIn,upload.single('image'),validateSchema,wrapAsync(listingController.createListing))
  

router.get('/new', isLoggedIn, listingController.renderNewform);

router
  .route('/:_id')
  .get(isLoggedIn, wrapAsync(listingController.showListing))
  .put(isLoggedIn,upload.single('image'), validateSchema, wrapAsync(listingController.updateListing))
  .delete(isLoggedIn, wrapAsync(listingController.destroyListing));

router.get('/:_id/edit', isLoggedIn, wrapAsync(listingController.renderEditform));




module.exports = router;
