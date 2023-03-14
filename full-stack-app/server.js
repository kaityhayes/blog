//Dependencies
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const methodOverride = require('method-override')
const blogPosts = require('./models/blogposts.js')
const Seed = require('./models/blog.js')

module.exports = express()

app.use(express.static('public'))

const port = 3000
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended: true}))

//Seed 
app.get('/seed', (req, res) => {
    blogPosts.create(Seed).then(() => {
        res.redirect('/homepage')
    })
})

//Get Routes
app.get('/homepage', (req, res) => {
    res.render('index.ejs', {ledger: blogPosts})
})








mongoose.connect('mongodb://localhost:27017/basiccrud').then(() => {
    console.log('mongoose listening...')
})

app.listen(3000, () => {
    console.log('express listening...')
})