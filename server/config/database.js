const mongoose = require("mongoose");
require("dotenv").config();

const MONGODB_URL = process.env.MONGODB_URL;
const Category = require("../models/Category");

const seedCategories = async () => {
	try {
		const count = await Category.countDocuments();
		if (count === 0) {
			console.log("Seeding default categories...");
			const defaultCategories = [
				{ name: "Python", description: "Learn Python programming language from basics to advanced." },
				{ name: "Web Development", description: "Full stack web development including HTML, CSS, JavaScript, React, Node.js." },
				{ name: "Data Science", description: "Data analysis, visualization, and machine learning with Python and R." },
				{ name: "Machine Learning", description: "Supervised, unsupervised learning, neural networks and deep learning." },
				{ name: "Mobile Development", description: "Android and iOS app development with Flutter, React Native, and native tools." }
			];
			await Category.insertMany(defaultCategories);
			console.log("Categories seeded successfully!");
		} else {
			console.log(`Database already has ${count} categories. Skipping seed.`);
		}
	} catch (error) {
		console.log("Error seeding categories:", error);
	}
};

exports.connect = () => {
	mongoose
		.connect(MONGODB_URL, {
			useNewUrlparser: true,
			useUnifiedTopology: true,
		})
		.then(() => {
			console.log(`DB Connection Success`);
			seedCategories();
		})
		.catch((err) => {
			console.log(`DB Connection Failed`);
			console.log(err);
			process.exit(1);
		});
};
