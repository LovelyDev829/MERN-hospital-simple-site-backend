let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router()

//  Model
let studySchema = require('../models/Study')
let classSchema = require('../models/Class')

// await classSchema.find().populate({ path: 'studies' })
// CREATE 
router.route('/create-study').post(async (req, res, next) => {
  try {
    const { className, studyTitle } = req.body
    const data = await studySchema.findOne({ studyTitle: studyTitle })
    if (data) return res.status(200).json({ success: false })
    else {
      const resClass = await classSchema.findOne({ classTitle: className })
      if (resClass) {
        const newStudy = new studySchema({ studyTitle: studyTitle })
        const resStudy = await newStudy.save()
        let studies = resClass.studies
        studies.push(resStudy._id)
        await classSchema.findByIdAndUpdate(resClass._id, { studies: studies })
        return res.status(200).json({ success: true })
      } else return res.status(200).json({ success: false })
    }
  } catch (err) {
    console.log(err)
  }
})

// Update 
router.route('/add-a-patient').put(async (req, res, next) => {
  try {
    // console.log(req.body)
    const { studyId, patientId } = req.body
    const tempStudy = await studySchema.findById(studyId)
    // console.log(tempStudy)
    let patientArray = tempStudy.patients
    if (patientArray.includes(patientId)) {
      return res.status(200).json({ success: false })
    }
    else {
      patientArray.push(patientId)
      // console.log(patientArray)
      await studySchema.findByIdAndUpdate(studyId, { patients: patientArray })
      return res.status(200).json({ success: true })
    }
  } catch (err) {
    console.log(err)
    return res.status(200).json({ success: false })
  }
})

// READ
router.route('/study-all-patients').post(async (req, res) => {
  const {studyId} = req.body
  const tempStudy = await studySchema.findById(studyId).populate({ path: 'patients' })
  return res.status(200).json(tempStudy.patients)
})


module.exports = router
