<?php 
$host = 'localhost';
$user = 'root';
$password = '';
$database = '2nfin';

$conn = new mysqli($host, $user, $password, $database);


if ($mysqli->connect_error) {
    echo "Ocorreu uma falha ao conectar com o banco de dados: " . $mysqli->connect_error;
    exit;
}
?>
