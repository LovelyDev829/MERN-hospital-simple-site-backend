let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router()

//  Model
let classSchema = require('../models/Class')

// await classSchema.find().populate({ path: 'studies' })

// READ 
router.route('/class-all-studies').post(async (req, res) => {
    const {classTitle} = req.body
    const tempClass = await classSchema.findOne({classTitle: classTitle}).populate({ path: 'studies' })
    return res.status(200).json(tempClass.studies)
})

module.exports = router
