import express from "express";
import { signUp,login,logout,authCheck } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/protect.route.js";
const router = express.Router()

router.post("/signup",signUp)
router.post("/login",login)
router.post("/logout",logout)
router.get("/authCheck",protectRoute,authCheck)

export default router;