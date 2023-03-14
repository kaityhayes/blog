const mongoose = require('mongoose')
const Schema = mongoose.Schema

const blogPosts = new mongoose.Schema ({
    title: {type: String, required: true},
    description: {type: String, required: true},
    time : { type: Number, default: (new Date()).getTime() },
    tags: [{type: String, required: true}]
}, {timestamps: true} )


const Blog = mongoose.model("Blog", blogPosts);

module.exports = Blog