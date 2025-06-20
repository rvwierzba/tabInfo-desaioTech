<?php

namespace App\Database;

use PDO;
use PDOException;

class Connection {
    private static $instance;

    public static function getInstance() {
        if (self::$instance === null) {
            // Pega as credenciais das variáveis de ambiente que definimos no Render
            $host = getenv('DB_HOST');
            $port = getenv('DB_PORT');
            $dbName = getenv('DB_NAME');
            $user = getenv('DB_USER');
            $pass = getenv('DB_PASS');

            try {
                // String de conexão para PostgreSQL, incluindo o SSL obrigatório
                $dsn = "pgsql:host={$host};port={$port};dbname={$dbName}";
                
                
                self::$instance = new PDO($dsn, $user, $pass);
                self::$instance->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                self::$instance->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

            } catch (PDOException $e) {
                header("Content-Type: application/json; charset=UTF-8");
                http_response_code(500);
                // Para debug, é útil ver a mensagem de erro real do PDO
                echo json_encode(['status' => 'error', 'message' => 'Erro na conexão com o banco de dados: ' . $e->getMessage()]);
                exit;
            }
        }
        return self::$instance;
    }
}