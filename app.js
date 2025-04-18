import express from 'express';
import dotenv from 'dotenv';
import flash from 'connect-flash';
import session from 'express-session';
import passport from 'passport';
import { engine } from 'express-handlebars';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import Usuariosrouter from './routes/Usuario.js'; // Importando o modelo de usuário
import path from 'path';
import Usuario from './models/Usuario.js'; // Importando o modelo de usuário
import connectDB from './config/database.js';
connectDB();
import configurarPassport from "./config/auth.js"; // ajusta o caminho se tiver diferente



dotenv.config(); // Carrega as variáveis de ambiente

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Resolvendo o __dirname em ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(
  session({
    secret: "seuSegredo",
    resave: true,
    saveUninitialized: true,
  })
);

// Passport
configurarPassport(passport);
app.use(passport.initialize());
app.use(passport.session());

// Flash
app.use(flash());

// Middleware global para mensagens
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error"); // usado pelo passport
  res.locals.userauthenticated = req.isAuthenticated()
  next();
});

// Definir o motor de templates
app.engine('handlebars', engine({
    defaultLayout: 'main',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true, // Desabilita a verificação
        allowProtoMethodsByDefault: true
    }
})); 
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/views`); 

// Definindo o diretório de partials
app.set('view options', { partialsDir: `${__dirname}/views/partials` });

//Body-Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Usando Flash


// Diretório público estático corrigido
app.use(express.static(path.join(__dirname, 'public')));

// Rota principal
app.get('/', (req, res) => {
  res.render('home'); // Renderizando a view 'home.handlebars'
});

app.use("/usuarios", Usuariosrouter); // Rota para o modelo de usuário

// Hosteando (Mas localhost hosteia só pro seu PC)
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});