const mongoose=require("mongoose");
const initData=require("./data.js");
const listing=require("../models/listing.js");

main()
.then((res)=>{
     console.log("connected to DB");
})
.catch((err)=>{
  console.log(err);
});
async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/rentalVehicles")
}

const init=async ()=>{
    await listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({
      ...obj,
      owner:'676e650f526de3893e3fba9b',
    }));
    await listing.insertMany(initData.data);
};

// init();
