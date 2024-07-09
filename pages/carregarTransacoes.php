<?php
session_start();
include ('./config/conexao.php');

if (!isset($_SESSION['id'])) {
    header("Location: ../index.php");
    exit();
}

$usuario_id = $_SESSION['id'];

$sql = "SELECT descricao, valor, tipo, data_transacao FROM transacoes WHERE usuario_id = ?";
$stmt = $mysqli->prepare($sql);
$stmt->bind_param("i", $usuario_id);
$stmt->execute();
$result = $stmt->get_result();

$transacoes = [];

while ($row = $result->fetch_assoc()) {
    $transacoes[] = $row;
}

$stmt->close();

$sql = "SELECT poupanca FROM users WHERE id = ?";
$stmt = $mysqli->prepare($sql);
$stmt->bind_param("i", $usuario_id);
$stmt->execute();
$stmt->bind_result($poupanca);
$stmt->fetch();
$stmt->close();

echo json_encode([
    "status" => "success",
    "transacoes" => $transacoes,
    "poupanca" => floatval($poupanca)
]);

$mysqli->close();
?>
