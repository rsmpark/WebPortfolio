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
