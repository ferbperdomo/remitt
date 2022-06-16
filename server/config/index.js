const express = require("express")

const logger = require("morgan")

const cors = require("cors")

module.exports = (app) => {
  app.set("trust proxy", 1)

  app.use(
    cors(
      {
        credentials: true,
        origin: process.env.ORIGIN || "http://localhost:3000",

      }
    )
  )
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", process.env.ORIGIN || "http://localhost:3000")
    res.header("Access-Control-Allow-Credentials", true)
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS")
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Content-Length, X-Requested-With")
    res.header("Access-Control-Allow-Headers", "*")
    next()
  }
  )

  app.use(logger("dev"))

  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
}
