let transacoes = [];
let poupanca = 0;
let chart;

window.onload = function () {
    atualizarGrafico();
};

function alterarTipoTransacao() {
    const tipoSelecionado = document.getElementById('tipo').value;
    const divDescricao = document.querySelector('.addTransacao .descricaoDiv');

    if (tipoSelecionado === 'retirarPoupanca' || tipoSelecionado === 'adicionarPoupanca') {
        divDescricao.style.display = 'none';
    } else {
        divDescricao.style.display = 'block';
    }
}

function exibirMensagemTemporaria(mensagem, tempo) {
    const confirmacaoHelp = document.getElementById("confirmacaoHelp");
    confirmacaoHelp.textContent = mensagem;

    setTimeout(function () {
        confirmacaoHelp.textContent = '';
    }, tempo);
}

function adicionarTransacao() {
    const descricao = document.getElementById('descricao').value.trim();
    const valorInput = document.getElementById('valor').value;
    const valor = parseFloat(valorInput.replace(',', '.'));
    const tipo = document.getElementById('tipo').value;

    document.getElementById('descricaoHelp').textContent = '';
    document.getElementById('valorHelp').textContent = '';
    document.getElementById('poupancaHelp').textContent = '';

    let camposVazios = 0;

    if (descricao === '' && tipo !== 'retirarPoupanca' && tipo !== 'adicionarPoupanca') {
        document.getElementById('descricaoHelp').textContent = 'Necessário adicionar uma descrição a sua transação';
        camposVazios++;
    }

    if (isNaN(valor) || valor <= 0) {
        if (tipo === 'retirarPoupanca' || tipo === 'adicionarPoupanca') {
            document.getElementById('poupancaHelp').textContent = 'Necessário adicionar um valor válido a sua transação';
        } else {
            document.getElementById('valorHelp').textContent = 'Necessário adicionar um valor válido a sua transação';
        }
        camposVazios++;
    }

    if (tipo === 'adicionarPoupanca' || tipo === 'retirarPoupanca') {
        if (camposVazios > 0) {
            return;
        }
        if (tipo === 'adicionarPoupanca') {
            adicionarPoupanca(valor);
        } else if (tipo === 'retirarPoupanca') {
            if (valor > poupanca) {
                document.getElementById('poupancaHelp').textContent = 'Você não tem saldo suficiente na poupança.';
                return;
            }
            retirarPoupanca(valor);
        }
        const transacao = {
            descricao: tipo === 'adicionarPoupanca' ? 'Adicionado à poupança' : 'Retirado da poupança',
            valor: valor,
            tipo: tipo
        };
        transacoes.push(transacao);
        atualizarSaldo();
        atualizarHistorico();
        atualizarGrafico();
        document.getElementById('descricao').value = '';
        document.getElementById('valor').value = '';
        
        exibirMensagemTemporaria("Sua transação foi adicionada", 5000);

        return;
    }

    if (camposVazios > 0) {
        return;
    }

    if (tipo === 'despesa') {
        const saldoReceitas = transacoes.filter(transacao => transacao.tipo === 'receita').reduce((acc, transacao) => acc + transacao.valor, 0);
        const saldoDespesas = transacoes.filter(transacao => transacao.tipo === 'despesa').reduce((acc, transacao) => acc + transacao.valor, 0);
        const saldoTotal = saldoReceitas - saldoDespesas + poupanca;

        if (valor > saldoCaixa) {
            document.getElementById('valorHelp').textContent = 'A despesa excede o saldo disponível.';
            return;
        }
    }

    const transacao = {
        descricao: descricao.substring(0, 30),
        valor: valor,
        tipo: tipo
    };

    transacoes.push(transacao);

    atualizarSaldo();
    atualizarHistorico();
    atualizarGrafico();

    document.getElementById('descricao').value = '';
    document.getElementById('valor').value = '';
    
    exibirMensagemTemporaria("Sua transação foi adicionada", 5000);
}

function adicionarPoupanca(valor) {
    poupanca += valor;
    if (poupanca < 0) {
        poupanca = 0;
    }
    atualizarSaldo();
}

function retirarPoupanca(valor) {
    poupanca -= valor;
    if (poupanca < 0) {
        poupanca = 0;
    }
    atualizarSaldo();
}

function atualizarSaldo() {
    let saldoReceitas = 0;
    let saldoDespesas = 0;
    for (let transacao of transacoes) {
        if (transacao.tipo === 'receita') {
            saldoReceitas += transacao.valor;
        } else if (transacao.tipo === 'despesa') {
            saldoDespesas += transacao.valor;
        }
    }
    const saldoTotal = saldoReceitas - saldoDespesas + poupanca;
    const saldoCaixa = saldoReceitas - saldoDespesas

    if (saldoCensurado) {
        document.getElementById('saldoTotal').textContent = "****"
        document.getElementById('saldoCaixa').textContent = "****"
        document.getElementById('poupanca').textContent = "****"
    } else {
        document.getElementById('saldoTotal').textContent = formatarNumero(saldoTotal)
        document.getElementById('saldoCaixa').textContent = formatarNumero(saldoCaixa)
        document.getElementById('poupanca').textContent = formatarNumero(poupanca)
    }
}

function formatarNumero(numero) {
    return new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(numero);
}

