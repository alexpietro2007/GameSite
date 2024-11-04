import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { create } from 'express-handlebars';
import { readFileSync } from 'fs';
import mysql from 'mysql2'


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const hbs = create({partialsDir: [path.join(__dirname, 'views', 'partials')]});
const app = express();



const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', // seu nome de usuário
    password: '', // sua senha
    database: 'VROOM' // o nome do seu banco de dados
    
});

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err);
        return;
    }
    console.log('Conectado ao MySQL como id ' + connection.threadId);
});

// Servir arquivos estáticos
app.use('/public', express.static(path.join(__dirname, 'public')));

// Configurar Handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Definir rotas
app.get('/', (req, res) => {
    res.redirect('/login');
});

app.get('/login?', (req, res) =>{
    res.render('login')
})

app.get('/Verificando', (req, res) =>{
    let name = req.query.user
    let password = req.query.password
    if (password == '1234' && name == "alex"){
        res.redirect('home')
    }
})
app.get('/home', (req, res) =>{
    res.render('home')
})


// Ouça na porta fornecida pelo ambiente de execução
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App rodando na porta ${PORT}`));