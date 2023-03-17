const mongoose = require('mongoose')
const Schema = mongoose.Schema

const blogPosts = new mongoose.Schema ({
    title: {type: String, required: true},
    description: {type: String, required: true},
    likes: {type: Number},
    tags: [{type: String, required: true}]
}, {timestamps: true} )


const Blog = mongoose.model('Blog', blogPosts);

module.exports = Blog
