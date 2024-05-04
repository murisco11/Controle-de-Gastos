let transacoes = [];
let poupanca = 0;
let chart;

window.onload = function () {
    atualizarGrafico();
};

function adicionarTransacao() {
    const descricao = document.getElementById('descricao').value.trim();
    const valor = parseFloat(document.getElementById('valor').value);
    const tipo = document.getElementById('tipo').value;

    document.getElementById('descricaoHelp').textContent = '';
    document.getElementById('valorHelp').textContent = '';
    document.getElementById('poupancaHelp').textContent = '';

    let camposVazios = 0;

    if (descricao === '') {
        document.getElementById('descricaoHelp').textContent = 'Necessário adicionar uma descrição a sua transação';
        camposVazios++;
    }

    if (isNaN(valor) || valor <= 0) {
        document.getElementById('valorHelp').textContent = 'Necessário adicionar um valor válido a sua transação';
        camposVazios++;
    }

    if (tipo === 'adicionarPoupanca' || tipo === 'retirarPoupanca') {
    } else {

        const mes = (new Date()).getMonth() + 1;
        const ano = (new Date()).getFullYear();
    }

    if (camposVazios > 0) {
        return;
    }

    const transacao = {
        descricao: descricao.substring(0, 30),
        valor: valor,
        tipo: tipo
    };

    if (tipo === 'adicionarPoupanca') {
        adicionarPoupanca(valor);
        transacao.descricao = 'Adicionado à poupança';
    } else if (tipo === 'retirarPoupanca') {
        if (valor > poupanca) {
            document.getElementById('poupancaHelp').textContent = 'Você não tem saldo suficiente na poupança.';
            return;
        }
        retirarPoupanca(valor);
        transacao.descricao = 'Retirado da poupança';
    }

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
    const saldoCaixa = saldoReceitas - saldoDespesas;
    document.getElementById('saldoTotal').textContent = `${formatarNumero(saldoTotal)}`;
    document.getElementById('saldoCaixa').textContent = `${formatarNumero(saldoCaixa)}`;
    document.getElementById('poupanca').textContent = `${formatarNumero(poupanca)}`;
}

function formatarNumero(numero) {
    return new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(numero);
}

function atualizarHistorico() {
    const historicoElemento = document.getElementById('historico');
    historicoElemento.innerHTML = '';
    transacoes.forEach(transacao => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        let descricao = transacao.descricao;
        if (transacao.tipo === 'adicionarPoupanca') {
            descricao = 'Adicionado à poupança';
        } else if (transacao.tipo === 'retirarPoupanca') {
            descricao = 'Retirado da poupança';
        }
        listItem.textContent = `${transacao.descricao}: ${formatarNumero(transacao.valor)}`;
        historicoElemento.appendChild(listItem);
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
                    borderRadius: 2
                }]
            },
            options: {
                scales: {
                    x: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

}

let iSaldoTotal = 0;
const saldoTotalElemento = document.getElementById('saldoTotal');
const saldoCaixaElemento = document.getElementById('saldoCaixa');
const poupancaElemento = document.getElementById('poupanca');

function esconderDinheiroTotal() {
    if (iSaldoTotal % 2 === 0) {
        saldoTotalElemento.textContent = "****";
        saldoCaixaElemento.textContent = "****";
        poupancaElemento.textContent = "****";
    } else {
        atualizarSaldo()
    }
    iSaldoTotal++;
}

document.addEventListener("DOMContentLoaded", function() {
    var inputs = document.querySelectorAll('input[type="text"]');
    
    inputs.forEach(function(input) {
        input.addEventListener("click", function() {
            if (this.placeholder !== '') {
                this.dataset.placeholder = this.placeholder;
                this.placeholder = '';
            }
        });

        input.addEventListener("blur", function() {
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
  
  document.addEventListener('DOMContentLoaded', function() {
    var divsSaldos = document.querySelectorAll('.div-saldos');
    
    divsSaldos.forEach(function(div) {
      div.addEventListener('mouseover', function() {
        realizarSalto(this);
      });
      
      div.addEventListener('mouseout', function() {
        pararSalto(this);
      });
    });
  });
  