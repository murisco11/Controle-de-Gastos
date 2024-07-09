<?php 
var_dump('Mensagem de console somente para não ficar com .hack no GitHub, kkkkkkk')
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
      <div class="card-text">Ainda não está disponível a ferramenta de redefinição automática, mas você pode entrar comigo e eu formatarei sua senha!</div>
      <a href="https://wa.me/message/CS6UE7WLLNIZD1" class="button button-acess">Entrar em contato</a>
      <a href="../index.php" class="button button-acess">Voltar a página anterior</a>
    </div>
  </div>
  <script>
    var typed = new Typed('#efeito_TypeWritter', {
      strings: ['2N Finanças!'],
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
