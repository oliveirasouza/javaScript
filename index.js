// Abre o modal de criação de tarefas
// Torna o overlay e o modal visíveis na tela
function abrirModal() {
    const overlay = document.getElementById('overlay');
    const modal = document.getElementById('abrirModal');

    overlay.style.visibility = 'visible';
    overlay.style.opacity = '1';
    modal.style.visibility = 'visible';
    modal.style.opacity = '1';
}

// Fecha o modal de criação de tarefas
// Esconde o overlay e o modal da tela
function fecharModal() {
    const overlay = document.getElementById('overlay');
    const modal = document.getElementById('abrirModal');

    overlay.style.visibility = 'hidden';
    overlay.style.opacity = '0';
    modal.style.visibility = 'hidden';
    modal.style.opacity = '0';
}

// Ao clicar no botão "Nova Tarefa"
// esconde a mensagem "Nenhuma tarefa encontrada!"
document.getElementById('btnNovaTarefa').addEventListener('click', () => {
    document.getElementById('empty-message').style.display = 'none';
});

// Referência para a lista (<ul>) onde as tarefas serão inseridas
const lista = document.getElementById('lista');

// Referência para a mensagem exibida quando não há tarefas
const emptyMessage = document.getElementById('empty-message');

// Busca as tarefas no arquivo api.json usando fetch
// Quando recebe os dados, chama a função inserirTarefas
function buscarTarefas() {
    fetch('http://localhost:3000/tarefas')
        .then(res => res.json())
        .then(dados => inserirTarefas(dados))
        .catch(err => console.error(err));
}

// Insere as tarefas recebidas da API no HTML
// Se não houver tarefas, mostra a mensagem de lista vazia
function inserirTarefas(tarefas) {
    lista.innerHTML = '';

    if (!tarefas || tarefas.length === 0) {
        emptyMessage.style.display = 'block';
        return;
    }

    emptyMessage.style.display = 'none';

    tarefas.forEach(item => {
        const li = document.createElement('li');

        li.innerHTML = `
            <h5>${item.tarefa}</h5>
            <p>${item.descricao}</p>
        `;

        lista.appendChild(li);
    });
}


function novaTarefa(event) {
    event.preventDefault();

    const tarefa = {
        tarefa: document.getElementById('titulo').value,
        descricao: document.getElementById('descricao').value
    };

    fetch('http://localhost:3000/tarefas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tarefa)
    })
    .then(() => {
        fecharModal();
        buscarTarefas(); // recarrega a lista
    });
}

// Chama a função para buscar as tarefas quando a página é carregada
window.onload = buscarTarefas;



