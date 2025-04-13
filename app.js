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
});
