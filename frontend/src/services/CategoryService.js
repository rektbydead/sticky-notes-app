import { apiFetch } from "../../apiFetch.js";

export async function getCategoriesByServer(serverId) {
	return await apiFetch(`/api/category/server/${serverId}/`, {
		method: "GET",
	})
}

export async function createCategory(serverId, name) {
	return await apiFetch(`/api/category/server/${serverId}/`, {
		method: "POST",
		body: JSON.stringify({
			name,
		}),
	})
}

export async function deleteCategory(categoryId) {
	return await apiFetch(`/api/category/${categoryId}/`, {
		method: "DELETE",
	})
}