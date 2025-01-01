const RentalVehicle=require("../models/listing.js");
const mongoose=require("mongoose");
const ExpressError = require("../utils/ExpressError.js");
module.exports.index=async (req,res)=>{
    const listing=await RentalVehicle.find({});
   
    res.render("index.ejs",{listing});
 };

module.exports.renderNewform=(req,res)=>{
    res.render("new.ejs");
};

module.exports.showListing=async(req,res,next)=>{
     let id=req.params._id;
     if (!mongoose.isValidObjectId(id)) {
        
         return next(new ExpressError(404, 'Page Not Found'));
     }
 
     const list=await RentalVehicle.findById(id).populate(  {  path: 'reviews',
        populate: { path: 'author', select: 'username' }}).populate('owner');

     res.render("show.ejs",{list,id});
 };

 module.exports.createListing = async (req, res, next) => {
    const { type, brand, model, year, description, pricePerDay, location, country, features, availability, rating } = req.body;

    // Check if the image was uploaded
    if (!req.file) {
        throw new ExpressError(400, 'Image is required.');
    }

    // Parse features into an array
    const featuresArray = features.split(',').map(feature => feature.trim());
    
    // Get image details from the file
    const url = req.file.path;        // URL of the uploaded image
    const filename = req.file.filename; // Filename of the uploaded image
    
    console.log(url, "...", filename);

    // Create new vehicle
    const newVehicle = new RentalVehicle({
        type,
        brand,
        model,
        year,
        description,
        image: { url, filename }, // Set image field with both URL and filename
        pricePerDay,
        location,
        country,
        features: featuresArray,
        availability: availability === "true", // Convert to boolean
        rating: parseFloat(rating)
    });

    newVehicle.owner = req.user._id;

    // Save to database
    await newVehicle.save();

    req.flash("success", "New Vehicle Added");
    req.flash("error", "An error occurred while processing your request.");

    res.redirect('/listing'); // Redirect to the listing page
};

  
  

module.exports.renderEditform=async(req,res)=>{
     let id=req.params._id;
     const vehicle=await RentalVehicle.findById(id);
     res.render("edit.ejs",{vehicle});
 };

module.exports.updateListing=async (req, res) => {
    try {
        const { _id } = req.params;
        const { type, brand, model, year, description, pricePerDay, location, country, features, availability, rating } = req.body;

        if (!req.file) {
            throw new ExpressError(400, 'Image is required.');
        }
        // Parse features into an array
        const featuresArray = features.split(',').map(feature => feature.trim());

         // Get image details from the file
        const url = req.file.path;        // URL of the uploaded image
        const filename = req.file.filename;

        // Update the vehicle in the database
       const vehicle= await RentalVehicle.findByIdAndUpdate(_id, {
            type,
            brand,
            model,
            year,
            description,
            image: { url, filename },
            pricePerDay,
            location,
            country,
            features: featuresArray,
            availability: availability === "true",
            rating: parseFloat(rating)
        },
        { new: true }
    );
        // await vehicle.save();
        req.flash("success","Vehicle Details Updated ");
        req.flash("error", "An error occurred while processing your request.");

        res.redirect(`/listing/${_id}`); // Redirect to the listing page
    } catch (error) {
        console.error(error);
        res.status(500).send("Error updating vehicle");
    }
};

module.exports.destroyListing=async(req,res)=>{
    let id=req.params._id;
    await RentalVehicle.findByIdAndDelete(id);
    req.flash("success","Vehicle Deleted");
        req.flash("error", "An error occurred while processing your request.");
    res.redirect("/listing");
};