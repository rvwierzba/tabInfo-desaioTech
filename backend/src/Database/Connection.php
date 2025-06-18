<?php

namespace App\Database;

use PDO;
use PDOException;

class Connection {
    private static $instance;

    public static function getInstance() {
        if (self::$instance === null) {
            $host = 'sql311.infinityfree.com'; 
            $dbName = 'if0_39266996_desafio';     
            $user = 'if0_39266996';               
            $pass = '84795312345678';    

            try {
                $dsn = "mysql:host={$host};dbname={$dbName};charset=utf8";
                self::$instance = new PDO($dsn, $user, $pass);
                self::$instance->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                self::$instance->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
            } catch (PDOException $e) {
                die("Erro na conexão com o banco de dados: " . $e->getMessage());
            }
        }
        return self::$instance;
    }
}