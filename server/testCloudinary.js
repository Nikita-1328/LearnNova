require('dotenv').config()
const cloudinary = require('cloudinary').v2

async function testUpload(filePath) {
  const { CLOUD_NAME, API_KEY, API_SECRET, FOLDER_NAME } = process.env
  if (!CLOUD_NAME || !API_KEY || !API_SECRET || CLOUD_NAME.includes('your_')) {
    console.error('Cloudinary credentials appear missing or are placeholders. Update server/.env with valid CLOUD_NAME, API_KEY, API_SECRET.')
    process.exit(1)
  }

  cloudinary.config({ cloud_name: CLOUD_NAME, api_key: API_KEY, api_secret: API_SECRET })

  try {
    const res = await cloudinary.uploader.upload(filePath, { folder: FOLDER_NAME || 'LearnNova-Test' })
    console.log('Upload successful:', res.secure_url)
  } catch (err) {
    console.error('Upload failed:', err.message || err)
    process.exit(2)
  }
}

const filePath = process.argv[2]
if (!filePath) {
  console.error('Usage: node testCloudinary.js <path-to-image>')
  process.exit(1)
}

testUpload(filePath)