function atualizarHistorico() {
    const historicoElemento = document.getElementById('historico');
    historicoElemento.innerHTML = '';

    for (let i = transacoes.length - 1; i >= 0; i--) {
        const transacao = transacoes[i];
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item', 'transacao');

        const titulo = document.createElement('strong');
        titulo.style.fontSize = '1.1rem';

        if (transacao.tipo === 'despesa') {
            titulo.textContent = `Despesa registrada - ${formatarData(hoje)}`;
        } else if (transacao.tipo === 'receita') {
            titulo.textContent = `Entrada registrada - ${formatarData(hoje)}`;
        } else if (transacao.tipo === 'adicionarPoupanca') {
            titulo.textContent = `Adicionado à poupança - ${formatarData(hoje)}`;
        } else if (transacao.tipo === 'retirarPoupanca') {
            titulo.textContent = `Retirado da poupança - ${formatarData(hoje)}`;
        }

        listItem.appendChild(titulo);

        const descricao = document.createElement('div');
        descricao.style.fontSize = '1.08rem';
        
        if (transacao.tipo === 'despesa' || transacao.tipo === 'receita') {
            descricao.textContent = transacao.descricao;
            listItem.appendChild(descricao);
        }

        if (transacao.tipo === 'despesa' || transacao.tipo === 'retirarPoupanca') {
            const valor = document.createElement('div');
            valor.textContent = '- ' + formatarNumero(transacao.valor);
            listItem.appendChild(valor);
            historicoElemento.appendChild(listItem);
        } else {
            const valor = document.createElement('div');
            valor.textContent = '+ ' + formatarNumero(transacao.valor);
            listItem.appendChild(valor);
            historicoElemento.appendChild(listItem);
        }
    }
}

function atualizarGrafico() {
    const ctx = document.getElementById('graficoGastos').getContext('2d');

    const entradas = transacoes.filter(transacao => transacao.tipo === 'receita');
    const saidas = transacoes.filter(transacao => transacao.tipo === 'despesa');

    const labels = ['Entradas', 'Saídas', 'Poupança'];
    const data = [
        entradas.reduce((acc, transacao) => acc + transacao.valor, 0),
        saidas.reduce((acc, transacao) => acc + transacao.valor, 0),
        poupanca
    ];

    if (chart) {
        chart.data.labels = labels;
        chart.data.datasets[0].data = data;
        chart.update();
    } else {
        chart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Valor',
                    data: data,
                    backgroundColor: ['#76d341', '#f03d3d', '#418cd3'],
                    borderRadius: 2,
                    borderWidth: 0
                }]
            },
            options: {
                scales: {
                    x: {
                        display: false,
                        beginAtZero: true
                    }
                },
                plugins: {
                    legend: {
                        display: false,
                        labels: {
                            color: 'white'
                        }
                    }
                }
            }
        });
    }

}
let saldoCensurado = false
let iSaldoTotal = 0;
const saldoTotalElemento = document.getElementById('saldoTotal');
const saldoCaixaElemento = document.getElementById('saldoCaixa');
const poupancaElemento = document.getElementById('poupanca');

function esconderDinheiroTotal() {
    imgBlind = document.getElementById('imgBlind')
    saldoCensurado = !saldoCensurado
    if (iSaldoTotal % 2 === 0) {
        saldoTotalElemento.textContent = "****";
        saldoCaixaElemento.textContent = "****";
        poupancaElemento.textContent = "****";
        imgBlind.src = "../assets/Icones BootStrap/eye-slash.svg"
    } else {
        atualizarSaldo()
        imgBlind.src = "../assets/Icones BootStrap/eye.svg"
    }
    iSaldoTotal++;
}

document.addEventListener("DOMContentLoaded", function () {
    var inputs = document.querySelectorAll('input[type="text"]');

    inputs.forEach(function (input) {
        input.addEventListener("click", function () {
            if (this.placeholder !== '') {
                this.dataset.placeholder = this.placeholder;
                this.placeholder = '';
            }
        });

        input.addEventListener("blur", function () {
            if (this.placeholder === '') {
                this.placeholder = this.dataset.placeholder;
            }
        });
    });
});

function realizarSalto(elemento) {
    elemento.classList.add('salto');
}

function pararSalto(elemento) {
    elemento.classList.remove('salto');
}

document.addEventListener('DOMContentLoaded', function () {
    var divsSaldos = document.querySelectorAll('.div-saldos');

    divsSaldos.forEach(function (div) {
        div.addEventListener('mouseover', function () {
            realizarSalto(this);
        });

        div.addEventListener('mouseout', function () {
            pararSalto(this);
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const divisions = document.querySelectorAll(".division");
    const button1 = document.querySelectorAll(".button");
    const button2 = document.querySelectorAll(".btnBlind");

    divisions.forEach((division) => division.classList.add("show"));
    button1.forEach((button1) => button1.classList.add("show"));
    button2.forEach((button2) => button2.classList.add("show"));
});


function formatarData(data) {
    let dia = data.getDate()
    let mes = data.getMonth() + 1
    let ano = data.getFullYear()
    dia = dia < 10 ? '0' + dia : dia
    mes = mes < 10 ? '0' + mes : mes

    return `${dia}/${mes}/${ano}`
}
const hoje = new Date()
formatarData(hoje)

function checarNumero(input) {
    const valor = input.value;
    let contemApenasNumeros = true;

    for (let i = 0; i < valor.length; i++) {
        const char = valor.charAt(i);
        if (!(char >= '0' && char <= '9') && char !== '.' && char !== ',') {
            contemApenasNumeros = false;
            break;
        }
    }

    if (!contemApenasNumeros) {
        document.getElementById("valorHelp").textContent = "Só são aceitos números";
    } else {
        document.getElementById("valorHelp").textContent = "";
    }
}

