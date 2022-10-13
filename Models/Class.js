const mongoose = require('mongoose');
const Study = require('./Study');
const Schema = mongoose.Schema;

let classSchema = new Schema({
  classTitle: {
    type: String
  },
  studies: [{
    type: Schema.Types.ObjectId,
    ref: Study
  }]
}, {
  collection: 'classes'
})

module.exports = mongoose.model('Class', classSchema)