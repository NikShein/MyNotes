let theme;
const checkBoxes = document.querySelectorAll('.cb');
const link = document.querySelector('#link-theme');

checkBoxes.forEach((checkBox) => {
    checkBox.addEventListener('change', changeTheme);
});

let keys = Object.keys(localStorage);
for(let key of keys) {
  if(key === 'theme') {
      if (localStorage.getItem('theme') === 'dark') {
        link.setAttribute('href', '/styles/dark-theme.css');
        checkBoxes.forEach((checkBox) => {
            checkBox.setAttribute('checked', 'checked');
        });
      } else {
            link.setAttribute('href', '/styles/light-theme.css');
            checkBoxes.forEach((checkBox) => {
                checkBox.removeAttribute('checked');
            });
      }
  }
}

function changeTheme() {
    if(this.checked){
        link.setAttribute('href', '/styles/dark-theme.css');
        localStorage.setItem('theme', 'dark');
        checkBoxes.forEach((checkBox) => {
            checkBox.setAttribute('checked', 'checked');
        });
    } else {
        link.setAttribute('href', '/styles/light-theme.css');
        localStorage.setItem('theme', 'light');
        checkBoxes.forEach((checkBox) => {
            checkBox.removeAttribute('checked');
        });
    }
}