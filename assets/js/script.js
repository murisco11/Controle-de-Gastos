// Função para checar se o valor inserido é um número válido
function checarNumero(event) {
    const input = event.target;
    const valor = input.value;
    if (isNaN(valor) || valor < 0) {
        input.setCustomValidity("Por favor, insira um número válido.");
    } else {
        input.setCustomValidity("");
    }
}

// Adicionando o event listener para checarNumero
document.getElementById('inputValor').addEventListener('input', checarNumero);

let transacoes = [];
let poupanca = 0;
let chart;

window.onload = function () {
    carregarTransacoes();
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
    const descricao = document.getElementById('inputDescricao').value.trim();
    const valorInput = document.getElementById('inputValor').value;
    const valor = parseFloat(valorInput.replace(',', '.'));
    const tipo = document.getElementById('tipo').value;
    const data_transacao = document.getElementById('inputData').value;

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

    if (camposVazios > 0) {
        return;
    }

    const transacao = {
        descricao: descricao,
        valor: valor,
        tipo: tipo,
        data_transacao: data_transacao
    };

    // Adicionando a transação ao banco de dados
    fetch('salvarTransacao.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(transacao)
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            transacoes.push(transacao);
            atualizarSaldo();
            atualizarHistorico();
            atualizarGrafico();

            document.getElementById('inputDescricao').value = '';
            document.getElementById('inputValor').value = '';

            exibirMensagemTemporaria("Sua transação foi adicionada", 5000);
        } else {
            exibirMensagemTemporaria("Erro ao adicionar transação", 5000);
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        exibirMensagemTemporaria("Erro ao adicionar transação", 5000);
    });
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

    if (!Array.isArray(transacoes)) {
        console.error('transacoes não é um array');
        return;
    }

    for (let transacao of transacoes) {
        if (transacao.tipo === 'receita') {
            saldoReceitas += transacao.valor;
        } else if (transacao.tipo === 'despesa') {
            saldoDespesas += transacao.valor;
        }
    }

    const saldoTotal = saldoReceitas - saldoDespesas + poupanca;
    const saldoCaixa = saldoReceitas - saldoDespesas;

    if (saldoCensurado) {
        document.getElementById('saldoTotal').textContent = "****";
        document.getElementById('saldoCaixa').textContent = "****";
        document.getElementById('poupanca').textContent = "****";
    } else {
        document.getElementById('saldoTotal').textContent = formatarNumero(saldoTotal);
        document.getElementById('saldoCaixa').textContent = formatarNumero(saldoCaixa);
        document.getElementById('poupanca').textContent = formatarNumero(poupanca);
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
            titulo.textContent = `Despesa registrada - ${formatarData(new Date(transacao.data_transacao))}`;
        } else if (transacao.tipo === 'receita') {
            titulo.textContent = `Entrada registrada - ${formatarData(new Date(transacao.data_transacao))}`;
        } else if (transacao.tipo === 'adicionarPoupanca') {
            titulo.textContent = `Adicionado à poupança - ${formatarData(new Date(transacao.data_transacao))}`;
        } else if (transacao.tipo === 'retirarPoupanca') {
            titulo.textContent = `Retirado da poupança - ${formatarData(new Date(transacao.data_transacao))}`;
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

let saldoCensurado = false;

document.getElementById('saldoTotal').addEventListener('click', function () {
    saldoCensurado = !saldoCensurado;
    atualizarSaldo();
});

function formatarData(data) {
    const dia = data.getDate().toString().padStart(2, '0');
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
}

function carregarTransacoes() {
    fetch('carregarTransacoes.php')
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                transacoes = data.transacoes.map(transacao => ({
                    ...transacao,
                    valor: parseFloat(transacao.valor)
                }));
                atualizarSaldo();
                atualizarHistorico();
                atualizarGrafico();
            } else {
                console.error('Erro ao carregar transações');
            }
        })
        .catch(error => console.error('Erro:', error));
}
