<?php
include './conexao.php';

$nome = $_POST['nome'] ?? null;
$email = $_POST['email'] ?? null;
$senha = $_POST['senha'] ?? null;

$senha_hash = password_hash($senha, PASSWORD_DEFAULT);

$sql_checar_email = "SELECT * FROM users WHERE email = '$email'";
    $checar_email = $conn->query($sql_checar_email);

if ($checar_email->num_rows > 0) {
    echo "<div class='alert alert-danger' role='alert'>Este e-mail já está cadastrado. Por favor, utilize outro.</div>";
} else {
$sql_inserir_usuario = "INSERT INTO users (nome, email, senha) VALUES ('$nome', '$email','$senha)";
$resultado = $conn->query($sql_inserir_usuario);
};
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