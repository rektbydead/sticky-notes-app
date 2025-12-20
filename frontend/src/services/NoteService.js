import { apiFetch } from "../../apiFetch.js";

export async function getNotesByCategory(categoryId) {
    return await apiFetch(`/api/note/category/`, {
        method: "GET",
		body: JSON.stringify({
			categoryId: categoryId,
		}),
    })
}

export async function createNote(categoryId, title, content, server_it_belongs, userId) {
	return await apiFetch(`/api/note/`, {
        method: "POST",
        body: JSON.stringify({
            title: title,
            content: content,
			server_it_belongs: server_it_belongs,
            category_it_belongs: categoryId,
			userId: userId,
        }),
    })
}

export async function updateNote(noteId, title, content, category_it_belongs) {
    return await apiFetch(`/api/note/`, {
        method: "PUT",
        body: JSON.stringify({
			title: title,
			content: content,
			category_it_belongs: category_it_belongs,
			noteId: noteId,
        }),
    })
}

export async function archiveNote(noteId) {
    return await apiFetch(`/api/note/archive`, {
        method: "POST",
		body: JSON.stringify({
			noteId: noteId,
		}),
    })
}

export async function unarchiveNote(noteId) {
	return await apiFetch(`/api/note/unarchive`, {
		method: "POST",
		body: JSON.stringify({
			noteId: noteId,
		}),
	})
}

export async function deleteNote(noteId) {
    return await apiFetch(`/api/note/`, {
        method: "DELETE",
		body: JSON.stringify({
			noteId: noteId,
		}),
    })
}