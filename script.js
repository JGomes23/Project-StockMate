const form = document.getElementById('formProduto');
const tabelaProdutos = document.getElementById('tabelaProdutos');
const totalProdutos = document.getElementById('totalProdutos');
const totalLucro = document.getElementById('totalLucro');

let produtos = [];

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const nome = document.getElementById('nome').value;
  const precoCompra = parseFloat(document.getElementById('precoCompra').value);
  const precoVenda = parseFloat(document.getElementById('precoVenda').value);
  const quantidadeProduto = parseInt(document.getElementById('quantidadeProduto').value);

  const produto = {
    nome,
    precoCompra,
    precoVenda,
    quantidadeProduto
  };

  produtos.push(produto);
  adicionarProdutoNaTabela(produto);
  atualizarTotais();
  limparFormulario();
});

function adicionarProdutoNaTabela(produto) {
  const row = tabelaProdutos.insertRow();

  const nomeCell = row.insertCell(0);
  nomeCell.innerHTML = produto.nome;

  const precoCompraCell = row.insertCell(1);
  precoCompraCell.innerHTML = `R$ ${produto.precoCompra.toFixed(2)}`;

  const precoVendaCell = row.insertCell(2);
  precoVendaCell.innerHTML = `R$ ${produto.precoVenda.toFixed(2)}`;

  const quantidadeCell = row.insertCell(3);
  quantidadeCell.innerHTML = produto.quantidadeProduto;

  const lucroCell = row.insertCell(4);
  const lucro = (produto.precoVenda - produto.precoCompra) * produto.quantidadeProduto;
  lucroCell.innerHTML = `R$ ${lucro.toFixed(2)}`;

  const acoesCell = row.insertCell(5);
  const excluirBtn = document.createElement('button');
  excluirBtn.innerHTML = 'Excluir';
  excluirBtn.addEventListener('click', () => {
    const index = produtos.indexOf(produto);
    produtos.splice(index, 1);
    tabelaProdutos.deleteRow(row.rowIndex - 1);
    atualizarTotais();
  });
  acoesCell.appendChild(excluirBtn);
}

function atualizarTotais() {
  let totalProdutosValue = 0;
  let totalComprasValue = 0;
  let totalVendasValue = 0;

  for (let i = 0; i < produtos.length; i++) {
    totalProdutosValue += produtos[i].quantidadeProduto;
    totalComprasValue += produtos[i].precoCompra * produtos[i].quantidadeProduto;
    totalVendasValue += produtos[i].precoVenda * produtos[i].quantidadeProduto;
  }

  const totalLucroValue = totalVendasValue - totalComprasValue;
  totalProdutos.innerHTML = totalProdutosValue;

  if (totalLucroValue < 0) {
    totalLucro.innerHTML = `<span style="color: red;">Total de Prejuízo: R$ ${Math.abs(totalLucroValue).toFixed(2)}</span>`;
  } else {
    totalLucro.innerHTML = `Total de lucro: R$ ${totalLucroValue.toFixed(2)}`;
  }
}



function limparFormulario() {
  document.getElementById('nome').value = '';
  document.getElementById('precoCompra').value = '';
  document.getElementById('precoVenda').value = '';
  document.getElementById('quantidadeProduto').value = '';
  document.getElementById('nome').focus();
}
