const Course = require("../models/Course")

// Return a list of distinct tags used across all courses
exports.getAllTags = async (req, res) => {
  try {
    const tags = await Course.distinct("tag")
    return res.status(200).json({ success: true, data: tags })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Failed to fetch tags",
      error: error.message,
    })
  }
}
