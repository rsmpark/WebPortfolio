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
// const sr = ScrollReveal({
//   origin: 'top',
//   distance: '80px',
//   duration: 2000,
//   reset: false,
// });

// /*SCROLL HOME*/
// sr.reveal('.home__span', { cleanup: true });
// sr.reveal('.home__title', { delay: 800, cleanup: true });
// sr.reveal('.home__subtitle', { delay: 800, cleanup: true });
// sr.reveal('.home__desc', { delay: 1400, cleanup: true });
// sr.reveal('.button', { delay: 1400, cleanup: true });
// sr.reveal('.home__img', { delay: 1800, cleanup: true });
// sr.reveal('.home__social-icon', { delay: 1800, interval: 400, cleanup: true });

// /*SCROLL ABOUT*/
// sr.reveal('.about__img', {});
// sr.reveal('.about__subtitle', { delay: 400 });
// sr.reveal('.about__text', { delay: 400 });

// /*SCROLL SKILLS*/
// sr.reveal('.skills__subtitle', {});
// sr.reveal('.skills__text', {});
// sr.reveal('.skills__data', { interval: 200 });
// sr.reveal('.skills__img', { delay: 600 });

// /*SCROLL WORK*/
// sr.reveal('.work__img', { interval: 200 });

// /*SCROLL CONTACT*/
// sr.reveal('.contact__input', { interval: 200 });

// let doc = document.documentElement;
// let w = window;

// let curScroll = (prevScroll = w.scrollY || doc.scrollTop);
// let curDirection = (prevDirection = 0);

// let header = document.getElementsByClassName('l-header');

// // scroll up - 1, scroll down - 2, initial - 0
// function checkScroll() {
//   curScroll = w.scrollY || doc.scrollTop;

//   if (curScroll > prevScroll) {
//     // scrolled down
//     curDirection = 2;
//   } else {
//     curDirection = 1;
//   }

//   if (curDirection !== prevDirection) {
//     toggleHeaderHidden();
//   }

//   toggleHeaderBoxShadow();

//   prevDirection = curDirection;
//   prevScroll = curScroll;
// }

// function toggleHeaderHidden() {
//   if (curDirection === 2) {
//     header[0].classList.add('hide');
//   } else if (curDirection === 1) {
//     header[0].classList.remove('hide');
//   }
// }

// function toggleHeaderBoxShadow() {
//   if (curScroll > 0) {
//     header[0].classList.add('shadow');
//   } else {
//     header[0].classList.remove('shadow');
//   }
// }

// window.addEventListener('scroll', checkScroll);

/* Experiences */
let $expItems = $('.experience__item');
let $expPanels = $('.experience__panel');
var panelIndex = 0;
var $currPanel = $expPanels.eq(panelIndex);

$expItems.on('click', function () {
  panelIndex = $($expItems).index(this);

  $('.experience__item.active').removeClass('active');
  $(this).addClass('active');

  $expPanels.addClass('hidden');
  $expPanels.addClass('visually-hidden');
  $expPanels.eq(panelIndex).removeClass('hidden');

  setTimeout(function () {
    $expPanels.eq(panelIndex).removeClass('visually-hidden');
  }, 20);

  $currPanel = $expPanels.eq(panelIndex);
});

$('.panel__info .text__container').on('click', function () {
  let idx = $(this).parent().index();

  const isDropActive = !$currPanel
    .find('.panel__info ul li.info__items')
    .eq(idx)
    .hasClass('drop__active');

  if (isDropActive) {
    console.log('ASDASD');
    $currPanel.find('.panel__info ul li.info__items').eq(idx).addClass('drop__active');
  } else {
    console.log('BNMBNM');
    $currPanel.find('.panel__info ul li.info__items').eq(idx).removeClass('drop__active');
  }
});

/* Scroll Logic */

// Collecting the sections
var $sections = $('.section');

// Variable to hold the current section index
var currentIndex = 0;

// Variable to hold the animation state
var isAnimating = false;

// Variable to hold the state if about_info has reached bottom/top
var isBottom = false;
var isTop = false;

