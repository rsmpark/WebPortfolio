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
