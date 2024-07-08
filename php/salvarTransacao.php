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

if (!$valor || !$tipo || !$data_transacao || ($tipo !== 'retirarPoupanca' && $tipo !== 'adicionarPoupanca' && !$descricao)) {
    echo json_encode(["status" => "error", "message" => "Dados incompletos"]);
    exit;
}

$mysqli->begin_transaction();

try {
    // Adicionar transação
    $sql = "INSERT INTO transacoes (usuario_id, descricao, valor, tipo, data_transacao) VALUES (?, ?, ?, ?, ?)";
    $stmt = $mysqli->prepare($sql);

    if ($stmt === false) {
        throw new Exception("Falha na preparação da consulta");
    }

    $stmt->bind_param("isdss", $usuario_id, $descricao, $valor, $tipo, $data_transacao);

    if (!$stmt->execute()) {
        throw new Exception("Erro ao adicionar transação");
    }

    // Atualizar poupança
    if ($tipo === 'adicionarPoupanca' || $tipo === 'retirarPoupanca') {
        $sql = "UPDATE users SET poupanca = poupanca " . ($tipo === 'adicionarPoupanca' ? "+" : "-") . " ? WHERE id = ?";
        $stmt = $mysqli->prepare($sql);

        if ($stmt === false) {
            throw new Exception("Falha na preparação da consulta de atualização da poupança");
        }

        $stmt->bind_param("di", $valor, $usuario_id);

        if (!$stmt->execute()) {
            throw new Exception("Erro ao atualizar poupança");
        }
    }

    $mysqli->commit();

    echo json_encode(["status" => "success", "message" => "Transação adicionada com sucesso"]);
} catch (Exception $e) {
    $mysqli->rollback();
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}

$stmt->close();
$mysqli->close();
?>
