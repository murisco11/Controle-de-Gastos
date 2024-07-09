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
                <a style="font-weight: 800; font-size: 1.2em;" href="./paginaInicial.php">
                    <img src="../assets/images/arrow.png" alt="Página anterior" width="30" height="25" />
                    Página anterior</a>
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
                        <input type="number" placeholder="0,00" id="dinheiroInicial" name="dinheiroInicial" class="inputs">
                    </div>
                    <div class="selInputs">
                        <label for="dinheiroAlmejado">Qual o valor almejado?</label>
                        <input type="number" id="dinheiroAlmejado" placeholder="2.000,00" name="dinheiroAlmejado" class="inputs">
                    </div>
                </div>
                <div class="division">
                    <div class="selInputs">
                        <label for="dinheiroMes">Investimento por mês:</label>
                        <input type="number" id="dinheiroMes" placeholder="200,00" name="dinheiroMes" class="inputs">
                    </div>
                    <div class="selInputs">
                        <label for="porcentagem">Quanto renderá por ano?</label>
                        <input type="number" id="porcentagem" name="porcentagem" placeholder="12% a.a." class="inputs">
                    </div>
                </div>
            </div>
        </form>
        <div class="container2">
            <button id="buttonConfirm" class="button">Simular</button>
            <div id="resultado"></div>
            <small id="resultadoHelp" class="form-text text-danger"></small>
        </div>
    </div>
</body>

<script>
function calcularTempo(dinheiroInicial, porcentagem, dinheiroAlmejado, dinheiroMes) {
    const r = porcentagem / 100;
    let t = 0;
    let total = dinheiroInicial;

    while (total < dinheiroAlmejado) {
        total = total * (1 + r / 12) + dinheiroMes;
        t++;
    }

    return t;
}

function formatarNumero(numero) {
    return new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(numero);
}

function clicouConfirm(evento) {
    evento.preventDefault();
    const dinheiroInicial = parseFloat(document.getElementById('dinheiroInicial').value);
    const porcentagem = parseFloat(document.getElementById('porcentagem').value);
    const dinheiroAlmejado = parseFloat(document.getElementById('dinheiroAlmejado').value);
    const dinheiroMes = parseFloat(document.getElementById("dinheiroMes").value);
    const tempoNecessario = calcularTempo(dinheiroInicial, porcentagem, dinheiroAlmejado, dinheiroMes);
    const resultadoHelp = document.getElementById("resultadoHelp");
    const resultado = document.getElementById("resultado");

    if (isNaN(dinheiroAlmejado) || isNaN(dinheiroInicial) || isNaN(dinheiroMes) || isNaN(porcentagem)) {
        resultadoHelp.textContent = "Preencha todos os campos!";
    } else if (dinheiroInicial >= dinheiroAlmejado) {
        resultadoHelp.textContent = "O dinheiro inicial precisa ser menor que o dinheiro almejado!";
    } else if (dinheiroInicial < 0 || dinheiroAlmejado < 0 || porcentagem < 0 || dinheiroMes < 0) {
        resultadoHelp.textContent = "Não pode ter número negativo";
    } else {
        resultado.textContent = formatarTempo(tempoNecessario, dinheiroAlmejado);
        resultadoHelp.textContent = "";
    }
}

function formatarTempo(tempoNecessario, dinheiroAlmejado) {
    const meses = tempoNecessario % 12;
    const anos = Math.floor(tempoNecessario / 12);
    if (meses === 0) {
        if (anos === 1) {
            return `Você vai alcançar ${formatarNumero(dinheiroAlmejado)} em ${anos} ano`;
        } else {
            return `Você vai alcançar ${formatarNumero(dinheiroAlmejado)} em ${anos} anos`;
        }
    } else if (anos === 0) {
        if (meses === 1) {
            return `Você vai alcançar ${formatarNumero(dinheiroAlmejado)} em ${meses} mês`;
        } else {
            return `Você vai alcançar ${formatarNumero(dinheiroAlmejado)} em ${meses} meses`;
        }
    } else {
        if (anos === 1) {
            if (meses === 1) {
                return `Você vai alcançar ${formatarNumero(dinheiroAlmejado)} em ${anos} ano e ${meses} mês`;
            } else {
                return `Você vai alcançar ${formatarNumero(dinheiroAlmejado)} em ${anos} ano e ${meses} meses`;
            }
        }
        else {
            if (meses === 1) {
                return `Você vai alcançar ${formatarNumero(dinheiroAlmejado)} em ${anos} anos e ${meses} mês`;
            } else {
                return `Você vai alcançar ${formatarNumero(dinheiroAlmejado)} em ${anos} anos e ${meses} meses`;
            }
        }
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const divisions = document.querySelectorAll(".division");
    const buttonConfirm = document.getElementById("buttonConfirm");

    divisions.forEach(function(division) {
        division.classList.add("show");
    });

    buttonConfirm.classList.add("show");
    buttonConfirm.addEventListener("click", clicouConfirm);
});
</script>

</html>
