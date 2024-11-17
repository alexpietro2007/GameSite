CREATE DATABASE vroom;
USE vroom;

CREATE TABLE tbl_user(
    idUser INT AUTO_INCREMENT PRIMARY KEY,
    user VARCHAR(100) NOT NULL,
    password VARCHAR(25) NOT NULL
)

CREATE TABLE tbl_dev (
    idDev INT AUTO_INCREMENT PRIMARY KEY,
    userDev VARCHAR(100) NOT NULL,
    password VARCHAR(25) NOT NULL
);

-- Criar tabela de jogos com chave estrangeira para dev
CREATE TABLE tbl_jogo (
    idJogo INT AUTO_INCREMENT PRIMARY KEY,
    nomeJogo VARCHAR(100) NOT NULL,
    genero VARCHAR(20) NOT NULL,
    avaliacao FLOAT NOT NULL,
    descricao VARCHAR(500),
    faixaEtaria INT NOT NULL,
    idDev INT, -- Adiciona a coluna idDev
    FOREIGN KEY (idDev) REFERENCES tbl_dev(idDev) -- Referência para dev
);

-- Criar tabela de itens (ou incidências) com chave estrangeira para dev
CREATE TABLE tbl_inc (
    idInc INT AUTO_INCREMENT PRIMARY KEY,
    nomeInc VARCHAR(100) NOT NULL,
    password VARCHAR(25) NOT NULL,
    idDev INT, -- Adiciona a coluna idDev
    FOREIGN KEY (idDev) REFERENCES tbl_dev(idDev) -- Referência para dev
);
