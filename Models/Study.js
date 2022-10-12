const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let studySchema = new Schema({
  studyTitle: {
    type: String
  },
  patients: {
    type: Array
  }
}, {
  collection: 'studies'
})

module.exports = mongoose.model('Study', studySchema)