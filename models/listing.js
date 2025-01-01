const mongoose=require("mongoose");
const { Schema } = mongoose;
const Review=require("./review.js");
const User=require("./user.js");
main()
.then((res)=>{
     console.log("connected to DB");
})
.catch((err)=>{
  console.log(err);
});

async function main() {
    await mongoose.connect("mongodb+srv://mokshithrd1001206:xN2f8ejfwY5gIBLj@cluster0.nkczl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
}


const rentalVehicleSchema = new mongoose.Schema({
    type: { type: String, required: true }, // "Car" or "Bike"
    brand: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    description: { type: String, required: true },
    image: { url: String,filename:String}, // URL to the vehicle's image
    pricePerDay: { type: Number, required: true },
    location: { type: String, required: true }, // e.g., City name
    country: { type: String, required: true },
    features: { type: [String] }, // Array of features (e.g., "GPS", "Air Conditioning")
    availability: { type: Boolean, default: true },
    rating: { type: Number, min: 0, max: 5 },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Review',
      },
    ],
    owner:{
      type:Schema.Types.ObjectId,
      ref:'User'
    }
});

rentalVehicleSchema.post("findOneAndDelete",async(listing)=>{
 if(listing){
  await Review.deleteMany({_id:{$in :listing.reviews}});
 }
});

const RentalVehicle = mongoose.model('RentalVehicle', rentalVehicleSchema);
module.exports = RentalVehicle;

