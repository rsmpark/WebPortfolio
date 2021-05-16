var $carousel, next, prev, $slides;

$carousel = $('.carousel');

$slides = $('.carousel-seat');

next = function (el) {
  if (el.next().length > 0) {
    return el.next();
  } else {
    return $slides.first();
  }
};

prev = function (el) {
  if (el.prev().length > 0) {
    return el.prev();
  } else {
    return $slides.last();
  }
};

$('.toggle').on('click', function (e) {
  var el, i, j, new_seat, ref;
  el = $('.is-ref').removeClass('is-ref');

  if ($(e.currentTarget).data('toggle') === 'next') {
    new_seat = next(el);
    $carousel.removeClass('is-reversing');
  } else {
    new_seat = prev(el);
    $carousel.addClass('is-reversing');
  }
  new_seat.addClass('is-ref').css('order', 1);

  for (
    i = j = 2, ref = $slides.length;
    2 <= ref ? j <= ref : j >= ref;
    i = 2 <= ref ? ++j : --j
  ) {
    new_seat = next(new_seat).css('order', i);
  }

  $carousel.removeClass('is-set');
  return setTimeout(function () {
    return $carousel.addClass('is-set');
  }, 50);
});
