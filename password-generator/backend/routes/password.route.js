import express from "express";
import { protectRoute } from "../middleware/protect.route.js";
import { addPassword, getPasswords } from "../controllers/password.controller.js";

const router = express.Router();

router.post("/save", protectRoute, addPassword);
router.get("/", protectRoute, getPasswords);

export default router;