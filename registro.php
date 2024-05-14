<?php
include("conexao.php");

if (isset($_POST["nome"]) && isset($_POST["email"]) && isset($_POST["senha"])) {

    $nome = $mysqli->real_escape_string($_POST["nome"]);
    $email = $mysqli->real_escape_string($_POST["email"]);
    $senha = $mysqli->real_escape_string($_POST["senha"]);

    $senha_hash = password_hash($senha, PASSWORD_DEFAULT);

    $sql_check_email = "SELECT * FROM users WHERE email = '$email'";
    $check_email = $mysqli->query($sql_check_email);

    if ($check_email->num_rows > 0) {
        echo "<div class='alert alert-danger' role='alert'>Este e-mail já está cadastrado. Por favor, utilize outro.</div>";
    } else {
        $sql_insert_user = "INSERT INTO users (nome, email, senha) VALUES ('$nome', '$email', '$senha_hash')";
        if ($mysqli->query($sql_insert_user)) {
            echo "<div class='alert alert-success' role='alert'>Registro realizado com sucesso! Você será redirecionado para a página de login em alguns segundos.</div>";
            echo "<script>
                    setTimeout(function() {
                        window.location.href = 'index.php';
                    }, 6000);
                  </script>";
        } else {
            echo "<div class='alert alert-danger' role='alert'>Erro ao registrar usuário: " . $mysqli->error . "</div>";
        }
    }
}
?>
<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>2n - Sistema Bancário</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="styles.css">
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }

        .container {
            width: 100%;
            max-width: 400px;
            margin: 50px auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        }

        h1 {
            text-align: center;
            margin-bottom: 20px;
            color: #333;
        }

        form {
            text-align: center;
        }

        label {
            display: block;
            margin-bottom: 10px;
        }

        input {
            width: 100%;
            padding: 10px;
            margin-bottom: 20px;
            border: 1px solid #ccc;
            border-radius: 5px;
            box-sizing: border-box;
        }

        button {
            padding: 10px 20px;
            background-color: #007bff;
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
        }

        button:hover {
            background-color: #0056b3;
        }
    </style>
</head>

<body>
    <form action="registro.php" method="POST">
        <div class="container">
            <h1>Registro - 2N Finanças</h1>
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
            <button type="submit">Registrar</button>
        </div>
    </form>
</body>

</html>
