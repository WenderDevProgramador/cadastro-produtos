const salvar = document.getElementById('adicionar');
const cancelar = document.getElementById('deletar');

class Produto {
    constructor() {
        this.id = 1;
        this.arrayProdutos = [];
        this.editId = null;
    }

    salvar() {
        let produto = this.lerDados();

        if (this.validaCampo(produto)) {
            if(this.editId == null) {
                this.adicionar(produto)
            } else {
                this.atualizar(this.editId, produto)
            }
            
        }

        this.listaTabela();
        this.cancelar();
    }

    listaTabela() {
        let tbody = document.getElementById('tbody');
        tbody.innerHTML = ''; // Limpa a tabela antes de adicionar novos dados
    
        let totalItens = 0; // Inicializa o contador de itens
        let somaPreco = 0;  // Inicializa a soma dos preços
    
        for (let i = 0; i < this.arrayProdutos.length; i++) {
            let tr = tbody.insertRow(); // Cria uma nova linha na tabela
    
            let td_id = tr.insertCell();
            let td_produto = tr.insertCell();
            let td_preço = tr.insertCell();
            let td_açoes = tr.insertCell();
    
            td_id.innerText = this.arrayProdutos[i].id;
            td_produto.innerText = this.arrayProdutos[i].nomeProduto;
            td_preço.innerText = this.arrayProdutos[i].preço.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    
            td_id.classList.add('center');
    
            let imgEdit = document.createElement('img');
            imgEdit.src = 'img/escrever.png';
            imgEdit.setAttribute('onclick','produto.preparaEdicao(' + JSON.stringify(this.arrayProdutos[i]) + ')');
    
            let imgDel = document.createElement('img');
            imgDel.src = 'img/excluir.png';
            imgDel.setAttribute('onclick', 'produto.deletar(' + this.arrayProdutos[i].id + ')'); // Chama o método deletar ao clicar na imagem
    
            td_açoes.appendChild(imgEdit);
            td_açoes.appendChild(imgDel);
    
            td_açoes.classList.add('center');
    
            totalItens++; // Incrementa a quantidade de itens
            somaPreco += this.arrayProdutos[i].preço; // Soma o preço do produto
        }
    
        // Atualiza o footer da tabela com o total de itens e a soma dos preços
        document.getElementById('total-itens').innerText = totalItens;
        document.getElementById('total-preco').innerText = somaPreco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }
    

    adicionar(produto) {
        produto.preço = parseFloat(produto.preço)
        this.arrayProdutos.push(produto);
        this.id++; // Incrementa o ID para o próximo produto
    }

    lerDados() {
        let produto = {};
        produto.id = this.id;
        produto.nomeProduto = document.getElementById('produto').value;
        produto.preço = document.getElementById('valor').value;

        return produto;
    }

    validaCampo(produto) {
        let msg = '';

        if (produto.nomeProduto == '') {
            msg += '- Informe o nome do produto \n';
        }

        if (produto.preço == '') {
            msg += '- Informe o preço do produto \n';
        }

        if (msg != '') {
            alert(msg);
            return false;
        }

        return true;
    }

    cancelar() {
        document.getElementById('produto').value = '';
        document.getElementById('valor').value = '';  // Corrigido para 'valor'
        salvar.innerText = 'Adicionar'
        this.editId = null
    }

    deletar(id) {
        if(confirm('Deseja realmente deletar o produto do ID ' + id)){
            for (let i = 0; i < this.arrayProdutos.length; i++) {
                if (this.arrayProdutos[i].id == id) {
                    this.arrayProdutos.splice(i, 1); // Corrigido para remover 1 elemento do array
                    break; // Interrompe o loop após encontrar e remover o item
                }
            }
            this.listaTabela(); // Atualiza a tabela após a exclusão
        }
        
    }

    preparaEdicao(dados) {
        this.editId = dados.id
        document.getElementById('produto').value = dados.nomeProduto
        document.getElementById('valor').value = dados.preço

        salvar.innerText = 'Atualizar'
        
    }

    atualizar(id, produto) {
        for(let i = 0; i < this.arrayProdutos.length; i++) {
            if(this.arrayProdutos[i].id == id) {
                this.arrayProdutos[i].nomeProduto = produto.nomeProduto
                this.arrayProdutos[i].preço = produto.preço
            }
        }
    }
}

// Instanciar a classe Produto
var produto = new Produto();

// Referenciar os métodos da instância produto no DOM
salvar.addEventListener('click', produto.salvar.bind(produto));
cancelar.addEventListener('click', produto.cancelar.bind(produto));
