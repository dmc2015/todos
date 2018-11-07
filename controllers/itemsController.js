const express = require('express')
const router = express.Router()
const Items = require('../models/itemsModel')


router.get('/', (req, res) => {
    console.log('in the items route')
    res.redirect('/items')
})

router.get('/items/:id', (req, res) => {
    console.log('in the item show')
    Items.findOne({_id : req.params.id}).then( item => {
        res.render('items/show', item)
    }) 
})

router.get('/items', (req, res) => {
    console.log('in the items route')
    Items.find().then( items => {
        res.render('items/index', { items })
    }) 
})

router.post('/items', (req, res) => {
    // console.log('in the items route')
    // res.render('items')
    Items.create({
        title: req.body.title,
        description: req.body.description
    }).then( (item) => {
        res.redirect('/items/' + item.id)
    })
})

router.get('/items/edit/:id', (req, res) => {
    // console.log('in the items route')
    // res.render('items')
    Items.findById(req.params.id).then(item => {
        res.render('items/edit', item)
    }) 
})




router.get('/items/delete/:id', (req, res) => {
    Items.findOneAndRemove({_id : req.params.id}).then( () => {
        res.redirect('/')
    })
})

router.patch('/items/patch/:id', (req, res) => {
    Items.findOneAndUpdate({_id : req.params.id}, {$set:{complete:req.body.checked}}, {new : true})
    .then( () => {})
 })

 router.put('/items/:id', (req, res) => {
    req.body.complete = req.body.complete ? true : false
    Items.findOneAndUpdate({_id : req.params.id }, req.body, { new : true} ).then( () => {
        res.redirect('/')
    })
})


router.delete('/items/delete/:id', (req, res) => {
    Items.findOneAndRemove({_id : req.params.id}).then( () => {
        res.redirect('/')
    })
})


module.exports = router