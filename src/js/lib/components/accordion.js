import $ from '../core';

$.prototype.accordion = function (
  headActive = 'accordion-head--active',
  contentActive = 'accordion-content--active',
  paddings = 40
) {
  for (let i = 0; i < this.length; i++) {
    $(this[i]).click(() => {
      const content = this[i].nextElementSibling;

      $(this[i]).toggleClass(headActive);
      $(content).toggleClass(contentActive);

      if (this[i].classList.contains(headActive)) {
        content.style.maxHeight = content.scrollHeight + paddings + 'px';
      } else {
        content.style.maxHeight = '0px';
      }
    });
  }
};

$('.accordion-head').accordion();
