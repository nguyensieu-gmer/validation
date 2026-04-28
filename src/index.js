import './style.css';

let btn = document.querySelector('form');
btn.addEventListener('submit', (e) => {
    e.defaultPrevented();
});
