const { isAuthenticated } = require('./../middlewares/jwt.middleware')
const router = require('express').Router()
const User = require("../models/User.model")

router.get('/', isAuthenticated, (req, res) => {

    User
        .find()
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})



module.exports = router

