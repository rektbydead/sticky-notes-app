const http = require('http')
const fs = require('fs')
const path = require('path')
const { createClientInstance } = require('./database')
const authenticationRoutes = require("./routes/AuthRoute");
const serverRoutes = require("./routes/ServerRoute");
const categoryRoutes = require("./routes/CategoryRoute");
const noteRoutes = require("./routes/NoteRoute");



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

const FRONTEND_DIRECTORY = path.join(__dirname, '../frontend2/');

const mimeTypes = {
	'.html': 'text/html',
	'.js': 'text/javascript',
	'.css': 'text/css',
	'.png': 'image/png',
	'.jpg': 'image/jpeg',
	'.svg': 'image/svg+xml'
};


const server = http.createServer(async (request, response) => {
	response.setHeader("Access-Control-Allow-Origin", "*");
	response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
	response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
	response.setHeader("Content-Type", "application/json");

	if (request.method === "OPTIONS") {
		response.writeHead(204)
		response.end();
		return;
	}

	try {
		const body = await parseBody(request)
		if (request.url.startsWith('/api/auth/')) {
			const responseData = await authenticationRoutes[request.url](body)
			response.end(JSON.stringify(responseData))
			return
		} else if (request.url.startsWith('/api/category/')) {
			const responseData = await categoryRoutes[`${request.method}:${request.url}`](body)
			response.end(JSON.stringify(responseData))
			return
		} else if (request.url.startsWith('/api/note/')) {
			const responseData = await noteRoutes[`${request.method}:${request.url}`](body)
			response.end(JSON.stringify(responseData))
			return
		} else if (request.url.startsWith('/api/server/')) {
			const responseData = await serverRoutes[`${request.method}:${request.url}`](body)
			response.end(JSON.stringify(responseData))
			return
		}

		let filePath = request.url === '/' ? 'index.html' : request.url;
		if (filePath.startsWith('/')) filePath = filePath.slice(1);

		filePath = path.join(FRONTEND_DIRECTORY, filePath)

		fs.readFile(filePath, (error, fileContent) => {
			if (error) {
				response.writeHead(404)
				response.end('File not found')
			} else {
				const extension = path.extname(filePath)
				response.writeHead(200, { 'Content-Type': mimeTypes[extension] || 'text/plain' })
				response.end(fileContent)
			}
		});
	} catch(e) {
		console.log(e)
		response.writeHead(400)
		response.end(JSON.stringify({
			error: e.message,
		}))
	}
})

async function startServer() {
	await createClientInstance()
	server.listen(5000, () => {
		console.log(`Server running on  http://localhost:5000`)
	})
}

startServer()