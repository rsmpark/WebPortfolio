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

$('.panel__info .text__container:has(+ ul)').on('click', function () {
  let idx = $(this).parent().index();

  const isDropActive = !$currPanel.find('.panel__info ul li.info__items').eq(idx).hasClass('drop__active');

  if (isDropActive) {
    $currPanel.find('.panel__info ul li.info__items').eq(idx).addClass('drop__active');
  } else {
    $currPanel.find('.panel__info ul li.info__items').eq(idx).removeClass('drop__active');
  }
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

$('.experience__lst:has(.experience__lst-underline.vertical)').each(expTabVerAnimationInit);

$('.experience__lst:has(.experience__lst-underline.vertical) > li > button')
  .on('mouseenter focus', handleExpTabVerMouseEnter)
  .on('mouseleave blur', handleExpTabVerMouseLeave);

$('.experience__lst:has(.experience__lst-underline.horizontal)').each(expTabHorAnimationInit);

$('.experience__lst:has(.experience__lst-underline.horizontal) > li > button')
  .on('mouseenter focus', handleExpTabHorMouseEnter)
  .on('mouseleave blur', handleExpTabHorMouseLeave);
