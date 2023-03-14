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



app.post('/blog', (req, res) => {
    //   console.log(req.body)
    Blog.create(req.body).then(() => {
          res.redirect('/blog')
    })
    })

// app.get('/blog', (req, res) => {
//     Blog.create(req.body).then((createdBlog) => {
//       console.log(createdBlog)
//     }).catch((error) => {
//       console.log(error)
//     })
//   })

//index
app.get('/', (req, res) => {
    res.render('index.ejs', {ledger: Blog})
})

//show
app.get('/homepage', (req, res) => { 
    res.render('show.ejs', {ledger: Blog[req.params.index]})
    })

//edit 
app.get('/edit', (req, res) => {
    res.render('edit.ejs', {ledger: Blog})
})

//create
app.post('/post', (req, res) => {
    const postData = new Blog(req.body)
postData.save().then(result => {
    res.redirect('/')
}) .catch(err => {
    res.status(400).send("Error")
}) })

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