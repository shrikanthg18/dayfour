var express = require("express");
var router = express.Router();

var profileController = require("../controllers/profile");

router.get("/profilepage", function (req, res, next) {
	res.render("profile", {
		formAction: `http://localhost:3000/profile/fullname/${req.body.userId}`,
	});
});

router.post("/profilepost", profileController.createProfile);

router.get("/allprofiles", profileController.getProfiles);

router.get("/fullname/:id", profileController.getFullName);

router.get("/searchbyfname/:nameFirst", profileController.searchByFname);

router.get("/searchbydob/:dOfb", profileController.searchByDob);

router.get("/bdaytoday/:userId", profileController.todayBday);

module.exports = router;
