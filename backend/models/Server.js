const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const serverSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: function () {
            return !this.is_personal;
        }
    },
    server_creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    joined_users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    is_personal: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

serverSchema.pre('save', async function (next) {
    if (this.isModified('password') && this.password) {
        this.password = await bcrypt.hash(this.password, 10)
    }

    // Add creator to joined_users
    // Maybe second part of if not needed
    if (this.isNew && !this.joined_users.includes(this.server_creator)) {
        this.joined_users.push(this.server_creator);
    }

    next()
})

serverSchema.methods.comparePassword = async function (candidatePassword) {
    if (!this.password) return false
    return await bcrypt.compare(candidatePassword, this.password)
}

module.exports = mongoose.model('Server', serverSchema);