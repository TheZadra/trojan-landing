// prędkość

let tickerSpeed = 1.5;

let flickity = null;
let isPaused = false;
const slideshowEl = document.querySelector('.js-slideshow');

//   Funkcje

const update = () => {
  if (isPaused) return;
  if (flickity.slides) {
    flickity.x = (flickity.x - tickerSpeed) % flickity.slideableWidth;
    flickity.selectedIndex = flickity.dragEndRestingSelect();
    flickity.updateSelectedSlide();
    flickity.settle(flickity.x);
  }
  window.requestAnimationFrame(update);
};

const pause = () => {
  isPaused = true;
};

const play = () => {
  if (isPaused) {
    isPaused = false;
    window.requestAnimationFrame(update);
  }
};



//   tworzenie Flickity

flickity = new Flickity(slideshowEl, {
  autoPlay: false,
  prevNextButtons: false,
  pageDots: false,
  draggable: true,
  wrapAround: true,
  selectedAttraction: 0.015,
  friction: 0.25
});
flickity.x = 0;

//   Add Event Listeners

slideshowEl.addEventListener('mouseenter', pause, false);
slideshowEl.addEventListener('focusin', pause, false);
slideshowEl.addEventListener('mouseleave', play, false);
slideshowEl.addEventListener('focusout', play, false);

flickity.on('dragStart', () => {
  isPaused = true;
});

//   start

update();