// Define the animation finish callback
var stopAnimation = function () {
  // We add the 300 ms timeout to debounce the mouse wheel event
  setTimeout(function () {
    // Set the animation state to false
    isAnimating = false;
  }, 500);
};

// Function returns true if DOM element bottom is reached
var bottomIsReached = function ($elem) {
  var rect = $elem[0].getBoundingClientRect();
  return rect.bottom <= $(window).height();
};

// Function returns true if DOM element top is reached
var topIsReached = function ($elem) {
  var rect = $elem[0].getBoundingClientRect();
  return rect.top >= 0;
};

let isPanelBottom = false;
let isPanelTop = false;

// Define wheel event handler
document.addEventListener(
  'wheel',
  function (event) {
    // If animation is in progress
    if (isAnimating) {
      event.preventDefault();
      return;
    }

    // Get the current section
    var $currentSection = $($sections[currentIndex]);

    // Get the mouse wheel spin direction
    var direction = event.deltaY;

    if (currentIndex !== 3) {
      if (direction > 0) {
        // If next index is greater than sections count, do nothing
        if (currentIndex + 1 >= $sections.length) return;
        // If bottom is not reached allow the default behaviour
        if (!bottomIsReached($currentSection)) return;
        // Go to next
        goToNextSection(event);
      } else {
        // If previous index is negative, do nothing
        if (currentIndex - 1 < 0) return;
        // If top is not reached allow the default behaviour
        if (!topIsReached($currentSection)) return;
        // Go to prev
        goToPrevSection(event);
      }
    } else {
      event.preventDefault();

      if (direction < 0)
        $currPanel
          .find('.panel__info')
          .scrollTop($currPanel.find('.panel__info').scrollTop() - 15);
      else if (direction > 0)
        $currPanel
          .find('.panel__info')
          .scrollTop($currPanel.find('.panel__info').scrollTop() + 15);

      if (!$currPanel.find('.panel__info').isYScrollable()) {
        if (direction > 0) {
          // If next index is greater than sections count, do nothing
          if (currentIndex + 1 >= $sections.length) return;
          // If bottom is not reached allow the default behaviour
          if (!bottomIsReached($currentSection)) return;
          // Go to next
          goToNextSection(event);
        } else {
          // If previous index is negative, do nothing
          if (currentIndex - 1 < 0) return;
          // If top is not reached allow the default behaviour
          if (!topIsReached($currentSection)) return;

          // Go to prev
          goToPrevSection(event);
        }
      } else {
        if (
          $currPanel.find('.panel__info').scrollTop() +
            $currPanel.find('.panel__info').innerHeight() >=
          $currPanel.find('.panel__info')[0].scrollHeight
        ) {
          if (isPanelBottom) {
            goToNextSection(event);
            isPanelBottom = false;
          } else {
            setTimeout(function () {
              isPanelBottom = true;
            }, 500);
          }
        } else if ($currPanel.find('.panel__info').scrollTop() === 0) {
          if (isPanelTop) {
            goToPrevSection(event);
            isPanelTop = false;
          } else {
            setTimeout(function () {
              isPanelTop = true;
            }, 500);
          }
        }
      }
    }
  },
  { passive: false }
);

function goToPrevSection(event) {
  // Prevent the default mouse wheel behaviour
  event.preventDefault();
  // Set the animation state to true
  isAnimating = true;

  currentIndex--;
  // Get the previous section
  var $previousSection = $($sections[currentIndex]);
  // Get the previous section offset
  var offsetTop = $previousSection.offset().top;

  // Animate scroll
  $('html, body').animate({ scrollTop: offsetTop }, 250, stopAnimation);
}

function goToNextSection(event) {
  // Prevent the default mouse wheel behaviour
  event.preventDefault();
  // Set the animation state to true
  isAnimating = true;

  currentIndex++;
  // Get the next section
  var $nextSection = $($sections[currentIndex]);
  // Get the next section offset
  var offsetTop = $nextSection.offset().top;

  // Animate scroll
  $('html, body').animate({ scrollTop: offsetTop }, 250, stopAnimation);
}

