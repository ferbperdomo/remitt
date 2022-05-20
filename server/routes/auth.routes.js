const express = require("express")
const User = require("../models/User.model")
const router = express.Router()



router.post('/signup', (req, res, next) => {

    const { email, name } = req.body

    if (email === '' || name === '') {
        res.status(400).json({ message: "Introduce nombre y e-mail ." })
        return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
    if (!emailRegex.test(email)) {
        res.status(400).json({ message: 'Introduce un correo electrónico válido.' })
        return
    }

    User
        .findOne({ email })
        .then((foundUser) => {
            if (foundUser) {
                res.status(400).json({ message: "El correo electrónico ya está registrado." })
                return
            }

            return User.create({ email, name })
        })
        .then((createdUser) => {
            const { email, name, _id } = createdUser

            const user = { email, name, _id }

            res.status(201).json({ user })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "Internal Server Error" })
        })

})

module.exports = router
