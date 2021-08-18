/* Scroll Logic */

// Collecting the sections
var $sections = $('.section');

// Variable to hold the current section index
var currentIndex = 0;

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
  // Animate scroll
  currentIndex--;
  const href = $('.nav__item').eq(currentIndex).find('a').attr('href');
  smoothScroll($(href)[0].offsetTop);

  // Move navigation underline
  setTimeout(moveNavUnderline.bind(null, $('.nav__item').eq(currentIndex).find('.nav__link')), 250);
}

function goToNextSection(event) {
  // Animate scroll
  currentIndex++;
  const href = $('.nav__item').eq(currentIndex).find('a').attr('href');
  smoothScroll($(href)[0].offsetTop);

  // Move navigation underline
  setTimeout(moveNavUnderline.bind(null, $('.nav__item').eq(currentIndex).find('.nav__link')), 250);
}

let isPanelBottom = false;
let isPanelTop = false;

const scrollHandler = function (event) {
  event.preventDefault();

  // Get the current section
  var $currentSection = $($sections[currentIndex]);

  // Get the mouse wheel spin direction
  var direction = event.deltaY;

  // If not experience section
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
      if (direction < 0)
        // Move panel info up
        $currPanel.find('.panel__info').scrollTop($currPanel.find('.panel__info').scrollTop() - 15);
      else if (direction > 0)
        // Move panel info down
        $currPanel.find('.panel__info').scrollTop($currPanel.find('.panel__info').scrollTop() + 15);

      // Check if the bottom is reached for the panel info within the panels
      if (
        $currPanel.find('.panel__info').scrollTop() + $currPanel.find('.panel__info').innerHeight() >=
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
document.addEventListener('wheel', scrollHandler, { passive: false });

$.fn.isYScrollable = function () {
  return this[0].scrollHeight > this[0].clientHeight;
};

/* Nav Scroll */

$('.nav__item').on('click', function () {
  const href = $(this).find('a').attr('href');
  currentIndex = $(this).index();
  smoothScroll($(href)[0].offsetTop);
});

let isMobileSize = false;

$(window).resize(function () {
  if ($(this).width() <= 860 && !isMobileSize) {
    isMobileSize = true;
    document.removeEventListener('wheel', scrollHandler, { passive: false });
  } else if ($(this).width() > 860) {
    document.addEventListener('wheel', scrollHandler, { passive: false });
    isMobileSize = false;
  }
});

function smoothScroll(scrollTargetY, speed = 340) {
  let currentTime = 0;
  const scrollY = window.pageYOffset || document.documentElement.scrollTop;
  const derivedSpeed = speed;

  const time = Math.max(0.1, Math.min(Math.abs(scrollY - scrollTargetY) / derivedSpeed, 1.5));

  // easing equations from https://github.com/danro/easing-js/blob/master/easing.js
  const easeInOutCubic = (pos) => {
    if ((pos /= 0.5) < 1) return 0.5 * Math.pow(pos, 3);
    return 0.5 * (Math.pow(pos - 2, 3) + 2);
  };

  function runAnimation() {
    currentTime += 1 / 60;

    let p = currentTime / time;
    let t = easeInOutCubic(p);

    if (p < 1) {
      window.requestAnimationFrame(runAnimation);

      scrollTo(0, scrollY + (scrollTargetY - scrollY) * t);
    } else {
      scrollTo(0, scrollTargetY);
    }
  }

  runAnimation();
}
