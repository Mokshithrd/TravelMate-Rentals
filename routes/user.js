const express=require("express");
const mongoose=require("mongoose");
const wrapAsync = require("../utils/wrapAsync");
const router=express.Router();
const User=require("../models/user");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const userController = require("../controller/user");


router
    .route("/signUp")
    .get(userController.renderSignupform)
    .post(wrapAsync(userController.signUp));

router
    .route("/login")
    .get(userController.renderLoginform)
    .post(saveRedirectUrl,passport.authenticate("local",{ failureRedirect:"/login",failureFlash:true}),userController.login);

router.get("/logout",userController.logout);
module.exports=router;