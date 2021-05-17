/*===== MENU SHOW =====*/

$('#nav-toggle').on('click', function () {
  $('#nav-menu').toggleClass('show');
  $('body').toggleClass('blur');

  $('.blur .l-main').one('click', function () {
    $('#nav-menu').removeClass('show');
    $('body').removeClass('blur');
  });

  $('.blur .nav__link').one('click', function () {
    $('#nav-menu').removeClass('show');
    $('body').removeClass('blur');
  });
});

// showMenu('nav-toggle', 'nav-menu');

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
    $currPanel.find('.panel__info ul li.info__items').eq(idx).addClass('drop__active');
  } else {
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

function goToPrevSection(event) {
  // Prevent the default mouse wheel behaviour
  event.preventDefault();
  // Set the animation state to true
  isAnimating = true;

  currentIndex--;

  // Animate scroll
  const href = $('.nav__item').eq(currentIndex).find('a').attr('href');
  $(href)[0].scrollIntoView();
  stopAnimation();

  setTimeout(
    moveNavUnderline.bind(null, $('.nav__item').eq(currentIndex).find('.nav__link')),
    250
  );
}

function goToNextSection(event) {
  // Prevent the default mouse wheel behaviour
  event.preventDefault();
  // Set the animation state to true
  isAnimating = true;

  currentIndex++;

  // Animate scroll
  const href = $('.nav__item').eq(currentIndex).find('a').attr('href');
  $(href)[0].scrollIntoView();
  stopAnimation();

  setTimeout(
    moveNavUnderline.bind(null, $('.nav__item').eq(currentIndex).find('.nav__link')),
    250
  );
}

let isPanelBottom = false;
let isPanelTop = false;

const scrollHadler = function (event) {
  event.preventDefault();
  // If animation is in progress
  if (isAnimating) {
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
};

// Define wheel event handler
document.addEventListener('wheel', scrollHadler, { passive: false });

$.fn.isYScrollable = function () {
  return this[0].scrollHeight > this[0].clientHeight;
};

/* Carousel Logic */

const $carousel = $('.carousel__track');
const $slides = $('.project');

const nextSlide = function ($slide) {
  if ($slide.next().length > 0) {
    return $slide.next();
  } else {
    return $slides.first();
  }
};

const prevSlide = function ($slide) {
  if ($slide.prev().length > 0) {
    return $slide.prev();
  } else {
    return $slides.last();
  }
};

$('.carousel__actions button').on('click', function (e) {
  var i, j, $new_seat, ref;
  const $lastSlide = $('.work .carousel__track .is-ref').removeClass('is-ref');

  if ($(this).index() === 0) {
    // Previous button clicked
    $new_seat = nextSlide($lastSlide);
    $carousel.removeClass('is-reversing');
  } else {
    // Next button clicked
    $new_seat = prevSlide($lastSlide);
    $carousel.addClass('is-reversing');
  }
  $new_seat.addClass('is-ref').css('order', 1);

  for (
    i = j = 2, ref = $slides.length;
    2 <= ref ? j <= ref : j >= ref;
    i = 2 <= ref ? ++j : --j
  ) {
    $new_seat = nextSlide($new_seat).css('order', i);
  }

  $carousel.removeClass('is-set');
  return setTimeout(function () {
    return $carousel.addClass('is-set');
  }, 50);
});

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

moveNavUnderline = function ($elem) {
  const $targetdNavAnchor = $elem;
  const $parent = $targetdNavAnchor.parent();
  const $container = $parent.closest('.nav__list');
  const $nav_item = $parent.closest('.nav__item');
  const $underline = $container.find('.nav__item-underline');

  const left = $nav_item.position().left + initialMargin;
  const width = $nav_item.outerWidth();

  $underline.css({ left, width });
};

$('.nav__list:has(.nav__item-underline) > li > a')
  .on('mouseenter focus', function () {
    moveNavUnderline($(this));
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
const expTabHorAnimationInit = function () {
  const $container = $(this);
  const $active = $container.find('li.active').first();
  const $underline = $container.find('.experience__lst-underline.horizontal');

  const left = $active.position().left;
  const width = $active.outerWidth();

  $underline.css({ left, width });
};

const handleExpTabHorMouseEnter = function () {
  const $this = $(this);
  const $parent = $this.parent();
  const $container = $parent.closest('.experience__lst');
  const $underline = $container.find('.experience__lst-underline.horizontal');

  const left = $parent.position().left;
  const width = $parent.outerWidth();

  $underline.css({ left, width });
};

const handleExpTabHorMouseLeave = function () {
  const $this = $(this);
  const $container = $this.closest('.experience__lst');
  const $active = $container.find('li.active').first();
  const $underline = $container.find('.experience__lst-underline.horizontal');

  const left = $active.position().left;
  const width = $active.outerWidth();

  $underline.css({ left, width });
};

const expTabVerAnimationInit = function () {
  const $container = $(this);
  const $active = $container.find('li.active').first();
  const $underline = $container.find('.experience__lst-underline.vertical');

  const top = $active.position().top;
  const height = $active.outerHeight();

  $underline.css({ top, height });
};

const handleExpTabVerMouseEnter = function () {
  const $this = $(this);
  const $parent = $this.parent();
  const $container = $parent.closest('.experience__lst');
  const $underline = $container.find('.experience__lst-underline.vertical');

  const top = $parent.position().top;
  const height = $parent.outerHeight();

  $underline.css({ top, height });
};

const handleExpTabVerMouseLeave = function () {
  const $this = $(this);
  const $container = $this.closest('.experience__lst');
  const $active = $container.find('li.active').first();
  const $underline = $container.find('.experience__lst-underline.vertical');

  const top = $active.position().top;
  const height = $active.outerHeight();

  $underline.css({ top, height });
};

$('.experience__lst:has(.experience__lst-underline.vertical)').each(
  expTabVerAnimationInit
);

$('.experience__lst:has(.experience__lst-underline.vertical) > li > button')
  .on('mouseenter focus', handleExpTabVerMouseEnter)
  .on('mouseleave blur', handleExpTabVerMouseLeave);

$('.experience__lst:has(.experience__lst-underline.horizontal)').each(
  expTabHorAnimationInit
);

$('.experience__lst:has(.experience__lst-underline.horizontal) > li > button')
  .on('mouseenter focus', handleExpTabHorMouseEnter)
  .on('mouseleave blur', handleExpTabHorMouseLeave);

let isMobileSize = false;

$(window).resize(function () {
  if ($(this).width() <= 860 && !isMobileSize) {
    isMobileSize = true;
    document.removeEventListener('wheel', scrollHadler, { passive: false });
  } else if ($(this).width() > 860) {
    document.addEventListener('wheel', scrollHadler, { passive: false });
    isMobileSize = false;
  }
});
