import {apiFetch} from "../../apiFetch.js";
import {useAuthentication} from "../context/AuthenticationContext.jsx";

export async function createServer(name, password, is_personal, userId) {
	return await apiFetch('/api/server/', {
        method: 'POST',
        body: JSON.stringify({
            name,
            password,
            is_personal,
			userId: userId
        }),
    })
}

export async function getServers(userId) {
	return await apiFetch('/api/server/', {
        method: 'GET',
		body: JSON.stringify({
			userId: userId
		}),
    })
}

export async function getServerContent(serverId) {
	return await apiFetch(`/api/server/info/`, {
        method: 'GET',
		body: JSON.stringify({
			serverId: serverId
		}),
    })
}

export async function joinServer(serverId, password, userId) {
	return await apiFetch(`/api/server/join`, {
        method: 'POST',
        body: JSON.stringify({
            password: password,
			userId: user,
			serverId: serverId
        }),
    })
}

export async function deleteServer(serverId) {
    return await apiFetch(`/api/server/`, {
        method: 'DELETE',
		body: JSON.stringify({
			serverId: serverId
		}),
    })
}

export async function kickUser(serverId, userId) {
    return await apiFetch(`/api/server/kick-user/`, {
        method: 'DELETE',
		body: JSON.stringify({
			userId: userId,
			serverId: serverId
		}),
    })
}

export async function deleteUserNotesInServer(serverId, userId) {
	return await apiFetch(`/api/server/delete-all-user-notes/`, {
		method: 'DELETE',
		body: JSON.stringify({
			userId: userId,
			serverId: serverId
		}),
	})
}