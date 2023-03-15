//requirements 
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const methodOverride = require('method-override')
// const Seed = require('./models/blog.js')
const Blog = require('./models/blogposts.js')
const bodyParser = require('body-parser')
//body parser so that our application can parse the post data body


module.exports = express()

app.use(express.static('public'))

const port = 3000
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

//seed
// app.get('/seed', (req, res) => {
//         Blog.create(Seed).then((data) => {
//                 res.send(data)
//    })
// })


app.get('/profile', (req, res) => {
    Blog.find({}).then((allBlog) =>
    {res.render('show.ejs', { 
    Blog: allBlog
})
})
})

app.get('/profile', (req, res) => {
    res.render('show.ejs', {ledger: Blog})
})




//edit
app.get('/posts', (req, res) => {
    res.render('edit.ejs', {ledger: Blog})
})

app.post('/posts', (req, res) => {
    //   console.log(req.body)
    Blog.create(req.body).then(() => {
          res.redirect('/blog')
    })
    })


//index
app.get('/', (req, res) => {
    res.render('index.ejs', {ledger: Blog})
})

//show
app.get('/settings', (req, res) => { 
    res.render('new.ejs', {ledger: Blog[req.params.index]})
    })



//delete
app.delete('/Blog/:id', (req, res) => {
    Blog.findByIdAndRemove(req.params.id).then(() => {
       res.redirect('/')
    })
  })

//create
app.get('/', (req, res) => {
    Blog.find({}, (err, posts) => {
        res.render('/index.ejs', {Blog: posts})
    })
})




mongoose.connect('mongodb://localhost:27017/basiccrud').then(() => {
    console.log('mongoose listening...')
})

app.listen(3000, () => {
    console.log('express listening...')
})