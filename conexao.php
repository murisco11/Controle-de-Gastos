<?php

$usuario = 'root';
$senha = 'root';
$database = 'login';
$host = 'login';

$mysqli = new mysqli($host, $usuario, $senha, $confirmacao, $database);

if($mysqli->error) {
    die("Ocorreu uma falha ao conectar com o banco de dados" . $mysqli->error);
}