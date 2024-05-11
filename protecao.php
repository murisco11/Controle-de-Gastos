<?php 
if(!isset($_SESSION)){
    session_start();
}

if(!isset($_SESSION["ID"])){
    die("Você NÃO fez login. <p><a href=\"index.php\">Fazer login</a></p>");
}
?>
