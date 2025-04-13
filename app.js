const express = require('express');
const { create } = require('express-handlebars'); 
import express from 'express';
import dotenv from 'dotenv';
import flash from 'connect-flash';
import session from 'express-session';
import passport from 'passport';
import { engine } from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { Sequelize } from 'sequelize';
import Usuario from './models/Usuario.js'; // Importando o modelo de usuário

dotenv.config(); // Carrega as variáveis de ambiente


const app = express();
const path = require('path');


const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Resolvendo o __dirname em ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// Configuração do Handlebars como motor de template
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/views`); // Agora __dirname está resolvido

// Definindo o diretório de partials
app.set('view options', { partialsDir: `${__dirname}/views/partials` });


const hbs = create({
  extname: '.handlebars',
  layoutsDir: path.join(__dirname, 'views', 'layouts'),  // Definindo a pasta de layouts
  defaultLayout: 'main',  // O layout padrão é o "main.handlebars"
});
app.engine('handlebars', hbs.engine); // Definir o motor de templates
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
  res.render('home');  // Vai renderizar o template "home.handlebars"
})

// Rota principal
app.get('/', (req, res) => {
  res.render('home'); // Renderizando a view 'home.handlebars'
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
