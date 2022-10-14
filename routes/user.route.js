let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router()

// Model
let userSchema = require('../models/User')

// CREATE
router.route('/create-user').post((req, res, next) => {
  const email = req.body.email
  console.log("create-user", req.body)
  userSchema.find({ email: email }, (error, data) => {
    if (error) {
      res.json({ success: false })
    }
    else if (data[0]) {
      console.log("Already exist the user")
      res.json({ success: false })
    } else {
      userSchema.create(req.body, (error, data) => {
        if (error) {
          res.json({ success: false })
        } else {
          console.log("Added a new user")
          res.json({ success: true })
        }
      })
    }
  })
})

router.route('/check-user').post((req, res) => {
  const { email, password } = req.body;
  console.log("check-user", req.body)
  userSchema.find({ email: email, password: password }, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


module.exports = router
