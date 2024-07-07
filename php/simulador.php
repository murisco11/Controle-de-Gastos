<?php
session_start();
if (!isset($_SESSION['id'])) {
    header("Location: index.php");
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../assets/CSS/styles-simulador.css">
    <link rel="stylesheet" href="../assets/BootStrap/bootstrap.min.css" />
    <link rel="icon" href="../assets/images/favicon.png" type="image/x-icon" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet">
    <title>2N Finanças</title>
</head>

<body>
    <header>
        <nav>
            <div>
                <a style="font-weight: 800; font-size: 1.2em;" href="./controlefinanceiro.php">
                    <img src="../assets/images/arrow.png" alt="Página anterior" width="30" height="25" />
                    Página inicial</a>
            </div>
        </nav>
    </header>
    <div class="container">
        <form>
            <h2>Simule o seu dinheiro do futuro!</h2>
            <div class="container-selinputs">
                <div class="division">
                    <div class="selInputs">
                        <label for="dinheiroInicial">Quanto você já possui?</label>
                        <input type="number" placeholder="0,00" id="dinheiroInicial" name="dinheiroInicial"
                            class="inputs">
                    </div>
                    <div class="selInputs">
                        <label for="dinheiroAlmejado">Qual o valor almejado?</label>
                        <input type="number" id="dinheiroAlmejado" placeholder="2.000,00" name="dinheiroAlmejado"
                            class="inputs">
                    </div>
                </div>
                <div class="division">
                    <div class="selInputs">
                        <label for="dinheiroMes">Investimento por mês:</label>
                        <input type="number" id="dinheiroMes" placeholder="200,00" name="dinheiroMes"
                            class="inputs">
                    </div>
                    <div class="selInputs">
                        <label for="porcentagem">Quanto renderá por ano?</label>
                        <input type="number" id="porcentagem" name="porcentagem" placeholder="12% a.a." class="inputs">
                    </div>
                </div>
            </div>
        </form>
        <div class="container2">
            <button id="buttonConfirm">Simular</button>
            <div id="resultado"></div>
            <small id="resultadoHelp" class="form-text text-danger"></small>
        </div>
    </div>
</body>

<script src="../scripts/scriptSimulador.js"></script>

</html>