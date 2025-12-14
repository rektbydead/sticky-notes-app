import {apiFetch} from "../../apiFetch.js";

export async function createServer(name, password, is_personal) {
    return await apiFetch('/api/server/', {
        method: 'POST',
        body: JSON.stringify({
            name,
            password,
            is_personal
        }),
    })
}

export async function getServers() {
    return await apiFetch('/api/server/', {
        method: 'GET',
    })
}

export async function getServerContent(serverId) {
    return await apiFetch(`/api/server/${serverId}`, {
        method: 'GET',
    })
}

export async function joinServer(serverId, password) {
    return await apiFetch(`/api/server/${serverId}/join`, {
        method: 'POST',
        body: JSON.stringify({
            password,
        }),
    })
}

export async function deleteServer(serverId) {
    return await apiFetch(`/api/server/${serverId}`, {
        method: 'DELETE',
    })
}

export async function kickUser(serverId, userId) {
    return await apiFetch(`/api/server/${serverId}/users/${userId}`, {
        method: 'DELETE',
    })
}