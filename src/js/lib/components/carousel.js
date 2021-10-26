import $ from '../core';

$.prototype.carousel = function () {
  for (let i = 0; i < this.length; i++) {
    const width = window.getComputedStyle(
      this[i].querySelector('.carousel-inner')
    ).width;
    const slides = this[i].querySelectorAll('.carousel-item');
    const dots = this[i].querySelectorAll('.carousel-indicators li');
    const wrapper = this[i].querySelector('.carousel-slides');

    let offset = 0;
    let slideIndex = 0;

    wrapper.style.width = 100 * slides.length + '%';
    slides.forEach((slide) => (slide.style.width = width));

    $(this[i].querySelector('[data-slide="next"]')).click((e) => {
      e.preventDefault();

      if (offset === parseInt(width) * (slides.length - 1)) {
        offset = 0;
        slideIndex = 0;
      } else {
        offset += parseInt(width);
        slideIndex++;
      }

      wrapper.style.transform = `translateX(-${offset}px)`;
      dots.forEach((dot, idx) => {
        $(dot).removeClass('active');
        if (slideIndex === idx) $(dot).addClass('active');
      });
    });

    $(this[i].querySelector('[data-slide="prev"]')).click((e) => {
      e.preventDefault();

      if (offset === 0) {
        offset = parseInt(width) * (slides.length - 1);
        slideIndex = slides.length - 1;
      } else {
        offset -= parseInt(width);
        slideIndex--;
      }

      wrapper.style.transform = `translateX(-${offset}px)`;
      dots.forEach((dot, idx) => {
        $(dot).removeClass('active');
        if (slideIndex === idx) $(dot).addClass('active');
      });
    });

    dots.forEach((dot) => {
      $(dot).click(() => {
        const idx = $(dot).getAttr('data-slide-to');
        slideIndex = idx;
        offset = parseInt(width) * idx;

        wrapper.style.transform = `translateX(-${offset}px)`;
        dots.forEach((dot) => $(dot).removeClass('active'));
        $(dot).addClass('active');
      });
    });
  }
};

$('.carousel').carousel();
