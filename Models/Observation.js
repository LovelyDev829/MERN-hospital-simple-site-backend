const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let observationSchema = new Schema({
    dateOfObsevation: {
        type: String
    },
    heartRate: {
        type: String
    },
    bloodPressure: {
        type: String
    },
    respiratoryRate: {
        type: String
    },
    levelOfConsciousness: {
        type: String
    },
    pulseOximetry: {
        type: String
    },
    observationNotes: {
        type: String
    }
}, {
    collection: 'observations'
})

module.exports = mongoose.model('Observation', observationSchema)