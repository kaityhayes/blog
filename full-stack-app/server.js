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

// seed
// app.get('/seed', (req, res) => {
//         Blog.create(Seed).then((data) => {
//                 res.send(data)
//    })
// })


app.get('/posts', (req, res) => {
    res.render('edit.ejs')
})

app.put('/:id', (req, res) => {
Blog.findByIdAndUpdate(req.params.id, req.body, {new: true}).then((updatedBlog) => {
    res.redirect('/')
})
})




//delete
app.delete('/:id', (req, res) => {
    Blog.findByIdAndRemove(req.params.id).then((error, allBlog) => {
          if (error) {
          console.log(error) 
  res.redirect('/')
          }
      })
  })




app.get('/profile', (req, res) => {
    res.render('show.ejs', {ledger: Blog})
})





 


app.post('/posts', (req, res) => {
    //   console.log(req.body)
    Blog.create(req.body).then(() => {
          res.redirect('/posts')
    })
    })


//index
app.get('/', (req, res) => {
    Blog.find({}).then((allBlog) =>
    {res.render('index.ejs', { 
    Blog: allBlog,
})
})
})

//show
app.get('/settings', (req, res) => { 
    res.render('new.ejs', {ledger: Blog[req.params.index]})
    }) 




//create
app.get('/', (req, res) => {
    Blog.find({}, (err, posts) => {
        res.render('/posts', {Blog: posts})
    })
    res.redirect('/')
})




mongoose.connect('mongodb://localhost:27017/blog').then(() => {
    console.log('mongoose listening...')
})

app.listen(3001, () => {
    console.log('express listening...')
})