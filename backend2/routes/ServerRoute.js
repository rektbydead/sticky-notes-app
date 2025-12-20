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
		server_creator: ObjectId(userId),
		joined_users: [ObjectId(userId)],
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
	return servers.aggregate([
		{ $match: { joined_users: ObjectId(userId) } },
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
}

async function deleteAllUserNote(data) {
	const { serverId, userId } = data
}

async function joinServer(data) {
	const { serverId, password, userId } = data
}

async function deleteServer(data) {
	const { serverId } = data
}

const serverRoutes = {
	'GET:/api/server/': createServer,
	'POST:/api/server/': getServers,
	'GET:/api/server/:serverId/': getServerInfo,
	'DELETE:/api/server/:serverId/users/:userId/notes': deleteAllUserNote,
	'POST:/api//:serverId/join': joinServer,
	'DELETE:/:serverId': deleteServer
}

module.exports = serverRoutes