import bcrypt from "bcryptjs";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import Usuario from "../models/Usuario.js";

// Função para registrar o usuário
export function registrarUsuario(req, res) {
    const erros = [];

    // Validação básica
    if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
        erros.push({ texto: "Nome inválido." });
    }
    if (!req.body.email || typeof req.body.email == undefined || req.body.email == null) {
        erros.push({ texto: "Email inválido." });
    }
    if (!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null) {
        erros.push({ texto: "Senha inválida." });
    }
    if (req.body.senha.length < 4) {
        erros.push({ texto: "Senha muito curta." });
    }
    if (req.body.senha != req.body.senha2) {
        erros.push({ texto: "As senhas são diferentes." });
    }

    if (erros.length > 0) {
        res.render("usuarios/register", { erros });
    } else {
        // Agora usando Mongoose
        Usuario.findOne({ email: req.body.email })
            .then((usuario) => {
                if (usuario) {
                    req.flash("error_msg", "Já existe uma conta com esse email.");
                    return res.redirect("/usuarios/registro");
                }

                const novoUsuario = new Usuario({
                    nome: req.body.nome,
                    email: req.body.email,
                    senha: req.body.senha,
                });

                bcrypt.genSalt(10, (erro, salt) => {
                    if (erro) {
                        req.flash("error_msg", "Erro ao gerar o salt.");
                        return res.redirect("/usuarios/registro");
                    }

                    bcrypt.hash(novoUsuario.senha, salt, (erro, hash) => {
                        if (erro) {
                            req.flash("error_msg", "Erro ao criptografar a senha.");
                            return res.redirect("/usuarios/registro");
                        }

                        novoUsuario.senha = hash;

                        novoUsuario.save()
                            .then(() => {
                                req.flash("success_msg", "Usuário criado com sucesso!");
                                res.redirect("/");
                            })
                            .catch((err) => {
                                console.log(err);
                                req.flash("error_msg", "Erro ao criar o usuário.");
                                res.redirect("/usuarios/registro");
                            });
                    });
                });
            })
            .catch((err) => {
                console.log(err);
                req.flash("error_msg", "Erro interno ao verificar o email.");
                res.redirect("/usuarios/registro");
            });
    }
}

export function loginUsuario(req, res, next) {
    if (req.isAuthenticated()) {
        console.log('Usuário já autenticado, redirecionando para o dashboard...');
        return res.redirect("/usuarios/dashboard");  // Redireciona caso já esteja logado
    } 

    // Caso o usuário não esteja autenticado, vai continuar para o processo de autenticação
    passport.authenticate("local", {
        successRedirect: "/usuarios/dashboard",
        failureRedirect: "/usuarios/login",
        failureFlash: true,
    })(req, res, next);
}






