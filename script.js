const formProduto = document.getElementById("formProduto");
const tabelaProdutos = document.getElementById("tabelaProdutos");
const totalProdutos = document.getElementById("totalProdutos");
const totalLucro = document.getElementById("totalLucro");

let produtos = [];

function adicionarProduto(event) {
    event.preventDefault();

    const nomeProduto = document.getElementById("nomeProduto").value;
    const custoProduto = parseFloat(document.getElementById("custoProduto").value);
    const precoProduto = parseFloat(document.getElementById("precoProduto").value);
    const quantidadeProduto = parseInt(document.getElementById("quantidadeProduto").value);

    const lucro = (precoProduto - custoProduto) * quantidadeProduto;

    produtos.push({
        nome: nomeProduto,
        custo: custoProduto,
        preco: precoProduto,
        quantidade: quantidadeProduto,
        lucro: lucro
    });

    renderizarTabela();
    atualizarTotais();
}

function renderizarTabela() {
    tabelaProdutos.querySelector("tbody").innerHTML = "";

    produtos.forEach(produto => {
        const lucroFormatado = produto.lucro.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
        const classeLucro = produto.lucro >= 0 ? "" : "negativo";

        const linha = `
            <tr>
                <td>${produto.nome}</td>
                <td>${produto.custo.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</td>
                <td>${produto.preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</td>
                <td>${produto.quantidade}</td>
                <td class="${classeLucro}">${lucroFormatado}</td>
            </tr>
        `;

        tabelaProdutos.querySelector("tbody").insertAdjacentHTML("beforeend", linha);
    });
}

function atualizarTotais() {
    const total = produtos.length;
    const lucroTotal = produtos.reduce((total, produto) => total + produto.lucro, 0);

    totalProdutos.textContent = total;
    totalLucro.textContent = lucroTotal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

    if (lucroTotal >= 0) {
        totalLucro.classList.remove("negativo");
    } else {
        totalLucro.classList.add("negativo");
    }
}

formProduto.addEventListener("submit", adicionarProduto);

    
