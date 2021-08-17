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

  for (i = j = 2, ref = $slides.length; 2 <= ref ? j <= ref : j >= ref; i = 2 <= ref ? ++j : --j) {
    $new_seat = nextSlide($new_seat).css('order', i);
  }

  $carousel.removeClass('is-set');
  return setTimeout(function () {
    return $carousel.addClass('is-set');
  }, 50);
});
