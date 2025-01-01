const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require("dotenv").config();



// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME, // Fixed environment variable usage
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'TravelMate_DEV',
    allowed_formats: ['jpg', 'jpeg', 'png','webp'], // corrected formats
    secure: true,
  api_host: 'api-us.cloudinary.com'
  },
});

module.exports = { cloudinary, storage };
