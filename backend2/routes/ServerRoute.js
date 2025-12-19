function createServer() {

}

function getServers() {

}

function getServerInfo() {

}

function deleteUserNote() {

}

function joinServer() {

}

function deleteServer() {

}

const serverRoutes = {
	'GET:/api/server/': createServer,
	'POST:/api/server/': getServers,
	'GET:/api/server/:serverId/': getServerInfo,
	'DELETE:/:serverId/users/:userId/notes': deleteUserNote,
	'POST://:serverId/join': joinServer,
	'DELETE:/:serverId': deleteServer
}

module.exports = serverRoutes