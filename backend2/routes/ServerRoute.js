const {getCollection} = require("../database");
const {ObjectId} = require("mongodb");

async function createServer(data) {
	const { name, password, is_personal, userId } = data

	const servers = await getCollection("servers")
	const categories = await getCollection("categories")

	const serverResult = await servers.insertOne({
		name: name,
		password: password,
		is_personal: is_personal,
		server_creator: new ObjectId(userId),
		joined_users: [new ObjectId(userId)],
		created_at: new Date()
	})

	await categories.insertMany([
		{ name: 'General', server_it_belongs: serverResult.insertedId, is_default: true, created_at: new Date() },
		{ name: 'Archived', server_it_belongs: serverResult.insertedId, is_default: true, created_at: new Date() }
	])

	return {
		message: `Server created successfully.`,
	}
}

async function getServers(data) {
	const { userId } = data

	const servers = await getCollection("servers")
	return await servers.aggregate([
		{ $match: { joined_users: new ObjectId(userId) } },
		{
			$lookup: {
				from: 'users',
				localField: 'server_creator',
				foreignField: '_id',
				as: 'server_creator'
			}
		},
		{ $unwind: '$server_creator' },
		{
			$lookup: {
				from: 'users',
				localField: 'joined_users',
				foreignField: '_id',
				as: 'joined_users'
			}
		},
		{
			$lookup: {
				from: 'categories',
				localField: '_id',
				foreignField: 'server_it_belongs',
				as: 'categories'
			}
		},
		{
			$project: {
				password: 0,
				'server_creator.password': 0,
				'joined_users.password': 0,
				'categories.server_it_belongs': 0
			}
		}
	]).toArray()
}

async function getServerInfo(data) {
	const { serverId } = data

	const servers = await getCollection("servers")
	const server = await servers.aggregate([
		{ $match: { _id: new ObjectId(serverId) } },
		{
			$lookup: {
				from: 'users',
				localField: 'server_creator',
				foreignField: '_id',
				as: 'server_creator'
			}
		},
		{ $unwind: '$server_creator' },
		{
			$lookup: {
				from: 'users',
				localField: 'joined_users',
				foreignField: '_id',
				as: 'joined_users'
			}
		},
		{
			$project: {
				password: 0,
				'server_creator.password': 0,
				'joined_users.password': 0,
				'server_creator.server_it_belongs': 0
			}
		}
	]).next()

	if (server === null) {
		throw new Error('No server found.')
	}

	return server
}

async function deleteAllUserNotes(data) {
	const { serverId, userId } = data

	const servers = await getCollection("servers")
	const notes = await getCollection("notes")

	const server = await servers.findOne({ _id: new ObjectId(serverId) })
	if (server === null) {
		throw new Error('No server found.')
	}

	if (!server.server_creator.equals(new ObjectId(userId))) {
		throw new Error('User not owner.')
	}

	await notes.deleteMany({
		server_it_belongs: new ObjectId(serverId),
		note_creator: new ObjectId(userId)
	})

	return {
		message: `All notes deleted successfully.`,
	}
}

async function joinServer(data) {
	const { serverId, password, userId } = data

	const servers = await getCollection("servers")

	const server = await servers.findOne({ _id: new ObjectId(serverId) })
	if (server === null) {
		throw new Error('No server found.')
	}

	if (server.password !== password) {
		throw new Error('Wrong password.')
	}

	await servers.updateOne(
		{ _id: new ObjectId(serverId) },
		{ $push: { joined_users: new ObjectId(userId) } }
	);
}

async function deleteServer(data) {
	const { serverId } = data

	const servers = await getCollection("servers")
	const categories = await getCollection("categories")
	const notes = await getCollection("notes")

	const server = await servers.findOne({ _id: new ObjectId(serverId) })

	if (server === null) {
		throw new Error('No server found.')
	}

	await notes.deleteMany({ server_it_belongs: new ObjectId(serverId) })
	await categories.deleteMany({ server_it_belongs: new ObjectId(serverId) })
	await servers.deleteOne({ _id: new ObjectId(serverId) })

	return {
		message: `Server deleted successfully.`,
	}
}

async function kickUser(data) {
	const { serverId, userId } = data

	const servers = await getCollection("servers")

	const server = await servers.findOne({ _id: new ObjectId(serverId) })
	if (server === null) {
		throw new Error('No server found.')
	}

	if (server.server_creator._id === userId) {
		throw new Error('Cannot kick server creator.')
	}

	await servers.updateOne(
		{ _id: new ObjectId(serverId) },
		{ $pull: { joined_users: new ObjectId(userId) } }
	)

	return {
		message: `User kicked successfully.`,
	}
}

const serverRoutes = {
	'POST:/api/server/': createServer,
	'POST:/api/server/get/': getServers,
	'DELETE:/api/server/': deleteServer,

	'POST:/api/server/info/': getServerInfo,
	'POST:/api/server/join/': joinServer,
	'DELETE:/api/server/delete-all-user-notes/': deleteAllUserNotes,
	'DELETE:/api/server/kick-user/': kickUser,
}

module.exports = serverRoutes