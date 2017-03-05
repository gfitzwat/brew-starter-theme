function classToggle() {
    this.classList.toggle('nav-toggle');
    this.classList.toggle('expand');
}
document.querySelector('.nav-toggle').addEventListener('click', classToggle);
