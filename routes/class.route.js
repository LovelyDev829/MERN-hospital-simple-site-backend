let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router()

// Student Model
let studySchema = require('../models/Study')
let classSchema = require('../models/Class')

// await classSchema.find().populate({ path: 'studies' })


// READ Students
router.route('/class-all-studies').post(async (req, res) => {
    const {classTitle} = req.body
    const tempClass = await classSchema.findOne({classTitle: classTitle}).populate({ path: 'studies' })
    return res.status(200).json(tempClass.studies)
})


///////////////////////////////////////////////////////////////////////////////////////////////////////////////

// CREATE Student
router.route('/create-study').post(async (req, res, next) => {
    try {
        const { className, studyTitle } = req.body
        const tempStudy = await studySchema.findOne({ studyTitle: studyTitle })
        if (tempStudy) return res.status(200).json({ success: false })
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

router.route('/check-user').post((req, res) => {
    const { email, password } = req.body;
    console.log("check-user", req.body)
    studySchema.find({ email: email, password: password }, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})



// Get Single Student
router.route('/edit-user/:id').get((req, res) => {
    studySchema.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

// Update Student
router.route('/update-study/:id').put((req, res, next) => {
    studySchema.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body,
        },
        (error, data) => {
            if (error) {
                console.log(error)
                return next(error)
            } else {
                res.json({ success: true })
                console.log('Study updated successfully !')
            }
        },
    )
})

// Delete Student
router.route('/delete-user/:id').delete((req, res, next) => {
    studySchema.findByIdAndRemove(req.params.id, (error, data) => {
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