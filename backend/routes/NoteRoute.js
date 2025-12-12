const express = require('express')
const Note = require('../models/Note')
const Server = require('../models/Server')
const Category = require('../models/Category')
const isAuthenticated = require('../AuthenticationMiddleware')

const router = express.Router();

/*
router.get('/server/:serverId/', isAuthenticated, async (req, res) => {
    try {
        const server = await Server.findById(req.params.serverId)

        if (!server) {
            return res.status(404).json({ error: 'Server not found' })
        }

        if (!server.joined_users.includes(req.session.userId)) {
            return res.status(403).json({ error: 'Access denied' })
        }

        const notes = await Note.find({
            server_it_belongs: req.params.serverId
        })
			.populate('note_creator', 'name email')
			.populate('category_it_belongs', 'name')
            .sort('-created_timestamp')

        res.json(notes)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})
*/

router.get('/category/:categoryId/', isAuthenticated, async (req, res) => {
    try {
        const category = await Category.findById(req.params.categoryId)

        if (!category) {
            return res.status(404).json({ error: 'Category not found' })
        }

        const server = await Server.findById(category.server_it_belongs)

        if (!server.joined_users.includes(req.session.userId)) {
            return res.status(403).json({ error: 'Access denied' })
        }

        const notes = await Note.find({
            category_it_belongs: req.params.categoryId
        })
            .populate('note_creator', 'name email')
            .sort('-created_timestamp');

        res.json(notes)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.post('/category/:categoryId/', isAuthenticated, async (req, res) => {
    try {
        const {title, content, server_it_belongs, category_it_belongs} = req.body

        const server = await Server.findById(server_it_belongs)

        if (!server) {
            return res.status(404).json({ error: 'Server not found' })
        }

        if (!server.joined_users.includes(req.session.userId)) {
            return res.status(403).json({ error: 'Access denied' })
        }

        const note = new Note({
            title,
            content,
            note_creator: req.session.userId,
            server_it_belongs,
            category_it_belongs
        })

        await note.save()

        res.status(201).json(note)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

router.put('/:noteId/', isAuthenticated, async (req, res) => {
    try {
        const note = await Note.findById(req.params.noteId)

        if (!note) {
            return res.status(404).json({ error: 'Note not found' })
        }

        if (!note.note_creator.equals(req.session.userId)) {
            return res.status(403).json({ error: 'Only note creator can update' })
        }

        const { title, content, category_it_belongs } = req.body

        if (title) note.title = title
        if (content) note.content = content
        if (category_it_belongs) note.category_it_belongs = category_it_belongs

        await note.save()

        res.json(note)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.post('/:noteId/archive/', isAuthenticated, async (req, res) => {
    try {
        const note = await Note.findById(req.params.noteId)

        if (!note) {
            return res.status(404).json({ error: 'Note not found' })
        }

        const server = await Server.findById(note.server_it_belongs)

        // Check permissions: server owner can archive any note, note creator can archive their own
        const isOwner = server.server_creator.equals(req.session.userId)
        const isCreator = note.note_creator.equals(req.session.userId)

        if (!isOwner && !isCreator) {
            return res.status(403).json({ error: 'Access denied' })
        }

        const archivedCategory = await Category.findOne({
            server_it_belongs: note.server_it_belongs,
            name: 'Archived'
        })

        note.category_it_belongs = archivedCategory._id
        note.is_archived = true
        await note.save()

        res.json(note)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.delete('/:noteId/', isAuthenticated, async (req, res) => {
    try {
        const note = await Note.findById(req.params.noteId)

        if (!note) {
            return res.status(404).json({ error: 'Note not found' })
        }

        const server = await Server.findById(note.server_it_belongs)

        // Check permissions: server owner can delete any note, note creator can delete their own
        const isOwner = server.server_creator.equals(req.session.userId)
        const isCreator = note.note_creator.equals(req.session.userId)

        if (!isOwner && !isCreator) {
            return res.status(403).json({ error: 'Access denied' })
        }

        await Note.findByIdAndDelete(req.params.id)

        res.json({message: 'Note deleted successfully'})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

module.exports = router;