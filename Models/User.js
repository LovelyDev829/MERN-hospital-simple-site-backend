const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  userType: {
    type: String
  }
}, {
  collection: 'users'
})

module.exports = mongoose.model('User', userSchema)