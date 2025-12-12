const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    created_timestamp: {
        type: Date,
        default: Date.now
    },
    note_creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    server_it_belongs: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Server',
        required: true
    },
    category_it_belongs: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    is_archived: {
        type: Boolean,
        default: false
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

noteSchema.pre('save', function (next) {
    this.updated_at = Date.now()
    next()
})

module.exports = mongoose.model('Note', noteSchema)