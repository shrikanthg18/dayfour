const { profileSchema } = require("../models/profile");
const moment = require("moment");

profileSchema.virtual("fullName").get(function () {
	return this.fname + " " + this.lname;
});

profileSchema.statics.findByFirstName = function (firstName, callback) {
	return this.find({ fname: new RegExp(firstName, "i") }, callback);
};

profileSchema.statics.findByDob = function (dateOfBirth, callback) {
	return this.find({ dob: new RegExp(dateOfBirth, "i") }, callback);
};

profileSchema.methods.getIfBday = function () {
	const x = this.dob.toString();
	const z = x.substr(5, 9);
	const y = moment().format("YYYY-MM-DD").toString().substr(5, 9);
	console.log(z);
	return z == y;
};
