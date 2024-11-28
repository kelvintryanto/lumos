const UserController = require("../controllers/UserController");
const { userAuthorization } = require("../middlewares/authorization");
const router = require("express").Router();

// untuk membaca profil berisi, username, dan changepassword
router.get("/", userAuthorization, UserController.read);
// hanya untuk update username dan password
router.put("/", userAuthorization, UserController.update);
// minta ketikkan usernamenya
router.delete("/", userAuthorization, UserController.delete);

module.exports = router;
