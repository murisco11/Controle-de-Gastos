<?php
session_start();
if (!isset($_SESSION['id'])) {
    header("Location: ../index.php");
    exit();
}
include ('./config/conexao.php')
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="../assets/CSS/styles.css">
  <title>2N Finanças</title>
  <link rel="icon" href="../assets/images/favicon.png" type="image/x-icon" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/typed.js/2.0.12/typed.min.js"></script>
</head>

<body>
  <div>
    <div class="card">
      <h1>Bem-vindo ao <span class="animacao" id="efeito_TypeWritter"></span></h1>
      <div class="card-text">Gerencie suas finanças de forma eficaz em uma plataforma intuitiva. Acompanhe transações,
        categorize gastos e analise com gráficos detalhados para tomar decisões seguras e alcançar suas metas
        financeiras com confiança</div>
      <a href="simulador.php" class="button button-acess">Simulador de investimentos</a>
      <a href="controlefinanceiro.php" class="button button-acess">Controle Financeiro</a>
      <a href="logout.php" class="button button-acess">Sair</a>
    </div>
  </div>
  <footer>
    <span>© 2N Finanças. Todos os direitos reservados. Feito por Brunno Oliveira <a
        href="https://www.instagram.com/oliv.brunno/" style="color: white;">@oliv.brunno</a> e Maurício Pires <a
        href="https://www.instagram.com/murisxco/" style="color: white;">@murisxco</a></span>
  </footer>
  <script>
    var typed = new Typed('#efeito_TypeWritter', {
      strings: ['2N Finanças, <?php echo ($_SESSION['nome']); ?>!'],
      typeSpeed: 95,
    });

    document.addEventListener("DOMContentLoaded", function () {
    var button = document.querySelectorAll(".button");
    const card = document.querySelectorAll(".card");
    setTimeout(function () {
        card.forEach(function (card) {
            card.classList.add("show");
        })
    });

    setTimeout(function () {
        button.forEach(function (button) {
            button.classList.add("show");

        })
    });
});
  </script>
</body>

</html>
