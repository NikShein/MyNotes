let modalWindow;
let openModalBtn;

if (document.querySelector('.open-modal-button')) {
    openModalBtn = document.querySelector('.open-modal-button');
    openModalBtn.addEventListener('click', openModalWindow);
}
if (document.querySelector('.modal-window')) {
    modalWindow = document.querySelector('.modal-window');;
}



// let substrate = document.querySelector('.substrate');

function openModalWindow () {
    modalWindow.style.visibility = 'visible';
    modalWindow.style.opacity = '1';
    substrate.style.zIndex = 800;
    modalWindow.style.zIndex = 900;
}

function closeModalWindow () {
    modalWindow.style.visibility = 'hidden';
    modalWindow.style.opacity = '0';
    substrate.style.zIndex = -9;
    modalWindow.style.visibility = 'hidden';
}

substrate.addEventListener('click', closeModalWindow);