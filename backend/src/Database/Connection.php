<?php

namespace App\Database;

use PDO;
use PDOException;

class Connection {
    private static $instance;

    public static function getInstance() {
        if (self::$instance === null) {
            // Pega as credenciais das variáveis de ambiente do Render
            $host = getenv('dpg-d1an1pumcj7s73fntglg-a');
            $port = getenv('5432');
            $dbName = getenv('bd-desafio-tabinfo');
            $user = getenv('bd_desafio_tabinfo_user');
            $pass = getenv('oGfTDbf3JcynZU3SOZF9kmVPNyUUKQWA');

            try {
                // String de conexão para PostgreSQL
                $dsn = "pgsql:host={$host};port={$port};dbname={$dbName}";
                self::$instance = new PDO($dsn, $user, $pass);
                self::$instance->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                self::$instance->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
            } catch (PDOException $e) {
                header("Content-Type: application/json; charset=UTF-8");
                http_response_code(500);
                echo json_encode(['status' => 'error', 'message' => 'Erro na conexão com o banco de dados online.']);
                exit;
            }
        }
        return self::$instance;
    }
}