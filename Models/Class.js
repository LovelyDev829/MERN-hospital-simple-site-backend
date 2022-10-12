const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let classSchema = new Schema({
  classTitle: {
    type: String
  },
  studies: {
    type: Array
  }
}, {
  collection: 'classes'
})

module.exports = mongoose.model('Class', classSchema)