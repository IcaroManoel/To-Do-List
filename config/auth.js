import { Strategy as LocalStrategy } from "passport-local";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import "../models/Usuario.js";

const Usuario = mongoose.model("Usuario");

export default function configurarPassport(passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email", passwordField: "senha" }, (email, senha, done) => {
      Usuario.findOne({ email: email }).then((usuario) => {
        if (!usuario) {
          return done(null, false, { message: "Este usuário não existe!" });
        }

        bcrypt.compare(senha, usuario.senha, (erro, batem) => {
          if (batem) {
            return done(null, usuario);
          } else {
            return done(null, false, { message: "Senha incorreta!" });
          }
        });
      });
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    Usuario.findById(id)
      .then((usuario) => done(null, usuario))
      .catch((err) => done(err));
  });
}
