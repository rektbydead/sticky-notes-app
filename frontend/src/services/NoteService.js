import { apiFetch } from "../../apiFetch.js";

export async function getNotesByCategory(categoryId) {
    return await apiFetch(`/api/note/category/${categoryId}/`, {
        method: "GET",
    })
}

export async function createNote(categoryId, title, content, server_it_belongs) {
    return await apiFetch(`/api/note/category/${categoryId}/`, {
        method: "POST",
        body: JSON.stringify({
            title,
            content,
            server_it_belongs,
            category_it_belongs: categoryId,
        }),
    })
}

export async function updateNote(noteId, title, content, category_it_belongs) {
    return await apiFetch(`/api/note/${noteId}/`, {
        method: "PUT",
        body: JSON.stringify({
            title,
            content,
            category_it_belongs,
        }),
    })
}

export async function archiveNote(noteId) {
    return await apiFetch(`/api/note/${noteId}/archive/`, {
        method: "POST",
    })
}

export async function unarchiveNote(noteId) {
	return await apiFetch(`/api/note/${noteId}/unarchive/`, {
		method: "POST",
	})
}

export async function deleteNote(noteId) {
    return await apiFetch(`/api/note/${noteId}/`, {
        method: "DELETE",
    })
}