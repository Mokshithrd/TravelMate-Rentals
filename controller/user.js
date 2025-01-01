const User=require("../models/user");


module.exports.renderSignupform=async(req,res)=>{
    res.render("signup.ejs");
};

module.exports.signUp=async(req,res)=>{
    try{
    let {email,username,password}=req.body;
    let newUser=new User({email,username});
    const registeredUser=await User.register(newUser,password);
    req.login(registeredUser,(err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","Welcome to TravelMate-Rentals!");
        res.redirect("/listing");
    });
   
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signUp");
    }
};

module.exports.renderLoginform=async(req,res)=>{
    res.render("login.ejs");
};

module.exports.login=async(req,res)=>{
    req.flash("success","Welcome to TravelMate-Rentals");
    let redirectUrl=res.locals.redirectUrl || "/listing";
    res.redirect(redirectUrl);
};

module.exports.logout=async(req,res,next)=>{
    req.logOut((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","LogOut Successfully!");
        res.redirect("/listing");
    })
};