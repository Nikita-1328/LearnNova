const mongoose = require("mongoose")

const tagSchema = new mongoose.Schema({
	name: { type: String, required: true, unique: true, trim: true },
	count: { type: Number, default: 0 },
	courses: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Course",
		},
	],
	createdAt: { type: Date, default: Date.now },
})

// Add a course to a tag (creates tag if missing)
tagSchema.statics.addCourse = async function (tagName, courseId) {
	const Tag = this
	if (!tagName) return null
	const name = tagName.trim()
	let tag = await Tag.findOne({ name })
	if (!tag) {
		tag = await Tag.create({ name, courses: [courseId], count: 1 })
		return tag
	}
	const courseExists = tag.courses.some((id) => id.equals(courseId))
	if (!courseExists) {
		tag.courses.push(courseId)
		tag.count = tag.courses.length
		await tag.save()
	}
	return tag
}

// Remove a course reference from a tag (optionally delete tag if no courses left)
tagSchema.statics.removeCourse = async function (tagName, courseId, removeIfEmpty = false) {
	const Tag = this
	if (!tagName) return null
	const name = tagName.trim()
	const tag = await Tag.findOne({ name })
	if (!tag) return null
	tag.courses = tag.courses.filter((id) => !id.equals(courseId))
	tag.count = tag.courses.length
	if (removeIfEmpty && tag.count === 0) {
		await Tag.deleteOne({ _id: tag._id })
		return null
	}
	await tag.save()
	return tag
}

// Return most popular tags sorted by count
tagSchema.statics.getPopular = async function (limit = 10) {
	return this.find({}).sort({ count: -1 }).limit(limit).lean()
}

// Simple search by prefix or substring
tagSchema.statics.searchTags = async function (query, limit = 10) {
	if (!query) return []
	const regex = new RegExp(query, "i")
	return this.find({ name: regex }).limit(limit).lean()
}

module.exports = mongoose.model("Tag", tagSchema)

