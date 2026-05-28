const cloudinary = require("cloudinary").v2

exports.uploadImageToCloudinary = async (file, folder, height, quality) => {
  const options = { folder }
  if (height) {
    options.height = height
  }
  if (quality) {
    options.quality = quality
  }
  options.resource_type = "auto"
  console.log("OPTIONS", options)
  try {
    return await cloudinary.uploader.upload(file.tempFilePath, options)
  } catch (err) {
    console.error("Cloudinary upload failed:", err.message || err)
    // Rethrow with clearer message for frontend debugging
    throw new Error(
      `Cloudinary upload failed: ${err.message || "check CLOUD_NAME/API_KEY/API_SECRET in server/.env"}`
    )
  }
}
