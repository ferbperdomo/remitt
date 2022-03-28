const express = require("express")
const bcrypt = require('bcryptjs')
const User = require("../models/User.model")
const jwt = require('jsonwebtoken')
const { isAuthenticated } = require('../middlewares/jwt.middleware')
const router = express.Router()
const saltRounds = 10

router.post('/signup', (req, res, next) => {
    const { email, password } = req.body

    if (email === '' || password === '') {
        res.status(400).json({ message: "All fields are needed." })
        return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
    if (!emailRegex.test(email)) {
        res.status(400).json({ message: 'Email format is not valid.' })
        return
    }

    if (password.length < 8) {
        res.status(400).json({ message: 'Your password must include at least 8 characters.' })
        return
    }

    User
        .findOne({ email })
        .then((foundUser) => {
            if (foundUser) {
                res.status(400).json({ message: "Email is already registered." })
                return
            }
            const salt = bcrypt.genSaltSync(saltRounds)
            const hashedPassword = bcrypt.hashSync(password, salt)

            return User.create({ email, password: hashedPassword })
        })
        .then((createdUser) => {
            const { email, _id } = createdUser

            const user = { email, _id }

            res.status(201).json({ user })
        })

        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "Internal Server Error" })
        })

})

router.post('/login', (req, res, next) => {

    const { email, password } = req.body

    if (email === '' || password === '') {
        res.status(400).json({ message: 'Please, enter both fields' })
        return
    }

    User
        .findOne({ email })
        .then((foundUser) => {

            if (!foundUser) {
                res.status(401).json(({ message: 'Email not found in database' }))
                return
            }

            if (bcrypt.compareSync(password, foundUser.password)) {

                const { _id, email } = foundUser

                const payload = { _id, email }

                const authToken = jwt.sign(
                    payload,
                    process.env.TOKEN_SECRET,
                    { algorithm: 'HS256', expiresIn: '6h' }
                )

                res.status(200).json(({ authToken }))

            } else {
                res.status(401).json(({ message: 'There was a mistake. Check your information and try again.' }))
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(({ message: 'Internal Server Error' }))
        })
})

router.get('/verify', isAuthenticated, (req, res, next) => {
    res.status(200).json(req.payload)
})

module.exports = router
