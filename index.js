const overlay = document.getElementById('overlay');
const modal = document.getElementById('abrirModal');
const lista = document.getElementById('lista');
const emptyMessage = document.getElementById('empty-message');
const feedbackMessage = document.getElementById('feedback-message');



function abrirModal() {
    overlay.style.visibility = 'visible';
    overlay.style.opacity = '1';
    modal.style.visibility = 'visible';
    modal.style.opacity = '1';
}

function fecharModal() {
    overlay.style.visibility = 'hidden';
    overlay.style.opacity = '0';
    modal.style.visibility = 'hidden';
    modal.style.opacity = '0';
}


function mostrarMensagem(texto) {
    feedbackMessage.innerText = texto;
    feedbackMessage.style.display = 'block';

    setTimeout(() => {
        feedbackMessage.style.display = 'none';
        feedbackMessage.innerText = '';
    }, 2000);
}

function esconderMensagem() {
    feedbackMessage.style.display = 'none';
    feedbackMessage.innerText = '';
}




// function buscarTarefas() {
//     fetch('http://localhost:3000/tarefas')
//         .then(res => res.json())
//         .then(tarefas => {
//             esconderMensagem();
//             inserirTarefas(tarefas);
//         })
//         .catch(() => mostrarMensagem('Erro ao buscar tarefas'));
// }


function buscarTarefas() {
    fetch('http://localhost:3000/tarefas')
        .then(res => res.json())
        .then(tarefas => inserirTarefas(tarefas))
        .catch(() => mostrarMensagem('Erro ao buscar tarefas'));
}


function inserirTarefas(tarefas) {
    lista.innerHTML = '';

    if (!tarefas || tarefas.length === 0) {
        emptyMessage.style.display = 'block';
        return;
    }

    emptyMessage.style.display = 'none';

    tarefas.forEach(item => {
        adicionarTarefaNaTela(item);
    });
}


function adicionarTarefaNaTela(item) {
    const li = document.createElement('li');

    li.innerHTML = `
        <h5>${item.tarefa}</h5>
        <p>${item.descricao}</p>
        <div class="actions">
            <box-icon  name="trash" size="sm"  onclick="deletarTarefa('${item.id}')">
            </box-icon>
        </div>
    `;

    lista.appendChild(li);
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
        .then(res => res.json())
        .then(tarefaCriada => {
            
            adicionarTarefaNaTela(tarefaCriada);
            // alert('Tarefa criada com sucesso');
            fecharModal();
            mostrarMensagem('Tarefa criada com sucesso');
        })
        .catch(() => mostrarMensagem('Erro ao criar tarefa'));
}


function deletarTarefa(id) {
    fetch(`http://localhost:3000/tarefas/${id}`, {
        method: 'DELETE'
    })
        .then(() => {
            mostrarMensagem('Tarefa deletada com sucesso');
            buscarTarefas(); // recarrega a lista
        })
        .catch(() => {
            mostrarMensagem('Erro ao deletar tarefa');
        });
}










document.addEventListener('DOMContentLoaded', buscarTarefas);
