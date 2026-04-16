const portal = document.querySelector('.portal');
const navMobile = document.querySelector('.nav-mobile');
const closePortal = document.querySelector('.close');
const links = document.querySelectorAll('.main-nav-mob a');

navMobile.addEventListener('click', () => {
    portal.classList.add('portal_show');
});

closePortal.addEventListener('click', () => {
    portal.classList.remove('portal_show');
});

links.forEach(link => {
    link.addEventListener('click', () => {
        portal.classList.remove('portal_show');
    });
});