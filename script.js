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
        return;
    }

    if (camposVazios > 0) {
        return;
    }

    if (tipo === 'despesa') {
        const saldoReceitas = transacoes.filter(transacao => transacao.tipo === 'receita').reduce((acc, transacao) => acc + transacao.valor, 0);
        const saldoDespesas = transacoes.filter(transacao => transacao.tipo === 'despesa').reduce((acc, transacao) => acc + transacao.valor, 0);
        const saldoTotal = saldoReceitas - saldoDespesas + poupanca;

        if (valor > saldoTotal) {
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
    const historicoElemento = document.getElementById('historico')
    historicoElemento.innerHTML = ''

    transacoes.forEach(transacao => {
        const listItem = document.createElement('li')
        listItem.classList.add('list-group-item', 'transacao')
        const titulo = document.createElement('strong')
        titulo.style.fontSize = '1.1rem'
        if (transacao.tipo === 'despesa') {
            titulo.textContent = 'Despesa registrada'
        } else if (transacao.tipo === 'receita') {
            titulo.textContent = 'Entrada registrada'
        } else if (transacao.tipo === 'adicionarPoupanca') {
            titulo.textContent = 'Adicionado à poupança'
        } else if (transacao.tipo === 'retirarPoupanca') {
            titulo.textContent = 'Retirado da poupança'
        }
        listItem.appendChild(titulo);


        const descricao = document.createElement('div')
        descricao.style.fontSize = '1.08rem'
        if (transacao.tipo === 'despesa' || transacao.tipo === 'receita') {
            descricao.textContent = transacao.descricao
            listItem.appendChild(descricao)
        }


        if (transacao.tipo === 'despesa' || transacao.tipo === 'retirarPoupanca') {
            const valor = document.createElement('div')

            valor.textContent = '- ' + formatarNumero(transacao.valor)
            listItem.appendChild(valor)
            historicoElemento.appendChild(listItem)
        } else {
            const valor = document.createElement('div')
            valor.textContent = '+ ' + formatarNumero(transacao.valor)
            listItem.appendChild(valor)
            historicoElemento.appendChild(listItem)
        }
    });
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
        imgBlind.src = "estilo/Icones BootStrap/eye-slash.svg"
    } else {
        atualizarSaldo()
        imgBlind.src = "estilo/Icones BootStrap/eye.svg"
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
    const buttons = document.querySelectorAll(".button");

    divisions.forEach((division) => division.classList.add("show"));
    buttons.forEach((button) => button.classList.add("show"));
});
