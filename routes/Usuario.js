import express from 'express';
const router = express.Router();
import Usuario from '../models/Usuario.js';
import * as usuarioController from "../controllers/usuarioController.js"

router.get('/registro', (req, res) => {
    res.render('usuarios/register');
})

router.post("/registro", usuarioController.registrarUsuario)

router.get("/login", (req, res) => {
    res.render("usuarios/login")
})


export default router;