# 2N Finanças

O 2N Finanças foi um projeto visando a criação de uma ferramenta para gerenciamento financeiro pessoal que fiz em conjunto com meu amigo da faculdade Maurício que teve um papel crucial no front-end, onde trabalhamos juntos na criação de funções da página inicial, do controle financeiro e do simulador. Fiquei responsável pela parte do back-end e também pela estilização das páginas de login e cadastro.

## Índice

- [Funcionalidades](#funcionalidades)
- [Stacks](#tecnologiasbibliotecasframeworks-utilizados)
- [Como testar?](#como-usar)
- [Contato](#autores)


## Funcionalidades

- Adição de transações relacionadas a entradas e saídas de seu dinheiro, para que você possa ter um controle financeiro acerca de seus gastos
- Adição e retirada de valores da "poupança", para que assim você tenha um controle, também, do seu dinheiro investido
- Visualização do histórico de transações
- Exibição de gráfico de receitas, despesas e poupança
- Através do simulador, calcule quanto tempo você precisa investir para atingir um valor desejado

## Tecnologias/Bibliotecas/Frameworks Utilizados

- HTML;
- CSS;
- BootStrap;
- JavaScript;
- Chart.js (para criação do gráfico);
- PHP;
- MySql;
- Fetch API.

## Como usar?

Devido a não ter encontrando uma hospedagem gratuita de qualidade, preferi deixar aqui o repositório para que possam testar.

Você precisará ter um pacote de servidor local (wamp, xampp, laragon).

Em seu bash (ou terminal de sua preferência) execute `git clone https://github.com/BrunnoFOS/Controle-de-Gastos`
Após isso, basta utilizar um sistema de administração de banco de dados (PHPMyAdmin no caso dos 3 que citei) e executar os comandos sql que deixei em `db/2nFinancas.sql`.
Depois disso, basta alterar os dados de conexao no arquivo de config `conexao.php` e executar no localhost.
Pelo PHPMyAdmin ou por consultas no workbench do MySql você consegue acompanhar a interação entre o front e back end através de requisições

Ou você pode verificar esse vídeo de demonstração da aplicação no meu linkedin: https://www.linkedin.com/posts/brunno-ferreira-os_boa-noite-pessoal-gostaria-de-compartilhar-activity-7216624528372727809-K7CB?utm_source=share&utm_medium=member_desktop

## Autores

Este projeto foi desenvolvido por [BrunnoFOS](https://github.com/BrunnoFOS) e [murisco11] (https://github.com/murisco11).
