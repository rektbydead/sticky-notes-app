const express = require('express')
const Server = require('../models/Server')
const Category = require('../models/Category')
const Note = require('../models/Note')
const isAuthenticated = require('../AuthenticationMiddleware')

const router = express.Router();

router.post('/', isAuthenticated, async (req, res) => {
    try {
        const { name, password, is_personal } = req.body

        const server = new Server({
            name,
            password,
            is_personal,
            server_creator: req.session.userId,
            joined_users: [req.session.userId]
        })

        await server.save()

        await Category.create([
            { name: 'General', server_it_belongs: server._id, is_default: true },
            { name: 'Archived', server_it_belongs: server._id, is_default: true }
        ])

        res.status(201).json(server)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.get('/', isAuthenticated, async (req, res) => {
    try {
        const servers = await Server.find({
            joined_users: req.session.userId
        })
            .populate('server_creator', 'name email')
            .populate({
                path: 'categories',
                select: '_id name is_default -server_it_belongs',
                options: { sort: { is_default: -1, created_at: 1 } }
            })
            .populate('joined_users', 'name email')

        res.json(servers)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.get('/:serverId', isAuthenticated, async (req, res) => {
    try {
        const server = await Server.findById(req.params.serverId)
            .populate('server_creator', 'name email')
            .populate('joined_users', 'name email')

        if (!server) {
            return res.status(404).json({ error: 'Server not found' })
        }

        if (!server.joined_users.some(user => user._id.equals(req.session.userId))) {
            return res.status(403).json({ error: 'Access denied' })
        }

        res.json(server)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.post('/:serverId/join', isAuthenticated, async (req, res) => {
    try {
        const { password } = req.body;
        const server = await Server.findById(req.params.serverId);

        if (!server) {
            return res.status(404).json({ error: 'Server not found' })
        }

        if (server.is_personal) {
            return res.status(403).json({ error: 'Cannot join personal server' })
        }

        if (server.joined_users.includes(req.session.userId)) {
            return res.status(400).json({ error: 'Already a member' })
        }

        const isMatch = await server.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid server password' })
        }

        server.joined_users.push(req.session.userId)
        await server.save()

        res.json(server)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

router.delete('/:serverId', isAuthenticated, async (req, res) => {
    try {
        const server = await Server.findById(req.params.serverId)

        if (!server) {
            return res.status(404).json({ error: 'Server not found' })
        }

        if (!server.server_creator.equals(req.session.userId)) {
            return res.status(403).json({ error: 'Only server owner can delete' })
        }

        await Note.deleteMany({server_it_belongs: server._id})
        await Category.deleteMany({server_it_belongs: server._id})
        await Server.findByIdAndDelete(req.params.id)

        res.json({message: 'Server deleted successfully'})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
});

// Kick User from Server
router.delete('/:serverId/users/:userId', isAuthenticated, async (req, res) => {
    try {
        const server = await Server.findById(req.params.serverId);

        if (!server) {
            return res.status(404).json({ error: 'Server not found' })
        }

        if (!server.server_creator.equals(req.session.userId)) {
            return res.status(403).json({ error: 'Only server owner can kick users' })
        }

        if (server.server_creator.equals(req.params.userId)) {
            return res.status(400).json({ error: 'Cannot kick server owner' })
        }

        server.joined_users = server.joined_users.filter(
            u => !u.equals(req.params.userId)
        )
        await server.save()

        res.json({message: 'User kicked successfully'})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
});

module.exports = router;