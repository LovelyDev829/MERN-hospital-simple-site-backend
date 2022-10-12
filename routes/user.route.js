let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router()

// Student Model
let userSchema = require('../models/User')

// CREATE Student
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

// READ Students
router.route('/all-users').get((req, res) => {
  userSchema.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get Single Student
router.route('/edit-user/:id').get((req, res) => {
  userSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update Student
router.route('/update-user/:id').put((req, res, next) => {
  userSchema.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error)
        console.log(error)
      } else {
        res.json(data)
        console.log('User updated successfully !')
      }
    },
  )
})

// Delete Student
router.route('/delete-user/:id').delete((req, res, next) => {
  userSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.status(200).json({
        msg: data,
      })
    }
  })
})

module.exports = router
