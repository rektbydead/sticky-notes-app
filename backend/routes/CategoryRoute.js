const express = require('express')
const Category = require('../models/Category')
const Server = require('../models/Server')
const Note = require('../models/Note')
const isAuthenticated = require('../AuthenticationMiddleware')

const router = express.Router();

router.get('/server/:serverId/', isAuthenticated, async (req, res) => {
    try {
        const server = await Server.findById(req.params.serverId)

        if (!server) {
            return res.status(404).json({ error: 'Server not found' })
        }

        if (!server.joined_users.includes(req.session.userId)) {
            return res.status(403).json({ error: 'Access denied' })
        }

        const categories = await Category.find({
            server_it_belongs: req.params.serverId
        })

        res.json(categories)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.post('/server/:serverId/', isAuthenticated, async (req, res) => {
    try {
        const { name } = req.body;

        const server = await Server.findById(req.params.serverId)

        if (!server) {
            return res.status(404).json({ error: 'Server not found' })
        }

        if (!server.server_creator.equals(req.session.userId)) {
            return res.status(403).json({ error: 'Only server owner can create categories' })
        }

        const category = new Category({ name, server_it_belongs: req.session.userId })
        await category.save()

        res.status(201).json(category)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.delete('/:categoryId/', isAuthenticated, async (req, res) => {
    try {
        const category = await Category.findById(req.params.categoryId)

        if (!category) {
            return res.status(404).json({ error: 'Category not found' })
        }

        if (category.is_default) {
            return res.status(400).json({ error: 'Cannot delete default categories' })
        }

        const server = await Server.findById(category.server_it_belongs)

        if (!server.server_creator.equals(req.session.userId)) {
            return res.status(403).json({ error: 'Only server owner can delete categories' })
        }

		/* TODO: Instead of moving, we have to delete all the notes */
        /*
        	Move notes to General category
			const generalCategory = await Category.findOne({
				server_it_belongs: category.server_it_belongs,
				name: 'General'
			})

			await Note.updateMany(
				{ category_it_belongs: category._id },
				{ category_it_belongs: generalCategory._id }
			)
		*/

        await Category.findByIdAndDelete(req.params.categoryId)

        res.json({ message: 'Category deleted successfully' })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

module.exports = router;