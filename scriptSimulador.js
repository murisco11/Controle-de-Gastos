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
    if (isNaN(dinheiroAlmejado) || isNaN(dinheiroInicial) || isNaN(dinheiroMes) || isNaN(porcentagem)) {
        alert("Preencha todos os campos!");
    } else if (dinheiroInicial >= dinheiroAlmejado) {
        alert("O dinheiro inicial não pode ser maior que o dinheiro almejado!");
    } else if (dinheiroInicial < 0 || dinheiroAlmejado < 0 || porcentagem < 0 || dinheiroMes < 0) {
        alert("Não pode ter número negativo");
    } else {
        divResultado.innerHTML = formatarTempo(tempoNecessario, dinheiroAlmejado);
    }
    return dinheiroAlmejado;
}

function formatarTempo(tempoNecessario, dinheiroAlmejado) {
    const meses = tempoNecessario % 12;
    const anos = Math.floor(tempoNecessario / 12);
    if (meses === 0) {
        return `Você vai alcançar ${formatarNumero(dinheiroAlmejado)} em ${anos} anos`;
    } else if (anos === 0) {
        return `Você vai alcançar ${formatarNumero(dinheiroAlmejado)} em ${meses} meses`;
    } else {
        return `Você vai alcançar ${formatarNumero(dinheiroAlmejado)} em ${anos} anos e ${meses} meses`;
    }
}