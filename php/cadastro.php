<?php
$host = 'localhost';
$user = 'root';
$password = '';
$database = '2nfin';

$conexao = new mysqli($host, $user, $password, $database);


if ($conexao->connect_error) {
    echo "Ocorreu uma falha ao conectar com o banco de dados: " . $mysqli->connect_error;
    exit;
}

$nome = $_REQUEST['nome'] ?? null;
$email = $_REQUEST['email']  ?? null;
$senha = $_REQUEST['senha']  ?? null;

$sql = "INSERT INTO users (nome, email, senha) VALUES ('$nome', '$email','$senha)";

$resultado = $conexao->query($sql);
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>2N Finanças</title>
    <link rel="stylesheet" href="../assets/CSS/styles-cad.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
</head>

<body>
    <div class="container">
        <form action="" method="POST">
            <div class="form-container">
                <h1>Cadastre-se</h1>
                <p>
                    <label for="nome">Nome</label>
                    <input type="text" id="nome" name="nome" placeholder="Digite seu nome." required>
                </p>
                <p>
                    <label for="email">E-mail</label>
                    <input type="email" id="email" name="email" placeholder="Digite seu e-mail." required>
                </p>
                <p>
                    <label for="senha">Senha</label>
                    <input type="password" id="senha" name="senha" placeholder="Digite sua senha." required>
                </p>
                <button class="button" type="submit">Registrar</button>
            </div>
            <div class="image-container"></div>
        </form>
    </div>
</body>
<script>
    document.addEventListener("DOMContentLoaded", function() {
        const button = document.querySelector(".button");
        button.classList.add("show");
    });
</script>

</html>