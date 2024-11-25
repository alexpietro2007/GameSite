import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { create } from 'express-handlebars';
import { readFileSync } from 'fs';
import mysql from 'mysql2'
import session, { Cookie } from 'express-session';

var telaC = 0
var telaL = 0
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const hbs = create({ partialsDir: [path.join(__dirname, 'views', 'partials')] });
const app = express();
const log = console.log
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', // seu nome de usuário
    password: 'neurose@87', // sua senha
    database: 'VROOM' // o nome do seu banco de dados

});
app.use(session({
    secret: 'AlexPietro@gg',
    resave: false,
    saveUninitialized: false,
    Cookie: { secure: false }
}))

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



app.get('/Verificando', (req, res) => {
    const valores = [req.query.name, req.query.password];
    switch (telaC) {
        case 1:
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
            break
        case 2:
            const query2 = 'INSERT INTO tbl_dev (userDev, password) VALUES (?, ?)';
            log(valores)
            connection.query(query2, valores, (err, results) => {
                if (err) {
                    console.error('Erro ao inserir dados:', err);
                    return res.status(500).send('Erro ao inserir dados');
                }
                console.log('Dados inseridos com sucesso! ID:', results.insertId);
                res.render('home')
            });
            break
        case 3:
            const query3 = 'INSERT INTO tbl_inc (nomeInc, password) VALUES (?, ?)';
            log(valores)
            connection.query(query3, valores, (err, results) => {
                if (err) {
                    console.error('Erro ao inserir dados:', err);
                    return res.status(500).send('Erro ao inserir dados');
                }
                console.log('Dados inseridos com sucesso! ID:', results.insertId);
                res.render('home')
            });
    }
    telaC = 0
});

app.get('/cadastro', (req, res) => {
    telaC = 1
    res.render('/cadastro')
})

app.get('/cadastroDev', (req, res) => {
    telaC = 2
    res.render('/cadastro')
})

app.get('/cadastroInc', (req, res) => {
    telaC = 3
    res.render('/cadastro')
})

app.get('/loginUser', (req, res) => {
    telaL = 1
    res.render('login')
})

app.get('/loginDev', (req, res) => {
    telaL = 2
    res.render('login')
})

app.get('/loginInc', (req, res) => {
    telaL = 3
    res.render('login')
})

function isAuthenticated(req, res, next) {
    if (req.session.isAuthenticated) {
        next(); // Usuário autenticado, continuar
    } else {
        res.redirect('/login'); // Redirecionar para login se não autenticado
    }
}

// Endpoint de login
app.get('/VerificandoLogin', (req, res) => {
    const user = req.query.user;
    const password = req.query.password;

    switch (telaL) {
        case 1:
            connection.query(
                'SELECT user, password FROM tbl_user WHERE user = ? AND password = ?',
                [user, password],
                (error, results) => {
                    if (error) {
                        console.error('Erro ao buscar os dados:', error);
                        res.render('login', { error: 'Ocorreu um erro ao verificar o login.' });
                        return;
                    }

                    if (results.length > 0) {
                        // Salvar dados na sessão
                        req.session.isAuthenticated = true;
                        req.session.user = user;

                        res.redirect('/home'); // Redirecionar para home
                    } else {
                        res.render('/login', { error: 'Usuário ou senha inválidos!' });
                    }
                }
            );
        break
        case 2:
            connection.query(
                'SELECT userDev, password FROM tbl_dev WHERE user = ? AND password = ?',
                [user, password],
                (error, results) => {
                    if (error) {
                        console.error('Erro ao buscar os dados:', error);
                        res.render('login', { error: 'Ocorreu um erro ao verificar o login.' });
                        return;
                    }
        
                    if (results.length > 0) {
                        // Salvar dados na sessão
                        req.session.isAuthenticated = true;
                        req.session.user = user;
        
                        res.redirect('/home'); // Redirecionar para home
                    } else {
                        res.render('/login', { error: 'Usuário ou senha inválidos!' });
                    }
                }
            );
        break
        case 3:
            connection.query(
                'SELECT nomeInc, password FROM tbl_inc WHERE user = ? AND password = ?',
                [user, password],
                (error, results) => {
                    if (error) {
                        console.error('Erro ao buscar os dados:', error);
                        res.render('login', { error: 'Ocorreu um erro ao verificar o login.' });
                        return;
                    }
        
                    if (results.length > 0) {
                        // Salvar dados na sessão
                        req.session.isAuthenticated = true;
                        req.session.user = user;
        
                        res.redirect('/home'); // Redirecionar para home
                    } else {
                        res.render('/login', { error: 'Usuário ou senha inválidos!' });
                    }
                }
            );
        break
    }
    telaL = 0
});

// Página inicial (rota protegida)
app.get('/home', isAuthenticated, (req, res) => {
    res.render('home', { layout: 'pagina', user: req.session.user });
    isAuthenticated = false
});

// Logout
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Erro ao encerrar a sessão:', err);
            return res.redirect('/home');
        }
        res.redirect('/login');
    });
});



// Ouça na porta fornecida pelo ambiente de execução
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App rodando na porta localhost:${PORT}`));