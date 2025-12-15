const express = require('express')
const User = require('../models/User')
const Server = require('../models/Server')
const Category = require('../models/Category')
const Note = require('../models/Note')
const isAuthenticated = require('../AuthenticationMiddleware')

const router = express.Router()

router.post('/register/', async (req, res) => {
    try {
        const { name, email, password } = req.body

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ error: 'Email already in use' })
        }

        const user = new User({ name, email, password })
        await user.save()

        const firstServer = new Server({
            name: 'My Personal Server',
            is_personal: true,
            server_creator: user._id,
            joined_users: [user._id]
        })
        await firstServer.save()

        const categories = await Category.create([
            { name: 'General', server_it_belongs: firstServer._id, is_default: true },
            { name: 'Archived', server_it_belongs: firstServer._id, is_default: true }
        ])

        const generalCategory = categories.find(
            category => category.name.toLowerCase() === 'general'
        )

        await Note.create({
            title: 'Welcome 👋',
            content: 'This is your first note. Start writing!',
            note_creator: user._id,
            server_it_belongs: firstServer._id,
            category_it_belongs: generalCategory._id
        })

        req.session.userId = user._id

        res.status(201).json({
            user: { id: user._id, name: user.name, email: user.email }
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.get('/me/', (req, res) => {
    console.log(req.session)
    if (!req.session.userId) {
        return res.status(401).json({ authenticated: false })
    }

    res.json({ authenticated: true })
})

router.post('/login/', async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({error: 'Invalid credentials'});
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({error: 'Invalid credentials'});
        }

        req.session.userId = user._id;

        res.json({
            user: { id: user._id, name: user.name, email: user.email }
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

/*
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}))

router.get('/google/callback', passport.authenticate('google', {failureRedirect: '/login'}), (req, res) => {
    res.redirect(process.env.FRONTEND_URL || 'http://localhost:3000');
})

*/

router.put('/change-password/', isAuthenticated, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        const user = await User.findById(req.userId);

        if (!user.password) {
            return res.status(400).json({ error: 'OAuth users cannot change password' })
        }

        const isMatch = await user.comparePassword(currentPassword)
        if (isMatch === false) {
            return res.status(401).json({ error: 'Current password is incorrect' })
        }

        user.password = newPassword
        await user.save()

        res.json({ message: 'Password updated successfully' })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.post('/logout/', isAuthenticated, (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({error: 'Failed to logout'})
        }

        res.clearCookie('connect.sid')
        res.json({ message: 'Logged out successfully' })
    })
})

module.exports = router;