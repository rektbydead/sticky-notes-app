const { MongoClient } = require('mongodb')

const DATABASE_URL = 'mongodb://localhost:6000'
const DATABASE_NAME = 'sticky-notes'

let instance = undefined;

async function createClientInstance() {
	if (instance) return instance

	try {
		const client = await (new MongoClient(DATABASE_URL)).connect()
		instance = client.db(DATABASE_NAME)
	} catch (e) {
		console.log("Failed to connect to database", e)
		throw e
	}
}

async function getDatabase() {
	return await createClientInstance()
}

module.exports = { createClientInstance, getDatabase };