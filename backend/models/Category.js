const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    server_it_belongs: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Server',
        required: true
    },
    is_default: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

// Prevent duplicate category names within the same server
categorySchema.index({ name: 1, server_it_belongs: 1 }, { unique: true })

module.exports = mongoose.model('Category', categorySchema)