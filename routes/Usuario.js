import express from 'express';
const router = express.Router();
import Usuario from '../models/Usuario.js';

router.get('/registro', (req, res) => {
    res.render('usuarios/register');
})

router.post("/registro", (req, res) => {

    var erros = []

    if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
        erros.push({ texto: "Nome inválido" })
    }
    if (!req.body.email || typeof req.body.email == undefined || req.body.email == null) {
        erros.push({ texto: "Email inválido" })
    }
    if (!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null) {
        erros.push({ texto: "Senha inválida" })
    }
    if (req.body.senha.length < 4) {
        erros.push({ texto: "Senha muito curta" })
    }
    if (req.body.senha != req.body.senha2) {
        erros.push({ texto: "As senhas são diferentes" })
    }
    
    if (erros.length > 0) {
        res.render("usuarios/register", { erros: erros })
    }
    else {
    // Validação simples
    Usuario.create({
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha,
     }).then(() => {
        req.flash("success_msg", "Usuário registrado com sucesso!")
        res.redirect("/"); // Redireciona para a página de login após o registro
     }).catch((error) => {
        req.flash("error_msg", "Erro ao registrar usuário.")
        console.error("Erro ao criar usuário:", error);
        res.redirect("/usuarios/registro"); // Redireciona de volta para o registro em caso de erro
     })
    }
})

router.get("/login", (req, res) => {
    res.render("usuarios/login")
})


export default router;