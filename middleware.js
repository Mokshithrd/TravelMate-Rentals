const RentalVehicle = require("./models/listing");

module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.OringinalUrl;
        req.flash("error","Please Login First!!");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
    res.locals.redirectUrl=req.session.redirectUrl
    console.log(res.locals.redirectUrl);
    }
    next();
};

