document.addEventListener("DOMContentLoaded", function () {
    const division1s = document.querySelectorAll(".division1");
    const buttonConfirm = document.getElementById("buttonConfirm");

    setTimeout(function () {
        division1s.forEach(function (division1) {
            division1.classList.add("show");
        });
        buttonConfirm.classList.add("show");
    }, 1000);
});


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

const button = document.getElementById("buttonConfirm").addEventListener("click", clicouConfirm);
const divResultado = document.getElementById("resultado");

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
        resultadoHelp.textContent = "O dinheiro inicial precisa ser maior que o dinheiro almejado!";
    } else if (dinheiroInicial < 0 || dinheiroAlmejado < 0 || porcentagem < 0 || dinheiroMes < 0) {
        resultadoHelp.textContent = "Não pode ter número negativo";
    } else {
        resultado.textContent = formatarTempo(tempoNecessario, dinheiroAlmejado);
        resultadoHelp.textContent = ""
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

document.addEventListener("DOMContentLoaded", function () {
    const divisions = document.querySelectorAll(".division");

    divisions.forEach(function (division) {
        division.classList.add("show");
    });

    const buttonConfirm = document.getElementById("buttonConfirm");
    buttonConfirm.classList.add("show");
});
