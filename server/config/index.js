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
        maxAge: 0
      }
    )

  )
  app.use(express.static('public', {
    etag: true,
    lastModified: true,
    setHeaders: (res, path) => {
      if (path.endsWith('.html, .js, .svg')) {
        res.setHeader('Cache-Control', 'no-cache');
      } else if (hashRegExp.test(path)) {
        res.setHeader('Cache-Control', 'max-age=31536000');
      }
    },
  }))

  app.use(logger("dev"))

  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
}
