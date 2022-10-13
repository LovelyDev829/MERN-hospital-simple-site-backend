let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router()

// Student Model
let observationSchema = require('../models/Observation')
let patientSchema = require('../models/Patient')

// await classSchema.find().populate({ path: 'studies' })
// CREATE Student
router.route('/create-observation').post(async (req, res, next) => {
    try {
        const { currentPatientId, dateOfObservation, heartRate, bloodPressure, respiratoryRate, levelOfConsciousness,
            pulseOximetry, observationNotes } = req.body
        const tempPatient = await patientSchema.findById(currentPatientId)
        if (tempPatient) {
            const newObservation = new observationSchema({
                dateOfObservation: dateOfObservation,
                heartRate: heartRate,
                bloodPressure: bloodPressure,
                respiratoryRate: respiratoryRate,
                levelOfConsciousness: levelOfConsciousness,
                pulseOximetry: pulseOximetry,
                observationNotes: observationNotes
            })
            const tempObservation = await newObservation.save()
            let ObesrvationArray = tempPatient.observations
            ObesrvationArray.push(tempObservation._id)
            await patientSchema.findByIdAndUpdate(tempPatient._id, { observations: ObesrvationArray })
            return res.status(200).json({ success: true })
            console.log("Added a new observation..")
        } else return res.status(200).json({ success: false })
    } catch (err) {
        console.log(err)
    }
})


module.exports = router
