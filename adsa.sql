CREATE DATABASE VROOM;

USE vroom;

-- Criar tabela de desenvolvedores
CREATE TABLE dev (
    idDev INT AUTO_INCREMENT PRIMARY KEY,
    nomeDev VARCHAR(100) NOT NULL
);

-- Criar tabela de usuários
CREATE TABLE user (
    idUser INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(100) NOT NULL,
    password VARCHAR(25) NOT NULL
);

-- Criar tabela de jogos com chave estrangeira para dev
CREATE TABLE jogo (
    idJogo INT AUTO_INCREMENT PRIMARY KEY,
    nomeJogo VARCHAR(100) NOT NULL,
    genero VARCHAR(20) NOT NULL,
    avaliacao FLOAT NOT NULL,
    descricao VARCHAR(500),
    faixaEtaria INT NOT NULL,
    idDev INT, -- Adiciona a coluna idDev
    FOREIGN KEY (idDev) REFERENCES dev(idDev) -- Referência para dev
);

-- Criar tabela de itens (ou incidências) com chave estrangeira para dev
CREATE TABLE inc (
    idInc INT AUTO_INCREMENT PRIMARY KEY,
    nomeInc VARCHAR(100) NOT NULL,
    idDev INT, -- Adiciona a coluna idDev
    FOREIGN KEY (idDev) REFERENCES dev(idDev) -- Referência para dev
);
