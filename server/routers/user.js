const UserController = require("../controllers/UserController");
const router = require("express").Router();

router.get("/", UserController.read);
router.put("/:id", UserController.update);
router.delete("/:id", UserController.delete);

module.exports = router;
