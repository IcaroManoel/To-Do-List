<<<<<<< HEAD
const express = require('express');
const { create } = require('express-handlebars'); 
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const hbs = create({
  extname: '.handlebars',
  layoutsDir: path.join(__dirname, 'views', 'layouts'),  // Definindo a pasta de layouts
  defaultLayout: 'main',  // O layout padrão é o "main.handlebars"
});
app.engine('handlebars', hbs.engine); // Definir o motor de templates
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
  res.render('home');  // Vai renderizar o template "home.handlebars"
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
=======
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import flash from 'connect-flash';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import path from 'path';
import { engine } from 'express-handlebars'; // Importando o engine do express-handlebars

dotenv.config(); // Carrega as variáveis de ambiente

const app = express();

// Conexão com o MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado ao MongoDB!'))
.catch((err) => console.error('Erro ao conectar com o MongoDB', err));

// Configuração do Handlebars como motor de template
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views')); // Definindo a pasta de views

// Configuração de sessões
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Defina a chave secreta no .env
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }), // Usando MongoStore para armazenar sessões no MongoDB
  })
);

// Usando Flash messages
app.use(flash());

// Configuração do Passport
app.use(passport.initialize());
app.use(passport.session());

// Middleware para enviar variáveis de flash para todas as views
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

//Rotas

app.get('/', (req, res) => {
    res.render("/partials/home")
});

// Iniciando o servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
>>>>>>> 19b927e5b4ad602b703fe3127b4d3af6ad8b514c
});
