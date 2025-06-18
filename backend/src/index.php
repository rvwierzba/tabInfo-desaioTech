<?php

require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/Database/Connection.php';

use \App\Database\Connection;
use \Firebase\JWT\JWT;
use \Firebase\JWT\Key;

// Chave secreta. Em um projeto real, isso viria de uma variável de ambiente.
$secret_key = "SUA_CHAVE_SECRETA_SUPER_SECRETA_AQUI";

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

if ($path === '/register' && $method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    if (empty($data['name']) || empty($data['email']) || empty($data['password'])) {
        http_response_code(400); echo json_encode(['status' => 'error', 'message' => 'Todos os campos são obrigatórios.']); exit;
    }
    try {
        $pdo = Connection::getInstance();
        $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
        $stmt->execute([$data['email']]);
        if ($stmt->fetch()) {
            http_response_code(409); echo json_encode(['status' => 'error', 'message' => 'Este e-mail já está em uso.']); exit;
        }
        $hashedPassword = password_hash($data['password'], PASSWORD_ARGON2ID);
        $stmt = $pdo->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
        $stmt->execute([$data['name'], $data['email'], $hashedPassword]);
        http_response_code(201); echo json_encode(['status' => 'success', 'message' => 'Usuário cadastrado com sucesso!']);
    } catch (\PDOException $e) {
        http_response_code(500); echo json_encode(['status' => 'error', 'message' => 'Erro no servidor: ' . $e->getMessage()]);
    }
} elseif ($path === '/login' && $method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    if (empty($data['email']) || empty($data['password'])) {
        http_response_code(400); echo json_encode(['status' => 'error', 'message' => 'E-mail e senha são obrigatórios.']); exit;
    }
    try {
        $pdo = Connection::getInstance();
        $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->execute([$data['email']]);
        $user = $stmt->fetch();
        if ($user && password_verify($data['password'], $user['password'])) {
            $payload = [
                "iss" => "http://localhost:8080", "aud" => "http://localhost:8080",
                "iat" => time(), "exp" => time() + 3600,
                "data" => ["id" => $user['id'], "name" => $user['name'], "email" => $user['email']]
            ];
            $jwt = JWT::encode($payload, $secret_key, 'HS256');
            http_response_code(200);
            echo json_encode(["status" => "success", "message" => "Login bem-sucedido!", "token" => $jwt]);
        } else {
            http_response_code(401); echo json_encode(["status" => "error", "message" => "E-mail ou senha inválidos."]);
        }
    } catch (\Exception $e) {
        http_response_code(500); echo json_encode(['status' => 'error', 'message' => 'Erro no servidor: ' . $e->getMessage()]);
    }
} elseif ($path === '/users' && $method === 'GET') {
    try {
        $authHeader = $_SERVER['HTTP_AUTHORIZATION'] ?? null;
        if (!$authHeader) {
            http_response_code(401); echo json_encode(['status' => 'error', 'message' => 'Token de acesso não fornecido.']); exit;
        }
        list($jwt) = sscanf($authHeader, 'Bearer %s');
        if (!$jwt) {
            http_response_code(401); echo json_encode(['status' => 'error', 'message' => 'Formato de token inválido.']); exit;
        }
        $decoded = JWT::decode($jwt, new Key($secret_key, 'HS256'));
        $pdo = Connection::getInstance();
        $stmt = $pdo->query("SELECT id, name, email, created_at FROM users ORDER BY name ASC");
        $users = $stmt->fetchAll();
        http_response_code(200);
        echo json_encode(['status' => 'success', 'users' => $users]);
    } catch (\Exception $e) {
        http_response_code(401);
        echo json_encode(['status' => 'error', 'message' => 'Acesso não autorizado: ' . $e->getMessage()]);
    }
} else {
    http_response_code(404);
    echo json_encode(['status' => 'error', 'message' => 'Rota não encontrada.']);
}