<?php
session_start();
include('php/conexao.php');

$erro_email = false;
$erro_senha = false;
$erro_login = false;

if (isset($_POST["email"]) && isset($_POST["senha"])) {

    $email = $_POST["email"];
    $senha = $_POST["senha"];

    if (empty($email)) {
        $erro_email = true;
    }

    if (empty($senha)) {
        $erro_senha = true;
    }

    if (!$erro_email && !$erro_senha) {
        $stmt = $mysqli->prepare("SELECT id, nome, senha, saldo, poupanca FROM users WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows == 1) {
            $usuario = $result->fetch_assoc();
            
            if (password_verify($senha, $usuario['senha'])) {
                $_SESSION['id'] = $usuario['id'];
                $_SESSION['nome'] = $usuario['nome'];
                $_SESSION['saldo'] = $usuario['saldo'];
                $_SESSION['poupanca'] = $usuario['poupanca'];
                
                header("Location: php/controlefinanceiro.php");
                exit();
            } else {
                $erro_login = true;
            }
        } else {
            $erro_login = true;
        }

        $stmt->close();
    } else {
        $erro_login = true;
    }
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>2N Finanças</title>
    <link rel="stylesheet" href="assets/CSS/styles.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
</head>

<body class="containerBody">
    <div class="container">
        <?php 
         if (isset($_POST["email"]) && isset($_POST["senha"])) {
            if ($erro_email && $erro_senha) {
                echo '<div class="alert alert-danger" role="alert">Insira seu e-mail e senha.</div>';
            } elseif ($erro_email) {
                echo '<div class="alert alert-danger" role="alert">Insira seu e-mail.</div>';
            } elseif ($erro_senha) {
                echo '<div class="alert alert-danger" role="alert">Insira sua senha.</div>';
            } elseif ($erro_login) {
                echo '<div class="alert alert-danger" role="alert">E-mail ou senha incorretos! Tente novamente ou tente registrar-se.</div>';
            }
        }
        ?>
        <form action="" method="POST">
            <div class="form-container">
                <h1>Entre em sua conta!</h1>
                <p>
                    <label for="email">E-mail</label>
                    <input type="email" id="email" name="email" placeholder="Digite seu e-mail." required>
                </p>
                <p>
                    <label for="senha">Senha</label>
                    <input type="password" id="senha" name="senha" placeholder="Digite sua senha." required>
                </p>
                <button class="button" type="submit">Entrar</button>
                <br>
                <a href="#">Esqueceu sua senha?</a>
            </div>
            <div class="image-container"></div>
        </form>
        <a class="btn btn-outline-light rounded-pill" href="php/cadastro.php" role="button">Novo no site? Registre-se<a>
        </div>
</body>
<script>
    document.addEventListener("DOMContentLoaded", function() {
        const button = document.querySelector(".button");
        button.classList.add("show");
    });
</script>

</html>
