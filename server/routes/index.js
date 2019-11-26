var express = require("express");
var router = express.Router();
var vacation = require("../controllers/vacation");
var auth = require("../services/auth");
//===>users pages<==//

/* GET vacation home page. */
router.get("/", vacation.allVacation);

/*GET vacation IMG */
router.get("/controllers/uploads/:file", vacation.getImg);
//===>admin pages<===//

/* DELETE GET vacation admin page. */
router.get("/delete/:id", [auth.isAdminMiddleware], vacation.getSingle);
/* DELETE DELETE vacation admin page. */
router.delete("/delete/:id", [auth.isAdminMiddleware], vacation.deleteVacation);
/* POST vacation admin page. */
router.post("/add", [auth.isAdminMiddleware], vacation.addVacation);
/* GET vacation admin page. */
router.get("/edit/:id", [auth.isAdminMiddleware], vacation.getSingle);
/* PUT vacation admin page. */
router.post("/edit/:id", [auth.isAdminMiddleware], vacation.editVacation);
/* GET vacation admin page. */
router.get("/admin", [auth.isAdminMiddleware], vacation.allVacation);

module.exports = router;
