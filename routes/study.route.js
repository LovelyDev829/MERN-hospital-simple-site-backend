let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router()

// Student Model
let patientSchema = require('../models/Patient')

// CREATE Student
router.route('/create-patient').post((req, res, next) => {
  const {givenName, middleName, surName, gender, dateOfBirth, bloodGroup, diagnosis, dateOfFirstTreatemey} = req.body
  console.log("create-patient", req.body)
  patientSchema.find({
    givenName: givenName,
    middleName: middleName,
    surName: surName,
    gender: gender,
    dateOfBirth: dateOfBirth,
    bloodGroup: bloodGroup,
    diagnosis: diagnosis,
    dateOfFirstTreatemey: dateOfFirstTreatemey
  }, (error, data) => {
    if (error) {
      res.json({ success: false })
    }
    else if (data[0]) {
      console.log(data[0])
      console.log("Already exist the patient")
      res.json({ success: false })
    } else {
      patientSchema.create(req.body, (error, data) => {
        if (error) {
          res.json({ success: false })
        } else {
          console.log("Added a new patient")
          res.json({ success: true })
        }
      })
    }
  })
})

router.route('/check-user').post((req, res) => {
  const { email, password } = req.body;
  console.log("check-user", req.body)
  patientSchema.find({ email: email, password: password }, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// READ Students
router.route('/all-patients').get((req, res) => {
  patientSchema.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get Single Student
router.route('/edit-user/:id').get((req, res) => {
  patientSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update Student
router.route('/update-patient/:id').put((req, res, next) => {
  patientSchema.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error)
        console.log(error)
      } else {
        res.json({success: true})
        console.log('Patient updated successfully !')
      }
    },
  )
})

// Delete Student
router.route('/delete-user/:id').delete((req, res, next) => {
  patientSchema.findByIdAndRemove(req.params.id, (error, data) => {
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
