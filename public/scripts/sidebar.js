const sidebar = document.querySelector(".sidebar-wrapper");
const openBtn = document.querySelectorAll(".burger");
const substrate = document.querySelector(".substrate");



function openSidebar () {
    
    sidebar.classList.add('openSideBar');
    substrate.style.zIndex = 800;
    
}

function closeSidebar () {
    substrate.style.zIndex = -9;
    sidebar.classList.remove('openSideBar');
}

substrate.addEventListener('click', closeSidebar);

openBtn.forEach(function (btn) {
    btn.addEventListener('click', openSidebar);
})