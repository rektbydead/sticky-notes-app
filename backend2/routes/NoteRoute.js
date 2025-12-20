const {getCollection} = require("../database");
const {ObjectId} = require("mongodb");

async function getNotes(data) {
	const { categoryId } = data

	const categories = await getCollection("categories")
	const notes = await getCollection("categories")
	const category = await categories.findOne({ _id: new ObjectId(categoryId) })

	if (!category) {
		throw new Error("Category not found")
	}

	return notes.aggregate([
		{ $match: { category_it_belongs: new ObjectId(categoryId) } },
		{
			$lookup: {
				from: 'users',
				localField: 'note_creator',
				foreignField: '_id',
				as: 'note_creator'
			}
		},
		{ $unwind: '$note_creator' },
		{
			$project: {
				title: 1,
				content: 1,
				created_timestamp: 1,
				updated_at: 1,
				is_archived: 1,
				server_it_belongs: 1,
				note_creator: { name: 1, email: 1 },
				category_it_belongs: 1
			}
		},
		{ $sort: { created_timestamp: -1 } }
	]).toArray()
}

async function createNote(data) {
	const { title, content, server_it_belongs, category_it_belongs, userId } = data

	const notes = await getCollection("notes")
	const categories = await getCollection("categories")
	const category = await categories.findOne({ _id: new ObjectId(category_it_belongs) })

	if (!category) {
		throw new Error("Category not found")
	}

	await notes.insertOne({
		title: title,
		content: content,
		note_creator: new ObjectId(userId),
		server_it_belongs: new ObjectId(server_it_belongs),
		category_it_belongs: new ObjectId(category_it_belongs),
		created_timestamp: new Date(),
		updated_at: new Date(),
		is_archived: false
	})

	return {
		message: `Note created successfully.`,
	}
}

async function updateNote(data) {
	const { title, content, noteId, category_it_belongs } = data

	const notes = await getCollection("notes")
	const categories = await getCollection("categories")

	const category = await categories.findOne({ _id: new ObjectId(category_it_belongs) })

	if (!category) {
		throw new Error("Category not found")
	}

	const update = { updated_at: new Date() }
	if (title) update.title = title;
	if (content) update.content = content;
	if (category_it_belongs) update.category_it_belongs = new ObjectId(category_it_belongs);

	notes.updateOne(
		{ _id: new ObjectId(noteId) },
		{ $set: update }
	)

	return {
		message: `Note updated successfully.`,
	}
}

async function archiveNote(data) {
	const { noteId } = data

	const categories = await getCollection("categories")
	const notes = await getCollection("notes")

	const note = await notes.findOne({ _id: new ObjectId(noteId) })
	if (!note) {
		throw new Error("Note not found")
	}

	const archivedCategory = await categories.findOne({
		server_it_belongs: new ObjectId(note.server_it_belongs),
		name: 'Archived',
		is_default: true
	})

	await notes.updateOne(
		{ _id: new ObjectId(noteId) },
		{
			$set: {
				category_it_belongs: new ObjectId(archivedCategory._id),
				is_archived: true,
				updated_at: new Date()
			}
		}
	)

	return {
		message: `Note archived successfully.`,
	}
}

async function unarchiveNote(data) {
	const { noteId } = data

	const categories = await getCollection("categories")
	const notes = await getCollection("notes")

	const note = await notes.findOne({ _id: new ObjectId(noteId) })
	if (!note) {
		throw new Error("Note not found")
	}

	const archivedCategory = await categories.findOne({
		server_it_belongs: new ObjectId(note.server_it_belongs),
		name: 'General',
		is_default: true
	})

	await notes.updateOne(
		{ _id: new ObjectId(noteId) },
		{
			$set: {
				category_it_belongs: new ObjectId(archivedCategory._id),
				is_archived: false,
				updated_at: new Date()
			}
		}
	)

	return {
		message: `Note unarchived successfully.`,
	}
}

async function deleteNote(data) {
	const { noteId } = data

	const notes = await getCollection("notes")
	const note = notes.findOne({ _id: new ObjectId(noteId) })

	if (!note) {
		throw new Error("Note not found")
	}

	await notes.deleteOne({ _id: new ObjectId(noteId) })

	return {
		message: `Note deleted successfully.`,
	}
}

const noteRoutes = {
	'POST:/api/note/get/': getNotes,
	'POST:/api/note/': createNote,
	'PUT:/api/note/': updateNote,
	'DELETE:/api/note/': deleteNote,

	'POST:/api/note/archive': archiveNote,
	'POST:/api/note/unarchive': unarchiveNote,
}

module.exports = noteRoutes