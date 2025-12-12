require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const session = require('express-session')
const MongoStore = require('connect-mongo')

const authRoute = require('./routes/AuthRoute')
const categoryRoute = require('./routes/CategoryRoute')
const noteRoute = require('./routes/NoteRoute')
const serverRoute = require('./routes/ServerRoute')

const app = express()

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err))

app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key-here',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
        collectionName: 'sessions',
        ttl: 14 * 24 * 60 * 60
    }),
    cookie: {
        maxAge: 14 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
        sameSite: 'lax'
    }
}))

app.use('/api/auth', authRoute)
app.use('/api/category', categoryRoute)
app.use('/api/note', noteRoute)
app.use('/api/server', serverRoute)

app.listen(5000, () => {
    console.log(`Server running on port ${5000}`)
})