import express from 'express';
import dotenv from 'dotenv';
import flash from 'connect-flash';
import session from 'express-session';
import passport from 'passport';
import { engine } from 'express-handlebars';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import Usuario from './models/Usuario.js'; // Importando o modelo de usuário
import path from 'path';

dotenv.config(); // Carrega as variáveis de ambiente

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Resolvendo o __dirname em ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

// Diretório público estático corrigido
app.use(express.static(path.join(__dirname, 'public')));

// Rota principal
app.get('/', (req, res) => {
  res.render('home'); // Renderizando a view 'home.handlebars'
});

// Hosteando (Mas localhost hosteia só pro seu PC)
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
