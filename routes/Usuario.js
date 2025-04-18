import express from 'express';
const router = express.Router();
import * as usuarioController from "../controllers/usuarioController.js"; // Corrigido aqui
import passport from 'passport';

// Rota de registro
router.get('/registro', (req, res) => {
    res.render('usuarios/register');
});

// Rota de cadastro de usuário
router.post("/registro", usuarioController.registrarUsuario);

// Rota de login (GET)
router.get("/login", (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect("/usuarios/dashboard");
    }
    res.render("usuarios/login");
});

router.get("/dashboard", (req, res) => {
    if (req.isAuthenticated()) {
    res.render("usuarios/dashboard", {escondernavbar: true})
    } else {
        res.send("Você não tem permissão")
    }
})

router.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err) {
            console.log(err)
            return res.redirect("/") // ou trata o erro melhor, se quiser
        }
        req.flash("success_msg", "Deslogado com sucesso!")
        res.redirect("/")
    })
})

// Rota de login (POST) - Usando Passport para autenticação
router.post("/login", usuarioController.loginUsuario)


export default router;
