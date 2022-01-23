let acc = document.querySelector('.accordion');
let button = document.querySelector('.fa-plus-circle');

function accordion () {
        this.classList.toggle("active");
        button.classList.toggle("fa-plus-circle");
        button.classList.toggle("fa-minus-circle");
        let panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        } 
}

acc.addEventListener('click', accordion);