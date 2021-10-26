import $ from '../core';

$.prototype.on = function (eventName, handler) {
  for (let i = 0; i < this.length; i++) {
    this[i].addEventListener(eventName, handler);
  }

  return this;
};

$.prototype.off = function (eventName, handler) {
  for (let i = 0; i < this.length; i++) {
    this[i].removeEventListener(eventName, handler);
  }

  return this;
};

$.prototype.click = function (handler) {
  for (let i = 0; i < this.length; i++) {
    handler ? this[i].addEventListener('click', handler) : this[i].click();
  }

  return this;
};
