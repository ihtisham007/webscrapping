const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mobileSchema = new Schema({
    
    brand: String,
    name: String,
    image: String,
    price: String,
    createdAt: {
		type: Date,
		default: Date.now
	}

});

const mobiles = mongoose.model('mobiles', mobileSchema);

module.exports = mobiles;