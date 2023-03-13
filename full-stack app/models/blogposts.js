const mongoose = require('mongoose')

const blogPosts = new mongoose.Schema ({
    title: {type: String, required: true},
    body: {type: String, required: true},
    date: {Number, required: true},
    tags: [{type: String, required: true}]
})


const blogPostCollection = mongoose.model('Blog', blogPosts)

module.exports = blogPostCollection 