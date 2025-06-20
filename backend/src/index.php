<?php

// ---- CÓDIGO DE DIAGNÓSTICO DEFINITIVO ----
// Este script ignora todo o resto e apenas mostra as informações do servidor.

header('Content-Type: application/json; charset=UTF-8');

// Imprime todas as variáveis que o servidor conhece sobre a requisição.
echo json_encode($_SERVER, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);

?>