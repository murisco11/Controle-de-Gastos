<?php 
session_start();
include ('./php/conexao.php');
$erro_email = false; 
$erro_senha = false; 
$erro_login = false; 

if (isset($_POST["email"]) && isset($_POST["senha"])) {

    if (strlen($_POST["email"]) == 0) {
        $erro_email = true; 
    }

    if (strlen($_POST["senha"]) == 0) {
        $erro_senha = true; 
    }

    if (!$erro_email && !$erro_senha) {
        $email = $mysqli->real_escape_string($_POST["email"]);
        $senha = $_POST["senha"];

        $sql_code = "SELECT * FROM users WHERE email = '$email'";
        $sql_query = $mysqli->query($sql_code) or die('Falha na conexão do código SQL: ' . $mysqli->error);

        $quantidade = $sql_query->num_rows;

        if ($quantidade > 0) {
            $usuario = $sql_query->fetch_assoc();

            if (password_verify($senha, $usuario['senha'])) {
                $_SESSION['id'] = $usuario['id'];
                $_SESSION['nome'] = $usuario['nome'];
                header("Location: ./php/initialpage.html"); //nome=" . $usuario['nome']
                exit();
            } else {
                $erro_login = true; 
            }
        } else {
            $erro_login = true; 
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>2N Finanças</title>
    <link rel="stylesheet" href="./assets/CSS/styles.css">
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
        <a class="btn btn-outline-light rounded-pill" href="./php/cadastro.php" role="button">Novo no site? Registre-se<a>
        </div>
</body>
<script>
    document.addEventListener("DOMContentLoaded", function() {
        const button = document.querySelector(".button");
        button.classList.add("show");
    });
</script>

</html>