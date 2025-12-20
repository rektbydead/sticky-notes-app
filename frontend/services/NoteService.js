async function getNotesByCategory(categoryId) {
    return await apiFetch(`/api/note/get/`, {
        method: "POST",
		body: JSON.stringify({
			categoryId: categoryId,
		}),
    })
}

async function createNote(categoryId, title, content, server_it_belongs, userId) {
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

async function updateNote(noteId, title, content, category_it_belongs) {
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

async function archiveNote(noteId) {
    return await apiFetch(`/api/note/archive`, {
        method: "POST",
		body: JSON.stringify({
			noteId: noteId,
		}),
    })
}

async function unarchiveNote(noteId) {
	return await apiFetch(`/api/note/unarchive`, {
		method: "POST",
		body: JSON.stringify({
			noteId: noteId,
		}),
	})
}

async function deleteNote(noteId) {
    return await apiFetch(`/api/note/`, {
        method: "DELETE",
		body: JSON.stringify({
			noteId: noteId,
		}),
    })
}