// server/src/routes/auth.routes.js
import express from "express";
import { registerUser, loginUser } from "../controllers/auth.controller.js";
import { validateRegister, validateLogin } from "../validators/auth.validator.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", validateRegister, registerUser);
router.post("/login", validateLogin, loginUser);

// BE-07: required by AuthContext.getMe() on every page refresh
// Without this, stored token gets 404 → AuthContext clears it → user logged out on reload
router.get("/me", protect, (req, res) => res.json({ user: req.user }));

export default router;
