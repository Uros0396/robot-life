const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const isImg = file.mimetype.startsWith("image/");
    const isVideo = file.mimetype.startsWith("video/");

    if (!isImg && !isVideo) {
      throw new Error("Not supported file");
    }
    return {
      folder: "ROBOTLIFE",
      allowed_formats: ["jpg", "png", "gif", "mp4", "mov", "avi"],
      resource_type: isVideo ? "video" : "image",

      public_id: file.originalname.split(".")[0],
    };
  },
});

const cloud = multer({ storage: cloudStorage });

module.exports = cloud;
