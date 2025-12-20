import { apiFetch } from "../../apiFetch.js";

export async function getCategoriesByServer(serverId) {
	return await apiFetch(`/api/category/get/`, {
		method: "POST",
		body: JSON.stringify({
			serverId: serverId,
		}),
	})
}

export async function createCategory(serverId, name) {
	return await apiFetch(`/api/category/`, {
		method: "POST",
		body: JSON.stringify({
			name,
			serverId: serverId,
		}),
	})
}

export async function deleteCategory(categoryId) {
	return await apiFetch(`/api/category/`, {
		method: "DELETE",
		body: JSON.stringify({
			categoryId: categoryId,
		}),
	})
}