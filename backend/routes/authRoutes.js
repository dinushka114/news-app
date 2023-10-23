import express from 'express';
import { registerAdminAccount, userLogin, userLogut, userRegister } from '../controllers/authController.js';


const router = express.Router();

router.post("/", async (req, res) => {
    registerAdminAccount(req, res);
})

router.post("/register", async (req, res) => {
    userRegister(req, res);
})

router.post("/user-login", async (req, res) => {
    userLogin(req, res, "User");
});

router.post("/admin-login", async (req, res) => {
    userLogin(req, res, "Admin");
});


router.get("/logout", async (req, res) => {
    userLogut(req, res);
})


export default router;