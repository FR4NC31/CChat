import express from "express";
import { signup } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup)

router.post("/login", (req, res) => {
    res.status(501).json({message: "Login endpoint not implemented yet"})
})

router.post("/logout", (req, res) => {
    res.status(501).json({message: "Logout endpoint not implemented yet"})
})


export default router
