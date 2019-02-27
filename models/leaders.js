const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const leradersSchema = new Schema({
  name: {
      type: String,
      required: true,
      unique: true
  },
  image: {
    type: String,
    default: 'images/luribeto.png'
  },
  designation: {
    type: String,
    required: true
  },
  abbr: {
    type: String,
    required: false
  },
  featured: {
    type: Boolean,
    default:false      
  },
  description: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

var Leaders = mongoose.model('Leader', leradersSchema);

module.exports = Leaders;
