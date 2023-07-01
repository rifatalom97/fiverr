const express = require("express");
const authController = require("../controllers/AuthController");
const AuthMiddleware = require("../middlewares/AuthMiddleware");

const authRoutes = express.Router();

authRoutes.post("/signup", authController.signup);
authRoutes.post("/login", authController.login);
authRoutes.post("/logout", authController.logout);
authRoutes.post("/get_user_info", AuthMiddleware, authController.getUserInfo);

module.exports = authRoutes;
