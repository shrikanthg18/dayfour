const Profile = require("../models/profile");

exports.createProfile = function (req, res) {
	var profileOb = new Profile({
		fname: req.body.fname,
		lname: req.body.lname,
		address: req.body.address,
		dob: req.body.dob,
		phno: req.body.phno,
	});

	profileOb.save(function (err) {
		if (err) {
			res.json({ ERROR: err });
		} else {
			res.redirect("/profile/profilepage");
			console.log("data saved!!", req.body);
		}
	});
};

exports.getProfiles = function (req, res) {
	Profile.find(function (err, data) {
		if (err) {
			res.json({ ERROR: err });
		} else {
			res.json(data);
		}
	});
};

exports.getFullName = function (req, res) {
	let userId = req.params.id;
	Profile.findById(userId, function (err, data) {
		if (err) {
			res.json({ ERROR: err });
		} else {
			res.json(data.fullName);
		}
	});
};

// exports.getFullName = function (req, res) {
// 	let userId = req.params.id;
// 	Profile.findById({ _id: userId }).exec((err, user) => {
// 		if (err) {
// 			res.status(HttpStatus.BAD_REQUEST).json({
// 				message: "Internal Error",
// 			});
// 		}
// 		res.status(HttpStatus.OK).json(user.fullName);
// 	});
// };

exports.searchByFname = function (req, res) {
	let name = req.params.nameFirst;
	console.log(name);
	Profile.findByFirstName(name, function (err, data) {
		if (err) {
			res.json(err);
		}
		res.json(data);
	});
};

exports.searchByDob = function (req, res) {
	let birthDate = req.params.dOfb;
	console.log(birthDate);
	Profile.findByDob(birthDate, function (err, data) {
		if (err) {
			res.json(err);
		}
		res.json(data);
	});
};

exports.todayBday = function (req, res) {
	let id = req.params.userId;
	console.log(id);
	Profile.findById(id, function (err, data) {
		if (err) {
			res.json({ ERROR: err });
		} else {
			if (data.getIfBday()) return res.send("Happy Birthday!!");
			res.send("Nope :(");
		}
	});
};
