const {getDatabase, getCollection} = require("../database");

async function register(data) {
	const { name, email, password } = data
	const users = await getCollection('users')

	const existingUser = await users.findOne({ email: email })
	if (existingUser) {
		throw Error(`User already exists`)
	}

	const result = await users.insertOne({
		name: name,
		email: email,
		password: password,
		createdAt: new Date(),
	})

	return {
		_id: result.insertedId,
		name: name,
		email: email,
	}
}

async function login(data) {
	const { email, password } = data
	const users = await getCollection('users')

	const user = await users.findOne({ email: email, password: password })
	if (!user) {
		throw Error(`Wrong email or password`)
	}

	return {
		_id: user._id,
		email: user.email,
		name: user.name,
	}
}

async function changePassword(data) {
	const { email, currentPassword, newPassword } = data
	console.log(newPassword)
	const users = await getCollection('users')

	const user = await users.findOne({ email: email, password: currentPassword })
	if (!user) {
		throw Error(`Wrong password`)
	}

	await users.updateOne(
		{ _id: user._id },
		{
			$set: {
				password: newPassword,
				updated_at: new Date()
			}
		}
	)

	return {
		message: `Password changed successfully`,
	}
}

const authenticationRoutes = {
	'/api/auth/register/': register,
	'/api/auth/login/': login,
	'/api/auth/change-password/': changePassword,
}

module.exports = authenticationRoutes