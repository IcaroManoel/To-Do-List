import bcrypt from "bcryptjs";
import Usuario from "../models/Usuario.js";

// Função para registrar o usuário
export function registrarUsuario(req, res) {
    var erros = [];

    // Validação de dados do formulário
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
        res.render("usuarios/register", { erros: erros });
    } else {
        // Verificando se o email já existe no banco (usando Sequelize)
        Usuario.findOne({ where: { email: req.body.email } }).then((usuario) => {
            if (usuario) {
                req.flash("error_msg", "Já existe uma conta com esse email.");
                res.redirect("/usuarios/registro");
            } else {
                // Criando novo usuário
                const novoUsuario = new Usuario({
                    nome: req.body.nome,
                    email: req.body.email,
                    senha: req.body.senha,
                });

                // Gerando salt para criptografar a senha
                bcrypt.genSalt(10, (erro, salt) => {
                    if (erro) {
                        req.flash("error_msg", "Erro ao gerar o salt.");
                        return res.redirect("/usuarios/registro");
                    }

                    // Criptografando a senha
                    bcrypt.hash(novoUsuario.senha, salt, (erro, hash) => {
                        if (erro) {
                            req.flash("error_msg", "Houve um erro durante o salvamento do usuário.");
                            return res.redirect("/usuarios/registro");
                        }

                        // Atribuindo o hash à senha
                        novoUsuario.senha = hash;

                        // Salvando o usuário no banco
                        novoUsuario.save()
                            .then(() => {
                                req.flash("success_msg", "Usuário criado com sucesso!");
                                res.redirect("/");
                            })
                            .catch((err) => {
                                console.log(err);
                                req.flash("error_msg", "Erro ao criar o usuário, tente novamente.");
                                res.redirect("/usuarios/registro");
                            });
                    });
                });
            }
        }).catch((err) => {
            console.log(err);
            req.flash("error_msg", "Erro interno ao verificar o email.");
            res.redirect("/usuarios/registro");
        });
    }
}

    
