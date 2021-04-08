const express = require('express')
const Test = require('../models/test')
const router = new express.Router()

router.post('/send/test', async (req, res) => {
    const test = new Test(req.body)

    try {
        await test.save()
        res.status(201).send(test)
    } catch(e) {
        res.status(400).send(e)
    }
})

router.get('/read/test', async (req, res) => {
    test = await Test.find({})
    try {
        res.send(test)
    } catch(e) {
        res.status(400).send(e)
    }
})

module.exports = router