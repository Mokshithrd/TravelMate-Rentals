const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the review schema
const reviewSchema = new Schema({
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  comment: {
    type: String,
                
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  author:{
    type:Schema.Types.ObjectId,
    ref:"User",
  }
});

module.exports = mongoose.model('Review', reviewSchema);
