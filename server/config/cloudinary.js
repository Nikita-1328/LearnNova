const cloudinary = require("cloudinary").v2; //! Cloudinary is being required

exports.cloudinaryConnect = () => {
	try {
		const { CLOUD_NAME, API_KEY, API_SECRET } = process.env
		if (!CLOUD_NAME || !API_KEY || !API_SECRET || CLOUD_NAME.includes("your_") || API_KEY.includes("your_") || API_SECRET.includes("your_")) {
			console.warn("Cloudinary credentials are missing or use placeholder values. Image uploads will fail until valid credentials are set in server/.env.")
			console.warn(`CLOUD_NAME=${CLOUD_NAME}, API_KEY=${API_KEY ? '***' : undefined}`)
			return
		}
		cloudinary.config({
			cloud_name: CLOUD_NAME,
			api_key: API_KEY,
			api_secret: API_SECRET,
		})
	} catch (error) {
		console.log(error);
	}
};
