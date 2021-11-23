const express = require('express')
const methodOverride = require('method-override')

const app = express()
const db = require('./models')
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(express.static('static'))
app.use(methodOverride('_method'))

// WRITE YOUR ROUTES HERE /////////////

// GET INDEX ROUTE
app.get('/', (req,res)=>{
    db.widget.findAll()
    .then(widgets => {
        res.render('index', {widgets:widgets})
    })
    .catch(error => {
        console.error
        res.send("You've encountered an error.")
    })
})

// INDIVIDUAL EDIT ROUTE
app.get('/edit/:id', (req,res)=>{
    db.widget.findOne({
        where: {id: req.params.id}
    })
    .then(widget => {
        res.render('edit', {widget:widget})
    })
    .catch(error => {
        console.error
        res.send("You've Encounutered an error.")
    })
})

// INDIVIDUAL UPDATE ROUTE
app.put('/edit/:id', (req,res)=>{
    db.widget.findOne({
        where: {id: req.params.id}
    })
    .then(widget => {
        widget.update({
            description: req.body.description,
            quantity: req.body.quantity
    })
    })
    .then(widget => {
        res.redirect('/')
    })
})

// POST/CREATE ROUTE
app.post('/', (req,res) => {
    db.widget.create({
        description: req.body.description,
        quantity: req.body.quantity
    })
    .then(widget => {
        res.redirect('/')
    })
    .catch(error => {
        console.error
        res.send("Something went wrong.")
    })
})

// APP DELETE ROUTE
app.delete('/', (req,res) => {
    db.widget.destroy({
        where: {id: req.body.id} 
    })
    .then(widget => {
        res.redirect('/')
    })
    .catch(error => {
        console.error
        res.send("Something went wrong.")
    })
})






// YOUR ROUTES ABOVE THIS COMMENT /////

app.listen(process.env.PORT || 3000, ()=>{
    console.log("Port 3000 working")
})

