/*===== MENU SHOW =====*/

const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId);

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('show');
    });
  }
};
showMenu('nav-toggle', 'nav-menu');

/*===== ACTIVE AND REMOVE MENU =====*/
const navLink = document.querySelectorAll('.nav__link');

function linkAction() {
  /*Active link*/
  navLink.forEach((n) => n.classList.remove('active'));
  this.classList.add('active');

  /*Remove menu mobile*/
  const navMenu = document.getElementById('nav-menu');
  navMenu.classList.remove('show');
}
navLink.forEach((n) => n.addEventListener('click', linkAction));

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
  origin: 'top',
  distance: '80px',
  duration: 2000,
  reset: true,
});

/*SCROLL HOME*/
sr.reveal('.home__span', {});
sr.reveal('.home__title', { delay: 800 });
sr.reveal('.home__subtitle', { delay: 800 });
sr.reveal('.home__desc', { delay: 1400 });
sr.reveal('.button', { delay: 1400 });
sr.reveal('.home__img', { delay: 1800 });
sr.reveal('.home__social-icon', { delay: 1800, interval: 400 });

/*SCROLL ABOUT*/
sr.reveal('.about__img', {});
sr.reveal('.about__subtitle', { delay: 400 });
sr.reveal('.about__text', { delay: 400 });

/*SCROLL SKILLS*/
sr.reveal('.skills__subtitle', {});
sr.reveal('.skills__text', {});
sr.reveal('.skills__data', { interval: 200 });
sr.reveal('.skills__img', { delay: 600 });

/*SCROLL WORK*/
sr.reveal('.work__img', { interval: 200 });

/*SCROLL CONTACT*/
sr.reveal('.contact__input', { interval: 200 });

let doc = document.documentElement;
let w = window;

let curScroll = (prevScroll = w.scrollY || doc.scrollTop);
let curDirection = (prevDirection = 0);

let header = document.getElementsByClassName('l-header');

// scroll up - 1, scroll down - 2, initial - 0
function checkScroll() {
  curScroll = w.scrollY || doc.scrollTop;

  if (curScroll > prevScroll) {
    // scrolled down
    curDirection = 2;
  } else {
    curDirection = 1;
  }

  if (curDirection !== prevDirection) {
    toggleHeaderHidden();
  }

  toggleHeaderBoxShadow();

  prevDirection = curDirection;
  prevScroll = curScroll;
}

function toggleHeaderHidden() {
  if (curDirection === 2) {
    header[0].classList.add('hide');
  } else if (curDirection === 1) {
    header[0].classList.remove('hide');
  }
}

function toggleHeaderBoxShadow() {
  if (curScroll > 0) {
    header[0].classList.add('shadow');
  } else {
    header[0].classList.remove('shadow');
  }
}

window.addEventListener('scroll', checkScroll);
