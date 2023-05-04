const mongoose = require('mongoose');
const Schema = mongoose.Schema;

companiesSchema = new Schema( {
    type: String,
    competitor: String,
    createdAt: {
		type: Date,
		default: Date.now
	}
});

Companies = mongoose.model('Companies', companiesSchema);

module.exports = Companies;