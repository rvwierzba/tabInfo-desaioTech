-- Local: backend/docker/mysql/init/init.sql

-- O Docker já cria o banco 'desafio_db' para nós, mas garantimos que estamos usando ele.
USE desafio_db;

-- Cria a nossa tabela de usuários se ela ainda não existir.
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    reset_token VARCHAR(255) NULL,
    reset_token_expires_at DATETIME NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);