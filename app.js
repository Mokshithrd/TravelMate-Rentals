if (process.env.NODE_ENV != "production") {
    require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const RentalVehicle = require("./models/listing.js"); // Assuming this is your main listing model
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const { rentalVehicleSchema, reviewSchema } = require("./schema.js"); // Assuming these are Joi schemas
const Review = require('./models/review'); // Your Review model
const listingRoutes = require("./routes/listing.js"); // Renamed to listingRoutes for clarity
const reviewsRoutes = require("./routes/review.js");   // Renamed to reviewsRoutes for clarity
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js"); // Your User model
const userRouter = require("./routes/user.js");

// NEW: Import the payment routes
const paymentRoutes = require("./routes/payment.js");



const dburl = process.env.ATLASDB_URL;
mongoose.connect(dburl)
    .then(() => {
        console.log("Connected to DB");
    })
    .catch((err) => {
        console.log(err);
    });

app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "public")));


const store = MongoStore.create({
    mongoUrl: dburl,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600, // Update session once every 24 hours
});

store.on("error", (err) => { // Added 'err' parameter to the callback
    console.log("Error in MONGO SESSION-STORE", err);
});

const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        httpOnly: true,
    }
};


app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

// Use your existing routes
app.use("/listing", listingRoutes);
// Ensure this path matches how you're calling it in your EJS (e.g., /listing/:id/reviews)
app.use("/listing/:id/reviews", reviewsRoutes);
app.use("/", userRouter);

// NEW: Use the payment routes
// This will handle routes like /booking/:vehicleId/prepare-payment and /payment
app.use("/booking", paymentRoutes); // Prefix for payment-related routes

// Example contact and about routes
app.get("/contact", (req, res) => {
    res.render("contact.ejs");
});

app.get("/about", (req, res) => {
    res.render("about.ejs", { title: "About TravelMate Rentals" });
});

// Catch-all for undefined routes
app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});

// Error handling middleware
app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Something Went Wrong!" } = err;
    res.status(statusCode).render("error.ejs", { message });
});

app.listen(3000, () => {
    console.log(`Listening on port 3000`);
});