const {getCollection} = require("../database");
const {ObjectId} = require("mongodb");

async function createCategory(data) {
	const { name, serverId } = data

	const servers = await getCollection("servers")
	const categories = await getCollection("categories")

	const server = await servers.findOne({ _id: new ObjectId(serverId) })
	if (server === null) {
		throw new Error('No server found.')
	}

	await categories.insertOne({
		name: name,
		server_it_belongs: new ObjectId(serverId),
		is_default: false,
		created_at: new Date()
	})

	return {
		message: `Category created successfully.`,
	}
}

async function getCategories(data) {
	const { serverId } = data

	const servers = await getCollection("servers")
	const categories = await getCollection("categories")

	const server = await servers.findOne({ _id: new ObjectId(serverId) })
	if (server === null) {
		throw new Error('No server found.')
	}

	return await categories
		.find({ server_it_belongs: new ObjectId(serverId) })
		.toArray()
}

async function deleteCategory(data) {
	const { categoryId } = data

	const categories = await getCollection("categories")
	const category = await categories.findOne({ _id: new ObjectId(categoryId) })
	if (category === null) {
		throw new Error('No category found.')
	}

	await categories.deleteOne({ _id: new ObjectId(categoryId) })

	return {
		message: `Category deleted successfully.`,
	}
}


const categoryRoutes = {
	'GET:/api/category/': getCategories,
	'POST:/api/category/': createCategory,
	'DELETE:/api/category/': deleteCategory,
}

module.exports = categoryRoutes