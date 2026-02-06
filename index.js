function novaTarefa() {
    const overlay = document.getElementById('overlay');
    const modal = document.getElementById('novaTarefa');

    overlay.style.visibility = 'visible';
    overlay.style.opacity = '1';
    modal.style.visibility = 'visible';
    modal.style.opacity = '1';
}


function fecharModal() {
    const overlay = document.getElementById('overlay');
    const modal = document.getElementById('novaTarefa');

    overlay.style.visibility = 'hidden';
    overlay.style.opacity = '0';
    modal.style.visibility = 'hidden';
    modal.style.opacity = '0';
}

document.querySelector('.modal form h3 box-icon').addEventListener('click', fecharModal);


document.getElementById('btnNovaTarefa').addEventListener('click', () => {
    document.getElementById('empty-message').style.display = 'none';
});