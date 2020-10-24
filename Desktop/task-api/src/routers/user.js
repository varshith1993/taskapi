const express = require('express')

const User = require('../models/user')

const router = new express.Router()

router.post('/api/register', async(req, res) => {
    const user = new User(req.body)
    try{
        // const checkuser = await User.Checkuser(req.body)
            await user.save()
            res.status(201).send(user)
        
    }catch(e){
        if(e.code === 11000 && e.keyPattern.name){
            res.status(500).send({
                message: 'Name should ne unique'
            })
        } else if(e.code === 11000 && e.keyPattern.email){
            res.status(500).send({
                message: 'Email should be unique'
            })
        } 
        res.status(500).send(e)
    }
})

router.post('/api/login', async(req, res) => {
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        res.send({
           message:"login successfully"
        }).status(200)
    }catch(e){
        res.status(500).send(e)
    }
 })

module.exports = router