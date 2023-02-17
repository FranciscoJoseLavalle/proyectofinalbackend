const burga = document.querySelector('.burga');
const burgas = document.querySelectorAll('.burgas');
const header = document.querySelector(".header__nav-mobile");
const body = document.querySelector('body');

burga.addEventListener('click', () => {
    burgas[0].classList.toggle('burga0')
    burgas[1].classList.toggle('burga1')
    burgas[2].classList.toggle('burga2')
    header.classList.toggle('nones')
    body.style.overflow == 'hidden' ? body.style.overflow = 'auto' : body.style.overflow = 'hidden'
})

const userContainer = document.querySelector('.userContainer')
const logout2 = document.querySelectorAll('.logout');

userContainer.addEventListener('click', () => {
    logout2[1].classList.toggle('none')
})