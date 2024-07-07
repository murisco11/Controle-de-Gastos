<?php
session_start();
include('conexao.php');

// Receber dados JSON da requisição POST
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if ($data === null) {
    echo json_encode(["status" => "error", "message" => "Dados inválidos"]);
    exit;
}

if (!isset($_SESSION['id'])) {
    echo json_encode(["status" => "error", "message" => "Usuário não está logado"]);
    exit();
}

$usuario_id = $_SESSION['id'];
$descricao = $data['descricao'] ?? null;
$valor = $data['valor'] ?? null;
$tipo = $data['tipo'] ?? null;
$data_transacao = $data['data_transacao'] ?? null;

if (!$descricao || !$valor || !$tipo || !$data_transacao) {
    echo json_encode(["status" => "error", "message" => "Dados incompletos"]);
    exit;
}

$sql = "INSERT INTO transacoes (usuario_id, descricao, valor, tipo, data_transacao) VALUES (?, ?, ?, ?, ?)";
$stmt = $mysqli->prepare($sql);

if ($stmt === false) {
    echo json_encode(["status" => "error", "message" => "Falha na preparação da consulta"]);
    exit;
}

$stmt->bind_param("isdss", $usuario_id, $descricao, $valor, $tipo, $data_transacao);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Transação adicionada com sucesso"]);
} else {
    echo json_encode(["status" => "error", "message" => "Erro ao adicionar transação"]);
}

$stmt->close();
?>