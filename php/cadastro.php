<?php
include("conexao.php");

if (isset($_POST["nome"]) && isset($_POST["email"]) && isset($_POST["senha"])) {

    $nome = $mysqli->real_escape_string($_POST["nome"]);
    $email = $mysqli->real_escape_string($_POST["email"]);
    $senha = $mysqli->real_escape_string($_POST["senha"]);

    $senha_hash = password_hash($senha, PASSWORD_DEFAULT);

    $sql_check_email = "SELECT * FROM users WHERE email = '$email'";
    $check_email = $mysqli->query($sql_check_email); //query que irá verificar se o email já está cadastro 

    if ($check_email->num_rows > 0) {
        echo "<div class='alert alert-danger alert-dismissible fade show' role='alert'>Este e-mail já está cadastrado. Por favor, utilize outro.
                <button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>
              </div>";
    } else {
        $sql_insert_user = "INSERT INTO users (nome, email, senha) VALUES ('$nome', '$email', '$senha_hash')"; //query que irá cadastrar o usuário
        if ($mysqli->query($sql_insert_user)) {
            echo "<div class='alert alert-success alert-dismissible fade show' role='alert'>Registro realizado com sucesso! Você será redirecionado para a página de login em alguns segundos.
                    <button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>
                  </div>";
            echo "<script>
                    setTimeout(function() {
                        window.location.href = '../index.php';
                    }, 5000);
                  </script>";
        } else {
            echo "<div class='alert alert-danger alert-dismissible fade show' role='alert'>Erro ao registrar usuário: " . $mysqli->error . "
                    <button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>
                  </div>";
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
    <link rel="stylesheet" href="../assets/CSS/styles.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
</head>

<body class="containerBody">
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
                <br>
                <a class="linka" href="../index.php">Voltar para a página de login.</a>
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