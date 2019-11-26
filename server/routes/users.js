var express = require("express");
var router = express.Router();
var userLogin = require("../controllers/users");
var auth = require("../services/auth");
/* GET user listing. */
router.get("/login", userLogin.login);
/* POST user listning. */
router.post("/register", userLogin.register);
module.exports = router;