$.fn.isYScrollable = function () {
  return this[0].scrollHeight > this[0].clientHeight;
};

/* Nav Scroll */

$('.nav__item').on('click', function () {
  const href = $(this).find('a').attr('href');
  currentIndex = $(this).index();
  $(href)[0].scrollIntoView();
});

/* Nav Tab Underline Animation */
$('.nav__list:has(.nav__item-underline)').each(function initialize() {
  const $container = $(this);
  const $active = $container.find('li a.active').first();
  const $underline = $container.find('.nav__item-underline');

  const left = $active.position().left;
  const width = $active.outerWidth();

  $underline.css({ left, width });
});

const initialMargin = $('.nav__list .nav__item-underline').position().left;

$('.nav__list:has(.nav__item-underline) > li > a')
  .on('mouseenter focus', function () {
    const $this = $(this);
    const $parent = $this.parent();
    const $container = $parent.closest('.nav__list');
    const $nav_item = $parent.closest('.nav__item');
    const $underline = $container.find('.nav__item-underline');

    const left = $nav_item.position().left + initialMargin;
    const width = $nav_item.outerWidth();

    $underline.css({ left, width });
  })
  .on('mouseleave blur', function () {
    const $this = $(this);
    const $container = $this.closest('.nav__list');
    const $active = $container.find('li a.active').first();
    const $underline = $container.find('.nav__item-underline');

    const left = $active.position().left;
    const width = $active.outerWidth();

    $underline.css({ left, width });
  });

/* Experience Tab Underline Animation */
$('.experience__lst:has(.experience__lst-underline)').each(function initialize() {
  const $container = $(this);
  const $active = $container.find('li.active').first();
  const $underline = $container.find('.experience__lst-underline');

  const top = $active.position().top;
  const height = $active.outerHeight();

  $underline.css({ top, height });
});

$('.experience__lst:has(.experience__lst-underline) > li > button')
  .on('mouseenter focus', function () {
    const $this = $(this);
    const $parent = $this.parent();
    const $container = $parent.closest('.experience__lst');
    const $underline = $container.find('.experience__lst-underline');

    const top = $parent.position().top;
    const height = $parent.outerHeight();

    $underline.css({ top, height });
  })
  .on('mouseleave blur', function () {
    const $this = $(this);
    const $container = $this.closest('.experience__lst');
    const $active = $container.find('li.active').first();
    const $underline = $container.find('.experience__lst-underline');

    const top = $active.position().top;
    const height = $active.outerHeight();

    $underline.css({ top, height });
  });

/* Carousel Logic */

const $carouselTrack = $('.carousel .carousel__track');
const $carouselSlides = $carouselTrack.children();
const $carouselNext = $carouselTrack
  .parent()
  .next('.carousel__actions')
  .children('#carousel__button--next');
const $carouselPrev = $carouselTrack
  .parent()
  .next('.carousel__actions')
  .children('#carousel__button--prev');

const slideWidth = $carouselSlides[0].getBoundingClientRect().width;

$carouselSlides.each((index, slide) => {
  padding = 10;

  slide.style.left = slideWidth * index + padding + 'px';
});

const moveToSlide = (carouselTrack, currSlide, targetSlide, slideAmount) => {
  carouselTrack.css('transform', `translateX(-${slideAmount})`);
  currSlide.removeClass('current-slide');
  targetSlide.addClass('current-slide');
};

$carouselPrev.on('click', (event) => {
  const $currSlide = $carouselTrack.children('.current-slide');
  const $prevSlide = $currSlide.prev();
  const slideAmount = $prevSlide[0].style.left;

  moveToSlide($carouselTrack, $currSlide, $prevSlide, slideAmount);
});

$carouselNext.on('click', (event) => {
  const $currSlide = $carouselTrack.children('.current-slide');
  const $nextSlide = $currSlide.next();
  const slideAmount = $nextSlide[0].style.left;

  moveToSlide($carouselTrack, $currSlide, $nextSlide, slideAmount);
});
