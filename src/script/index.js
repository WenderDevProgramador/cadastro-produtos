import '../style/index.css'

const salvar = document.getElementById('adicionar');
const cancelar = document.getElementById('deletar');

class Produto {
    constructor() {
        this.id = 1;
        this.arrayProdutos = JSON.parse(localStorage.getItem('produtos')) || [];
        this.editId = null;
        this.id = this.arrayProdutos.length > 0 ? Math.max(...this.arrayProdutos.map(p => p.id)) + 1 : 1;
        this.listaTabela();
    }

    salvar() {
        let produto = this.lerDados();

        if (this.validaCampo(produto)) {
            if (this.editId == null) {
                this.adicionar(produto);
            } else {
                this.atualizar(this.editId, produto);
            }
            this.atualizarLocalStorage();
            this.listaTabela();
            this.cancelar();
        }
    }

    listaTabela() {
        let tbody = document.getElementById('tbody');
        tbody.innerHTML = '';

        let totalProdutos = this.arrayProdutos.length;
        let totalItens = 0;
        let somaPreco = 0;

        for (let i = 0; i < this.arrayProdutos.length; i++) {
            let tr = tbody.insertRow();

            let td_id = tr.insertCell();
            let td_produto = tr.insertCell();
            let td_preco = tr.insertCell();
            let td_quantidade = tr.insertCell();
            let td_acoes = tr.insertCell();

            td_id.innerText = this.arrayProdutos[i].id;
            td_produto.innerText = this.arrayProdutos[i].nomeProduto;
            td_preco.innerText = this.arrayProdutos[i].preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            td_quantidade.innerText = this.arrayProdutos[i].quantidade;

            td_id.classList.add('center');
            td_quantidade.classList.add('center');

            let imgEdit = document.createElement('img');
            imgEdit.src = 'img/escrever.png';
            imgEdit.onclick = () => this.preparaEdicao(this.arrayProdutos[i]);
            /*imgEdit.setAttribute('onclick', 'produto.preparaEdicao(' + JSON.stringify(this.arrayProdutos[i]) + ')');*/

            let imgDel = document.createElement('img');
            imgDel.src = 'img/excluir.png';
            imgDel.onclick = () => this.deletar(this.arrayProdutos[i].id);
            /*imgDel.setAttribute('onclick', 'produto.deletar(' + this.arrayProdutos[i].id + ')');*/

            td_acoes.appendChild(imgEdit);
            td_acoes.appendChild(imgDel);
            td_acoes.classList.add('center');

            totalItens += parseInt(this.arrayProdutos[i].quantidade);
            somaPreco += this.arrayProdutos[i].preco * this.arrayProdutos[i].quantidade;
        }

        document.getElementById('total-produtos').innerText = totalProdutos;
        document.getElementById('total-itens').innerText = totalItens;
        document.getElementById('total-preco').innerText = somaPreco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    adicionar(produto) {
        produto.preco = parseFloat(produto.preco);
        produto.quantidade = parseInt(produto.quantidade);
        this.arrayProdutos.push(produto);
        this.id++;
        this.atualizarLocalStorage();
    }

    lerDados() {
        let produto = {};
        produto.id = this.id;
        produto.nomeProduto = document.getElementById('produto').value;
        produto.preco = document.getElementById('valor').value;
        produto.quantidade = document.getElementById('quantidade').value;

        return produto;
    }

    validaCampo(produto) {
        let msg = '';

        if (produto.nomeProduto == '') {
            msg += '- Informe o nome do produto \n';
        }

        if (produto.preco == '') {
            msg += '- Informe o preço do produto \n';
        }

        if (produto.quantidade == '' || produto.quantidade <= 0) {
            msg += '- Informe uma quantidade válida \n';
        }

        if (msg != '') {
            alert(msg);
            return false;
        }

        return true;
    }

    cancelar() {
        document.getElementById('produto').value = '';
        document.getElementById('valor').value = '';
        document.getElementById('quantidade').value = '';
        salvar.innerText = 'Adicionar';
        this.editId = null;
    }

    deletar(id) {
        if (confirm('Deseja realmente deletar o produto do ID ' + id)) {
            this.arrayProdutos = this.arrayProdutos.filter(produto => produto.id != id);
            this.atualizarLocalStorage();
            this.listaTabela();
        }
    }

    preparaEdicao(dados) {
        this.editId = dados.id;
        document.getElementById('produto').value = dados.nomeProduto;
        document.getElementById('valor').value = dados.preco;
        document.getElementById('quantidade').value = dados.quantidade;

        salvar.innerText = 'Atualizar';
    }

    atualizar(id, produto) {
        for (let i = 0; i < this.arrayProdutos.length; i++) {
            if (this.arrayProdutos[i].id == id) {
                this.arrayProdutos[i].nomeProduto = produto.nomeProduto;
                this.arrayProdutos[i].preco = produto.preco;
                this.arrayProdutos[i].quantidade = produto.quantidade;
            }
        }
        this.atualizarLocalStorage();
    }

    atualizarLocalStorage() {
        localStorage.setItem('produtos', JSON.stringify(this.arrayProdutos));
    }
}


let produto = new Produto();


salvar.addEventListener('click', produto.salvar.bind(produto));
cancelar.addEventListener('click', produto.cancelar.bind(produto));
