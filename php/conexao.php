<?php 
$host = 'localhost';
$user = 'root';
$password = '';
$database = '2nfin';

$conn = new mysqli($host, $user, $password, $database);

if ($conn->connect_error) {
    echo "Ocorreu uma falha ao conectar com o banco de dados: " . $conn->connect_error;
    exit;
}
?>
