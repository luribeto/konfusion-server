const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const promotionsSchema = new Schema({
  name: {
      type: String,
      required: true,
      unique: true
  },
  image: {
    type: String,
    default: 'images/default_meal.png'
  },
  label: {
    type: String,
    default: ''
  },
  price: {
    type: Currency,
    default: 0, 
    min: 0
  },
  description: {
      type: String,
      required: true
  },
  featured: {
    type: Boolean,
    default:false      
  }
}, {
  timestamps: true
});

var Promotions = mongoose.model('Promotion', promotionsSchema);

module.exports = Promotions;