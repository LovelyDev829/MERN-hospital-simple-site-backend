const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let patientSchema = new Schema({
  patientId: {
    type: String
  },
  surName: {
    type: String
  },
  middleName: {
    type: String
  },
  givenName: {
    type: String
  },
  gender: {
    type: String
  },
  dateOfBirth: {
    type: String
  },
  bloodGroup: {
    type: String
  },
  diagnosis: {
    type: String
  },
  dateOfFirstTreatment: {
    type: String
  },
  observation: {
    type: Array
  }
}, {
  collection: 'patients'
})

module.exports = mongoose.model('Patient', patientSchema)