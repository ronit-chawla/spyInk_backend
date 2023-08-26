const mongoose = require('mongoose');

const { Schema } = mongoose;

const alertSchema = new Schema({
	msg  : {
		type     : String,
		required : true
	},
	date : {
		type     : String,
		required : true
	}
});

alertSchema.set('toJSON', { getters: true });
module.exports = mongoose.model('Alert', alertSchema);
