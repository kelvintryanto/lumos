const express = require("express");
const router = express.Router();
const userRouter = require("./user");
const journalRouter = require("./journal");
const authentication = require("../middlewares/authentication");
const errorHandler = require("../middlewares/errorHandlers");
const UserController = require("../controllers/UserController");

router.post("/login", UserController.login);

// router.use(authentication) << di sini object request nya sudah termanipulasi
router.use(authentication);
router.post("/register", UserController.register);

// authorization masukkan sebelum UserController, dalam kasus ini, hanya cuisines update dan delete yang menggunakan authorization
router.use("/", journalRouter);
router.use("/profile", userRouter);

router.use(errorHandler);
module.exports = router;
