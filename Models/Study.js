const mongoose = require('mongoose');
const Patient = require('./Patient');
const Schema = mongoose.Schema;

let studySchema = new Schema({
  studyTitle: {
    type: String
  },
  patients: [{
    type: Schema.Types.ObjectId,
    ref: Patient
  }]
}, {
  collection: 'studies'
})

module.exports = mongoose.model('Study', studySchema)