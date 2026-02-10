/**
 * ===============================
 * Seleção de elementos do DOM
 * ===============================
 */
const overlay = document.getElementById('overlay');
const modal = document.getElementById('abrirModal');
const lista = document.getElementById('lista');
const emptyMessage = document.getElementById('empty-message');
const feedbackMessage = document.getElementById('feedback-message');

/**
 * ===============================
 * Controle do Modal
 * ===============================
 */

/**
 * Abre o modal e exibe o overlay
 */
function abrirModal() {
    overlay.style.visibility = 'visible';
    overlay.style.opacity = '1';

    modal.style.visibility = 'visible';
    modal.style.opacity = '1';
}

/**
 * Fecha o modal e oculta o overlay
 */
function fecharModal() {
    overlay.style.visibility = 'hidden';
    overlay.style.opacity = '0';

    modal.style.visibility = 'hidden';
    modal.style.opacity = '0';
}

/**
 * ===============================
 * Mensagens de Feedback
 * ===============================
 */

/**
 * Exibe uma mensagem temporária para o usuário
 * @param {string} texto - Texto da mensagem a ser exibida
 */
function mostrarMensagem(texto) {
    feedbackMessage.innerText = texto;
    feedbackMessage.style.display = 'block';

    setTimeout(() => {
        feedbackMessage.style.display = 'none';
        feedbackMessage.innerText = '';
    }, 2000);
}

/**
 * Oculta a mensagem de feedback imediatamente
 */
function esconderMensagem() {
    feedbackMessage.style.display = 'none';
    feedbackMessage.innerText = '';
}

/**
 * ===============================
 * Consumo da API
 * ===============================
 */

/**
 * Busca as tarefas na API
 */
function buscarTarefas() {
    fetch('http://localhost:3000/tarefas')
        .then(response => response.json())
        .then(tarefas => inserirTarefas(tarefas))
        .catch(() => mostrarMensagem('Erro ao buscar tarefas'));
}

/**
 * Insere a lista de tarefas na tela
 * @param {Array} tarefas - Lista de tarefas retornadas da API
 */
function inserirTarefas(tarefas) {
    lista.innerHTML = '';

    // Caso não existam tarefas
    if (!tarefas || tarefas.length === 0) {
        emptyMessage.style.display = 'block';
        return;
    }

    emptyMessage.style.display = 'none';

    tarefas.forEach(tarefa => {
        adicionarTarefaNaTela(tarefa);
    });
}

/**
 * Adiciona uma tarefa individual na lista
 * @param {Object} item - Objeto da tarefa
 */
function adicionarTarefaNaTela(item) {
    const li = document.createElement('li');

    li.innerHTML = `
        <h5>${item.tarefa}</h5>
        <p>${item.descricao}</p>
        <div class="actions">
            <box-icon 
                name="trash" 
                size="sm"  
                onclick="deletarTarefa('${item.id}')">
            </box-icon>
        </div>
    `;

    lista.appendChild(li);
}

/**
 * ===============================
 * Criação de Tarefas
 * ===============================
 */

/**
 * Envia uma nova tarefa para a API
 * @param {Event} event - Evento de submit do formulário
 */
function novaTarefa(event) {
    event.preventDefault();

    const tarefa = {
        tarefa: document.getElementById('titulo').value,
        descricao: document.getElementById('descricao').value
    };

    fetch('http://localhost:3000/tarefas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tarefa)
    })
        .then(response => response.json())
        .then(tarefaCriada => {
            adicionarTarefaNaTela(tarefaCriada);
            fecharModal();
            mostrarMensagem('Tarefa criada com sucesso');
        })
        .catch(() => mostrarMensagem('Erro ao criar tarefa'));
}

/**
 * ===============================
 * Exclusão de Tarefas
 * ===============================
 */

/**
 * Deleta uma tarefa pelo ID
 * @param {string} id - ID da tarefa
 */
function deletarTarefa(id) {
    fetch(`http://localhost:3000/tarefas/${id}`, {
        method: 'DELETE'
    })
        .then(() => {
            mostrarMensagem('Tarefa deletada com sucesso');
            buscarTarefas(); // Recarrega a lista após exclusão
        })
        .catch(() => mostrarMensagem('Erro ao deletar tarefa'));
}

/**
 * ===============================
 * Inicialização
 * ===============================
 */

// Carrega as tarefas assim que o DOM estiver pronto
document.addEventListener('DOMContentLoaded', buscarTarefas);
