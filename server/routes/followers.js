var express = require("express");
var auth = require("../services/auth");
var router = express.Router();

[auth.isUserMiddleware];
/* POST new follower. */
router.post("/", [auth.isUserMiddleware], function(req, res, next) {
  res.json({ title: "POST new follower" });
});

/* PUT updating follower. */
router.put("/", [auth.isUserMiddleware], function(req, res, next) {
  res.json({ title: "PUT updating follower" });
});

/* DELETE deleting follower. */
router.delete("/", [auth.isUserMiddleware], function(req, res, next) {
  res.json({ title: "DELETE deleting follower" });
});
module.exports = router;
