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
const log = console.log
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', // seu nome de usuário
    password: 'neurose@87', // sua senha
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

app.use(express.urlencoded({ extended: true }));

// Configurar Handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Definir rotas
app.get('/', (req, res) => {
    res.redirect('/loginUser');
});

app.get('/loginUser?', (req, res) =>{
    res.render('login')
})

app.get('/Verificando', (req, res) => {
    const valores = [req.query.name, req.query.password];

    const query = 'INSERT INTO tbl_user (user, password) VALUES (?, ?)';
    log(valores)
    connection.query(query, valores, (err, results) => {
        if (err) {
            console.error('Erro ao inserir dados:', err);
            return res.status(500).send('Erro ao inserir dados');
        }
        console.log('Dados inseridos com sucesso! ID:', results.insertId);
        res.render('home')
    });
});

app.get('/home', (req, res) =>{
    res.render('home')
})
app.get('/cadastro', (req, res) =>{
    res.render('cadastro')
})
app.get('/VerificandoLogin', (req, res)=>{
    let user = req.query.user
    let password = req.query.password
    connection.query('SELECT usuario, password FROM tbl_user WHERE usuario = ? AND password = ?'
        ,[user, password],
        (error, results) =>{
            if (error) {
                console.error('Erro ao buscar os dados:', error);
                return;
              }
          
              if (results.length > 0) {
                res.render('home')
              } else {
                
              }
          
        }
    )
})

// Ouça na porta fornecida pelo ambiente de execução
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App rodando na porta localhost:${PORT}`));