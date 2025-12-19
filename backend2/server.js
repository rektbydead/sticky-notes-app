const http = require('http')
const { createClientInstance } = require('./database')
const authenticationRoutes = require("./routes/AuthRoute");



function parseBody(req) {
	return new Promise((resolve, reject) => {
		let body = ''
		req.on('data', chunk => body += chunk.toString())
		req.on('end', () => {
			try {
				resolve(body ? JSON.parse(body) : {})
			} catch (e) {
				reject(new Error('Invalid JSON'))
			}
		})

		req.on('error', reject)
	})
}


const server = http.createServer(async (request, response) => {
	if (!request.url.startsWith('/api/')) {
		response.writeHead(200)
		response.end()
		return
	}

	response.setHeader('Content-Type', 'application/json')
	const body = await parseBody(response)

	if (request.url.startsWith('/api/auth/')) {
		return await authenticationRoutes[request.url](body)
	} else if (request.url.startsWith('/api/category/')) {

	} else if (request.url.startsWith('/api/note/')) {

	} else if (request.url.startsWith('/api/server/')) {

	}


})

async function startServer() {
	await createClientInstance()
	server.listen(5000, () => {
		console.log(`Server running on  http://localhost:5000`)
	})
}

startServer()