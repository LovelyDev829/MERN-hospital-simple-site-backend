let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router()

//  Model
let patientSchema = require('../models/Patient')
let studySchema = require('../models/Study')

// CREATE 
router.route('/create-patient').post((req, res, next) => {
  const { givenName, middleName, surName, gender, dateOfBirth, bloodGroup, diagnosis, dateOfFirstTreatemey } = req.body
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
      // console.log(data[0])
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

// READ 
router.route('/all-patients-available').post(async (req, res) => {
  const studyId = req.body.studyId
  let patients = await patientSchema.find()
  if (studyId !== 0) {
    const tempStudy = await studySchema.findById(studyId)
    const patientArray = tempStudy.patients
    patientArray.forEach((item) => {
      patients = patients.filter((data) => {
        return JSON.stringify(data._id) !== JSON.stringify(item)
      })
    })
  }
  res.json(patients)
})

router.route('/question-update').post(async (req, res) => {
  // console.log(req.body)
  const {patientId, questions} = req.body
  await patientSchema.findByIdAndUpdate(patientId, {questions: questions})
  return res.status(200).json({ success: true })
})

router.route('/patient-all-observations').post(async (req, res) => {
  const {patientId} = req.body
  const tempPatient = await patientSchema.findById(patientId).populate({ path: 'observations' })
  // console.log(tempStudy.patients)
  return res.status(200).json(tempPatient.observations)
})
// Update 
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
        res.json({ success: true })
        console.log('Patient updated successfully !')
      }
    },
  )
})

module.exports = router
