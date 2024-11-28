const express = require("express");
const router = express.Router();
const userRouter = require("./user");
const journalRouter = require("./journal");
const authentication = require("../middlewares/authentication");
const UserController = require("../controllers/UserController");
const errorHandler = require("../middlewares/errorHandler");

router.post("/register", UserController.register);
router.post("/login", UserController.login);

// router.use(authentication) << di sini object request nya sudah termanipulasi
// masuk ke update profile, lalu
router.use(authentication);

router.use("/user", userRouter);
router.use("/journal", journalRouter);

router.use(errorHandler);
module.exports = router;
